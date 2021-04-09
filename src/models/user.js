const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: { type: String, require: true },
    slugName: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: 'USER_ROLE' },
    dateCreated: { type: Date, default: Date.now },
    avatar: { type: String, default: 'no-image.jpg' },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
    }
});

module.exports = model('User', userSchema);
