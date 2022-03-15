const jwt = require("jsonwebtoken")

exports.authVerify = (req, res, next) => {
    let { authorization } = req.headers
    if (!authorization) {
        res.send({ error: 'authorization header is not present' })
    }
    else {
        let authArray = authorization.split(' ')
        if (authArray.length < 2) {
            res.send({ error: 'Wrong pattern of Authorization header' })
        }
        else {
            let token = authArray[2]
            try {
                jwt.verify(token, 'authpasskey')
                let decodedJwt = jwt.decode(token, { complete: true })
                req.user = decodedJwt.payload.data
                next()
            } catch (error) {
                res.send(error)
            }
        }
    }
}