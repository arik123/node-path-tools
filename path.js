const path = require('path');
const fs = require("fs")
var pathFiles = process.env.PATH.split(path.delimiter);
/**
 * 
 * @param {string} searched 
 * @returns {string} absolute path or undefined if dont exists
 */
function getLoc(searched){
    let ret;
    pathFiles.forEach((e)=>{
        let isFile = true;
        try{
            if(fs.existsSync(e)){
                isFile = fs.lstatSync(e).isFile()
            }
            
        }
        catch(e){
            console.log(e)
        }
        if(!isFile){
            var files = fs.readdirSync(e);
            files.forEach((file)=>{
                if(file == searched){
                    ret = path.join(e, file);
                }
            });
        }        
    });
    return ret;
}
/**
 * 
 * @param {string} searched 
 * @returns {boolean}
 */
exports.getLocationFromPath = getLoc;
exports.existsInPath = function(searched){
    return(typeof getLoc(searched) != "undefined");
}