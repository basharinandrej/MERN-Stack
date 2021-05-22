const {Router} = require('express')
const Link = require('../models/link')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')

const router = Router()

router.post('/generation', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body
        const code = shortid.generate()
        const existing = await Link.findOne({from})
        if (existing) return res.json({message: 'Такая ссылка уже есть'})

        const to = baseUrl + /t/ + code
        const link = new Link({from, to, code, owner: req.user.userId})
        await link.save()
        res.status(201).json({link})

    } catch (e) {
        res.status(500).json({message: `Какие-то проблемы - ${e}`})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        console.log('links', links);
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Какие-то проблемы'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        console.log('req', req.params.id);

        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: `Какие-то проблемы ${e}`})
    }
})

module.exports = router
