const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    slugTitle: { type: String, required: true },
    imageUrl: { type: String, default: 'no-image.jpg' },
    imagesUrl: [{ type: String }],
    brand: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, default: 0 },
    description: { type: String, default: '' },
    countInStock: { type: Number, require: true, min: 0, max: 255 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeature: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now }
});

module.exports = model('Product', productSchema);
