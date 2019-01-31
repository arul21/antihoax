const Category = require('../models/Category')

module.exports = {
    addCategory: (req, res) => {
        Category.create({category: req.body.category})
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    listCategory: (req, res) => {
        Category.find({})
        .sort([['category', 'ascending']])
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(`errr`);
            res.status(500).json({message: err})
        })
    },

    updateOne: (req, res) => {
        Category.findOneAndUpdate({
            _id: req.params.id
        }, {
            category: req.body.category
        })
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
    },

    deleteOne: (req, res) => {
        Category.findByIdAndRemove({
            _id: req.params.id
        })
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
    },

    findOne: (req, res) =>{
        Category.findOne({
            _id: req.params.id
        })
        .then(response => {
            res.status(200).json({
                response
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
    },

    listCategories: (req, res) =>{
        Category.dataTables({
            limit: req.query.per_page,
            skip: (req.query.page - 1) * req.query_page,
            search: {
                value: req.query.filter,
                fields: ['category'],
            },
            sort: {
                category: ['ASC']
            }
        })
        .then(function(table) {
            table.per_page = req.query.per_page
            table.current_page = req.query.page
            table.last_page = table.total || req.query.per_page
            table.next_page_url =`https:\/\/localhost:3000\/category\/api?page=2`
            table.prev_page_url = null,
            table.from = 1
            table.to = 5
            res.status(200).json(table) // table.total, table.data
        })
        .catch(err =>{
            res.status(500).json(err)
        }) 
    }


}