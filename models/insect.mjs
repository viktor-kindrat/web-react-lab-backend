import {model, Schema} from 'mongoose';

const InsectSchema = new Schema({
    image: {type: Schema.Types.ObjectId, ref: "image", required: true},
    color: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    weightInGram: {type: Number, required: true},
    speedInMetersPerHour: {type: Number, required: true},
    price: {
        value: {type: Number, default: 0},
        currency: {type: String, default: "$"},
    }
}, {timestamps: true});

export default model('Insect', InsectSchema);
