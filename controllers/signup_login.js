var UserModel = require('../models/signup_login')

var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

exports.registerUser = (req, res) => {
    let { password } = req.body

    const salt = bcrypt.genSaltSync(10);
    console.log(salt, password)
    const hash = bcrypt.hashSync(password, salt);
    return UserModel.create({
        ...req.body,
        password: hash

    }).then(resUser => {
        return res.json(resUser)
    }).catch(err => {
        return res.json(err)
    })

}

exports.login = (req, res) => {
    let { email, password } = req.body
    UserModel.find({ email }, (docerr, doc) => {
        if (doc.length > 0) {
            console.log(doc[0].password);
            if (bcrypt.compareSync(password, doc[0].password)) {
                jwt.sign({
                    data: email
                }, 'authpasskey', { expiresIn: '1h' }, (autherr, authtoken) => {
                    if (authtoken) {
                        res.status(200).json({ authtoken })
                    }
                })
            }
            else {
                res.status(501).send('Password doesn\'t match')
            }
        }
        else {
            res.status(404).send('Something went wrong!')
        }
    })
}