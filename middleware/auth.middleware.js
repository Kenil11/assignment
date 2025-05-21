import jwt from "jsonwebtoken"

const verify = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            success: "false",
            message: "You are not Logged In"
        })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(400).json({
                success: "false",
                message: "Err in token"
            })
        }
        req.user = payload
        next()
    })
}

export default verify