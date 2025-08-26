const router = require("express").Router()
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

// 게스트 로그인 (토큰 발급)
router.post('/guest', (req, res) => {
    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "서버 설정 오류 : JWT_SECRET이 없습니다." })
        }

        const uid = (req.body && req.body.deviceId) ? String(req.body.deviceId) : uuidv4()

        const token = jwt.sign(
            { uid, role: 'guest' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false, // 배포 시 true 권장
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        })

        return res.status(200).json({ message: '게스트 인증 완료', uid })

    } catch (error) {
        console.error("게스트 인증 오류", error)
        return res.status(500).json({ message: "게스트 인증 중 오류 발생" })
    }
})

// ✅ 내 정보 확인 (게스트인지 체크)
router.get('/me', (req, res) => {
    try {
        const token = req.cookies?.auth
        if (!token) {
            return res.status(401).json({ message: "인증 토큰 없음" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({ user: decoded })
    } catch (error) {
        return res.status(401).json({ message: "유효하지 않은 토큰" })
    }
})

module.exports = router
