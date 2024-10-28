import Insect from '../../models/insect.mjs';


export const getInsects = async (req, res) => {
    try {
        const insects = await Insect.find({});
        res.status(200).json(insects);
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
};

export const getInsectsById = async (req, res) => {
    try {
        const {id} = req.params
        const insect = await Insect.findById(id).lean();
        res.status(200).json({status: 200, ...insect});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
};


export const createInsect = async (req, res) => {
    const insect = new Insect(req.body);

    try {
        await insect.save();
        res.status(201).json({status: 200, message: "Ok", body: insect});
    } catch (error) {
        res.status(400).json({status: 400, message: error.message});
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
