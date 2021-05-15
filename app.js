const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

const startConnectInDataBase = async () => {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Start app on port ${PORT}`))
    } catch (e) {
        console.log('Ошибка при подключении к БД', e.message);
        process.exit(1)
    }
}

startConnectInDataBase()
