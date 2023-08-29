const ChecklistTypesModel = require("../models/checklist");
const mongoose = require('../db/db');

//create api

exports.createChecklistTypes = async (req, res) =>{
    try{
        const checklistTypesData = req.body;
        const newChecklistTypes = new ChecklistTypesModel(checklistTypesData);
        await newChecklistTypes.save();
        res.status(201).json({ message: 'Checklist Added Successfully.', checklistTypes: newChecklistTypes});
    }catch (error) {
res.status(500).json({ error: 'An error occured while inserting checklistTypes data.'});

    }
};


//Get APi


exports.getChecklistTypesById = async (req, res) =>{
     try{
        const checklistTypeId = req.params.checklistTypeId;
        const checklistType = await ChecklistTypesModel.findById(checklistTypeId);

        if(!checklistType){
            return res.status(402).json({error: 'Checklist Types not found'});
        }

        res.json(checklistType);
     }catch (error) {
        res.status(500).json({error: 'An error occured while fetching Checklist Types. '});
     }
};

exports.getAllChecklistTypes = async (req, res) => {
    try {
        const checklistTypes = await ChecklistTypesModel.find();
        res.json(checklistTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




