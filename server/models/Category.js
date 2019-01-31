const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataTables = require('mongoose-datatables')

const categorySchema = new Schema({
    category: {
        type: String
    },
    deleteAt: {
        type: Date,
        default: null
    },
}, {
    timestamps: true
});

categorySchema.statics = {
    /**
     * List sales in descending order of 'timeStamp' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<Category[]>}
     */
    list({ skip = 0, limit = 10 } = {}) {
      return this.find()
        .sort({ timeStamp: -1 })
        .skip(skip)
        .limit(limit)
        .exec()
    },
}

categorySchema.plugin(dataTables)

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;