const {model, Schema, Types} = require('mongoose')

const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    data: {type: Date, default: new Date},
    owner: {type: Types.ObjectId, ref: 'User'},
    clicks: {type: Number, default: 0}
})

module.exports = model('link', schema)
