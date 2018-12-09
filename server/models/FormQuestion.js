const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormQuestionSchema = new Schema({
    questionText: {type: String, required: true, unique: true},
    description: {type: String},
    fieldName: {type: String, required: true},
    maxScore: {type: Number, default: 5},
    createdAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('FormQuestion', FormQuestionSchema);