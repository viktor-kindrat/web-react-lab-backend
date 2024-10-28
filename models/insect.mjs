// models/Insect.js
import {model, Schema} from 'mongoose';

const InsectSchema = new Schema({
    imageLink: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    weightInGram: {type: Number, required: true},
    speedInMetersPerHour: {type: Number, required: true}
}, {timestamps: true});

export default model('Insect', InsectSchema);
