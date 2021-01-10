const path = require("path")
const multer = require("multer")
const express = require("express");



var storate = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'imageDATA')
    },
    filename : function(req,cb,file){
        let ext = path.extname(file.originalname)
        cb(null,Date.now() + ext )

    }
})
var upload = multer ({
    storage: storate,
    fileFilter: function(req,file,callback){
        if(
            file.mimetype == "image/png"||
            file.mimetype == "image/jpg"
        ){callback(null,true)}
        else{
            console.log("chi PNG va JPG")
            callback(null, false)
        }
    },
    limits:{
        fileSize : 1024 * 1024 * 10
    }
});


module.exports = upload