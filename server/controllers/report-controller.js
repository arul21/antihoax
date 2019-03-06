const Report = require('../models/Report')
const Category = require('../models/Category')
const nodemailer = require('nodemailer')
module.exports = {
    addReport: (req, res) => {
        Report.create({
            title: req.body.title,
            url: req.body.url,
            category: req.body.category,
            reporter: req.body.reporter,
            email: req.body.email,
            nohp: req.body.nohp,
            address: req.body.address
        })
        .then(response => {
            res.status(201).json({
                report: response
            })
        })
        .catch(err => {
            console.log(`adadsasda`,err)
            res.status(500).json({
                message: err
            })
        })
    },

/**
 * Get sales list.
 * @property {number} req.query.skip - Number of Sales to be skipped.
 * @property {number} req.query.limit - Limit number of Sales to be returned.
 * @returns {Report[]}
 */
    listReport: (req, res) =>{
        Report.dataTables({
            limit: req.query.per_page,
            skip: (req.query.page - 1) * req.query.per_page,
            search: {
                value: req.query.filter,
                fields: ['url', 'email', 'title'],
            },
            sort: {
                createdAt: ['DESC'],
            },
            populate: 'category'
        })
        .then(function(table) {
            table.per_page = req.query.per_page
            table.current_page = req.query.page
            table.last_page = table.total || req.query.per_page
            table.next_page_url =`https:\/\/localhost:3000\/report?page=2`
            table.prev_page_url = null,
            table.from = 1
            table.to = 15
            res.status(200).json(table) 
        })
        .catch(err =>{
            console.log(`eooo`, err);
        })    
    },
    
    findOne: (req, res) =>{
        console.log(`1ini ommm`);
        let url = req.body.url
        let reporter = req.body.reporter
        let email = req.body.email
        let nohp = req.body.nohp
        Report.find({ url: url})
        .populate('category')
        .then(response => {
            if(response.length === 1){
                res.status(200).json(response)
            } else {
                res.status(400).json({msg:`URL Not Registered`})
                
            }
        })
        .catch(err => {
            console.log(err);
            
            res.status(500).json({
                message: err
            })
        })
    },

    editReport: (req, res)=>{
        Report.updateOne({
            _id: req.params.id
        },{
            category: req.body.category
        })
        .then(response =>{
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    deleteReport: (req, res) =>{
        Report.deleteOne({
            _id: req.params.id
        })
        .then(response =>{
            res.status(201).json(response)
            console.log(`berhasil delete`);
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    verifyReport: (req, res) =>{
        Report.update({
            _id: req.params.id
        },{
            status: 'verified',
            keterangan: req.body.keterangan
        })
        .then(response =>{
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    unverifyReport: (req, res) =>{
        Report.update({
            _id: req.params.id
        },{
            status: 'unverified',
            keterangan: req.body.keterangan
        })
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },


    getVerified: (req, res) =>{
        Report.dataTables({
            find: {
                status: 'verified'
            },
            limit: req.query.per_page,
            skip: (req.query.page - 1) * req.query.per_page,
            search: {
                value: req.query.filter,
                fields: ['url', 'email', 'title']
            },
            sort: {
                createdAt: ['DESC']
            },
            populate: 'category',
        })
        .then(function(table) {
            table.per_page = req.query.per_page
            table.current_page = req.query.page
            table.last_page = table.total || req.query.per_page
            table.next_page_url =`https:\/\/localhost:3000\/report\/verify?page=2`
            table.prev_page_url = null,
            table.from = 1
            table.to = 15
            res.status(200).json(table) 
        })
        .catch(err =>{
            console.log(`eooo`, err);
        })  
    },

    getUnverifiedd: (req, res) =>{
        Report.find({
            status: 'unverified'
        })
        .populate('category')
        .then(response =>{
            console.log(response);
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        })
    },

    getUnverified: (req, res) =>{
        Report.dataTables({
            find: {
                status: 'unverified'
            },
            limit: req.query.per_page,
            skip: (req.query.page - 1) * req.query.per_page,
            search: {
                value: req.query.filter,
                fields: ['url', 'email', 'title']
            },
            sort: {
                createdAt: ['DESC']
            },
            populate: 'category'
        })
        .then(function(table) {
            table.per_page = req.query.per_page
            table.current_page = req.query.page
            table.last_page = table.total || req.query.per_page
            table.next_page_url =`https:\/\/localhost:3000\/report\/unverify?page=2`
            table.prev_page_url = null,
            table.from = 1
            table.to = 15
            res.status(200).json(table) 
        })
        .catch(err =>{
            console.log(`eooo`, err);
        })  
    },

    getOne: (req, res) =>{
        Report.findOne({
            url: req.params.url
        })
        .populate('category')
        .then(response =>{
            console.log(`ini`,response);
            if(response){
                res.status(200).json(response)
            } else {
                res.status(400).json(response)
                console.log(`ini notfound`);
            }
        })
        .catch(err =>{
            console.log(`ini yang salah`,err)
            res.status(500).json(err)
        })
    },

    getValue: (req, res) =>{
        Report.findOne({
            url: req.body.url
        })
        .populate('category')
        .then(response =>{
            console.log(`ini`,response);
            if(response){
                res.status(200).json(response)
            } else {
                res.status(400).json(response)
                console.log(`ini notfound`);
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    addKeterangan: (req, res) =>{
        Report.findByIdAndUpdate({
            _id: req.params.id
        },{
            keterangan: req.body.keterangan
        })
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    
}