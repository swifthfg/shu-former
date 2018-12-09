const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormQuestion = require('./FormQuestion');

const FormSubmissionSchema = new Schema({
    fields: {type: [{fieldName: String, score: Number}], required: true},
    ipMeta: String,
    shuToken: {type: String, required: true},
    overAllScore: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now()}
});

FormSubmissionSchema.pre('save', function(next) {
    var formSubmission = this;
    formFields = formSubmission.fields;
    FormQuestion.find({}, function (err, questions) {
       if (err) {
           return next(err);
       } else {
           for (let i = 0; i < questions.length; i++) {
               let tempFieldName = questions[i].fieldName;
               for (let j = 0; j < formFields.length; j++) {
                   if (tempFieldName == )
               }
           }
           next();
       }
    });
});

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);