import Image from "../models/image.mjs";

export const getImageById = async (req, res) => {
    try {
        const {id} = req.params;
        const image = await Image.findById(id);

        if (!image) {
            return res.status(404).send('Image not found');
        }

        const imageBuffer = Buffer.from(image.data, 'base64');

        res.set('Content-Type', image.mimetype);
        res.send(imageBuffer);
    } catch (error) {
        res.status(500).send("Error when getting image: " + error.message);
    }
};
