const express = require('express')
const router = express.Router()
const {addReport, listReport, findOne, getValue, editReport, deleteReport, verifyReport, unverifyReport, getVerified, addKeterangan, getOne, getUnverified} = require('../controllers/report-controller')

router.post('/', addReport)
router.get('/', listReport)
router.post('/url', findOne)
router.patch('/:id', editReport)
router.delete('/:id', deleteReport)
router.patch('/verify/:id', verifyReport)
router.patch('/unverify/:id', unverifyReport)
router.get('/verify', getVerified)
router.get('/unverify', getUnverified)
router.get('/:url', getOne)
router.patch('/information/:id', addKeterangan),
router.post('/linkurl', getValue)

module.exports = router;