const path = require("path")
const multer = require("multer")
const express = require("express");
const upload = require("express-fileupload")

const app = express()
app.use(upload())

upimg = async (req,res,next)=>
{
    try {
        let file = req.files.image;
        let fileName = file.name;

        await file.mv('./imageDATA/' + fileName);
        console.log(fileName)
        req.fileName = fileName;
        // res.status(200).json('Upload img success');
        next()
    } catch (err) {
        res.status(404).json(err);
    }
    
}
module.exports = upimg
/*
exports.upmusic = async (req,res,next)=>
{
    try {
        let file = req.files.file;
        let fileName = file.name;

        await file.mv('./musicDATA/' + fileName);
        console.log("ads")
        // res.status(200).json('Upload img success');
        next()
    } catch (err) {
        res.status(404).json(err);
    }
    
}*/
