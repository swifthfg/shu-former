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
           let overAllScore = 0;
           let matchingFieldCount = 0;
           for (let i = 0; i < questions.length; i++) {
               let tempFieldName = questions[i].fieldName;
               for (let j = 0; j < formFields.length; j++) {
                   if (tempFieldName == formFields[j].fieldName) {
                       overAllScore += formFields[j].score;
                       matchingFieldCount++;
                       break;
                   }
               }
           }
           if (matchingFieldCount != questions.length) {
               return next(new Error("Field is missing in submitted form"));
           }
           formSubmission.overAllScore = overAllScore;
           next();
       }
    });
});

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);