const { Router } = require('express')
const bcryptjs = require('bcryptjs')
const config = require('config')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const router = Router()

router.post('/register',
    [
        check('email', 'Не корректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 симвлов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                res.status(400).json({
                    'errors': errors.array(),
                    'message': 'Не корректные данные при регистрации'
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                res.status(400).json({message: 'Такой пользователь есть'})
            }

            const hashPassword = await bcryptjs.hash(password, 12)
            const user = new User({email, password: hashPassword})
            await user.save()

            res.status(200).json({message: 'Пользователь создан'})

        } catch (e) {
            console.log('e', e);
            res.status(500).json({message: e})
            throw Error(e)
        }
})


router.post('/login',
    [
        check('email', 'Не корректный Email').isEmail(),
        check('password', 'Пароль не должен быть пустым').exists()
    ],
    async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({message: 'Не корректные данные для входа'})
    }

    try {
        const { email, password } = req.body
        const user = await User.findOne(email)
        if (!user) {
            res.status(400).json({message:  'Такой пользлватель не зарегистрирован'})
        }

        const isMatch = bcrypt.compare(password, user.password)
        if(!isMatch) {
            res.status(400).json({message: 'Пароль не корректный'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})

module.exports = router
