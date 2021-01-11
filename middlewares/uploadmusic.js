const path = require("path")
const multer = require("multer")
const express = require("express");
const upload = require("express-fileupload")



upmusic = async (req,res,next)=>
{
    try {
        let file = req.files.fileName;
        let fileName = file.name;

        await file.mv('./musicDATA/' + fileName);
        
        req.fileName = fileName;
        // res.status(200).json('Upload img success');
        next()
    } catch (err) {
        res.status(404).json(err);
    }
    
}
module.exports = upmusic