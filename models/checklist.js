
const mongoose = require('mongoose');

const checklistTypesSchema = new mongoose.Schema({
    type: {type: String, required: true },
    rangeConfigrations: [{ 
        min: { type: number, required: true },
        max: { type: number, required: true },
        color: { type: string, required: true },
    }],
    sections: [{
        title: { type: String, required: true },
        seqNo: { type: Number, required: true },
        questions: [{
            title: { type: String, required: true },
            answerOptions: [{
                title: { type: String, required: true },
                type: { type: String, required: true },
                seqNo: { type: Number, required: true },
                parentOption: { type: String, default: null }
            }]
        }]
    }]
});

const ChecklistTypesModel = mongoose.model("checklistTypes", checklistTypesSchema);

module.exports = ChecklistTypesModel;
