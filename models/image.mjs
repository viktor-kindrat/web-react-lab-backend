import {Schema, model} from "mongoose";

let imageSchema = new Schema({
    relation: {
        type: String, required: true, enum: {
            values: ["insect", "avatar"]
        }, default: "insect"
    },
    data: {type: Buffer, required: true},
    mimetype: {type: String, required: true},
    filename: {type: String, required: true}
}, {timestamps: true});

let imageModel = model("image", imageSchema);

export default imageModel;