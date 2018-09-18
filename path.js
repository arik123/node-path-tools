const path = require('path');
const exec = require('child-process').exec;
const fs = require("fs")
const os = require('os');
var pathFiles = process.env.PATH.split(path.delimiter);

function getLoc(searched){
    let ret;
    if(os.type() == "Windows_NT"){
        
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
        
    }
    else{
        exec("which " + searched, function(err, stdout, stderr) {
            if (err) { 
            }
            if(stdout.length > 0){
                ret = stdout;
            }
          });
    }

    return ret;
}

/**
 * 
 * @param {string} searched 
 * @returns {string} absolute path or undefined if dont exists
 */
exports.getLocationFromPath = getLoc;

/**
 * 
 * @param {string} searched 
 * @returns {boolean}
 */
exports.existsInPath = function(searched){
    return(typeof getLoc(searched) != "undefined");
}

console.log(typeof getLoc("git") != "undefined");