const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sgMail = require('@sendgrid/mail')
const dataTables = require('mongoose-datatables')
const nodemailer = require('nodemailer');

const reportSchema = new Schema({
    title: String,
    url: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    reporter: {
        type: String
    },
    email: {
        type: String
    },
    nohp: {
        type: String
    },
    status: {
        type: String,
        default: 'unverified'
    },
    deleteAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});

reportSchema.statics = {
    /**
     * List sales in descending order of 'timeStamp' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
      return this.find()
        .sort({ timeStamp: -1 })
        .skip(skip)
        .limit(limit)
        .exec()
    },
}

reportSchema.plugin(dataTables)
reportSchema.pre('save', function(){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stophoax72@gmail.com',
            pass: 'Kodok1234'
        }
    });
    const mailOptions = {
        from: 'antihoax@noreply.com', // sender address
        to: this.email, // list of receivers
        subject: 'URL Report Success!', // Subject line
        html: '<p>Thanks for report URL negative!our team will immediately verify the link you reported! </p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(`ini erooo`,err)
        else
          console.log(`nice`,info);
    });
})


reportSchema.post('save', function() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'stophoax72@gmail.com',
            pass: 'Kodok1234'
        }
    });
    const mailOptions = {
        from: 'antihoax@noreply.com', // sender address
        to: this.email, // list of receivers
        subject: 'URL Report Success!', // Subject line
        html: '<p>Thanks for report URL negative!our team will immediately verify the link you reported! </p>'// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(`ini erooo`,err)
        else
          console.log(`nice`,info);
    });
})

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;