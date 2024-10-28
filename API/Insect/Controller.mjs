import Insect from '../../models/insect.mjs';
import Image from "../../models/image.mjs";

import sharp from "sharp";
import mongoose from "mongoose";

export const getInsects = async (req, res) => {
    try {
        const insects = await Insect.aggregate([{
            $addFields: {
                imageLink: {
                    $concat: ["/media/image/", {$toString: "$image"}]
                },
                cardColor: "$color"
            }
        }, {
            $project: {
                image: 0
            }
        }]);

        res.status(200).json(insects);
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
};

export const getInsectsById = async (req, res) => {
    try {
        const {id} = req.params;

        let identifier = new mongoose.Types.ObjectId(id)
        let insect = await Insect.aggregate([{
            $match: {
                _id: identifier
            }
        },{
            $addFields: {
                imageLink: {
                    $concat: ["/media/image/", {$toString: "$image"}]
                },
                cardColor: "$color"
            }
        }, {
            $project: {
                image: 0
            }
        }]);

        if (!insect) {
            return res.status(404).json({status: 404, message: "Not found. Image with the same link was not found"});
        }

        insect = insect[0]

        res.status(200).json({status: 200, body: insect});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
};


export const createInsect = async (req, res) => {
    let {
        color,
        name,
        description,
        weightInGram,
        speedInMetersPerHour,
        price
    } = req.body;

    price = JSON.parse(price);

    try {
        const webpBuffer = await sharp(req.file.buffer)
            .resize({
                width: 500,
                withoutEnlargement: true
            })
            .webp()
            .toBuffer();

        const newImage = new Image({
            relation: 'insect',
            data: webpBuffer,
            mimetype: "image/webp",
            filename: req.file.originalname
        });

        await newImage.save();

        const insect = new Insect({
            image: newImage._id, color, name, description, weightInGram, speedInMetersPerHour, price
        });

        await insect.save();
        res.status(201).json({status: 201, message: "No content.", body: insect});
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 500, message: error.message});
    }
};


export const updateInsect = async (req, res) => {
    const {id} = req.params;

    try {
        const updatedInsect = await Insect.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedInsect) return res.status(404).json({status: 404, message: 'Insect not found'});
        res.status(200).json({status: 200, message: "Ok"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


export const deleteInsect = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedInsect = await Insect.findByIdAndDelete(id);
        if (!deletedInsect) return res.status(404).json({status: 404, message: 'Insect not found'});
        res.status(200).json({status: 200, message: 'Insect deleted successfully'});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
};
