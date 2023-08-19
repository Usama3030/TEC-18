const mongoose = require('mongoose');

const checklistTypesSchema = new mongoose.Schema({
    type: {type: String, required: true },
    building: [{
        name: { type: String, required: true },
        phones: { type: String, required: true },
        Emails: { type: String, required: true },
        location: { type: String, required: true }
    }] ,
});

const ChecklistTypesModel = mongoose.model("checklistTypes", checklistTypesSchema);

module.exports = ChecklistTypesModel;