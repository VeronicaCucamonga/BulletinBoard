const express = require('express')
const router = express.Router();
const Issues = require('../models/issues')
const checkauth = require('../check-auth')

router.get('', (req, res) => {
    Issues.find().then((issues)=>{
     res.json(
         {
             message: 'Issue Found',
             issues: issues
         }
     )
    })
 })
 
 router.post('', checkauth, (req, res) => {
     const issues = new Issues(
         {
             id: req.body.id,
             post: req.body.post
         }
     )
     issues.save();
     res.status(201).json({
         message: 'Issue created',
         issues: issues
     })
 })
 
 router.delete("/:id", checkauth, (req, res)=>{
     Issues.deleteOne({_id: req.params.id})
     .then((result)=>
     {
         res.status(200).json({message: "Issue Deleted"});
     });
 })

 module.exports = router