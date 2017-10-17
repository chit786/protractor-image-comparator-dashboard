var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var diretoryTreeToObj = function(dir, done) {
    var results = [];
    
    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);

        var pending = list.length;

        if (!pending)
            return done(null, {name: path.basename(dir), type: 'folder', children: results});

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            type: 'folder',
                            path:file,
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    results.push({
                        type: 'file',
                        name: path.basename(file),
                        path:file
                    });
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};


function copyFile(src, dest) {
    
      let readStream = fs.createReadStream(src);
    
      readStream.once('error', (err) => {
        console.log(err);
      });
    
      readStream.once('end', () => {
        deleteFile(src);
        console.log('done copying');
      });
      

      readStream.pipe(fs.createWriteStream(dest));
}


function deleteFile(path) {
    
    fs.unlink(path, (err) => {
        if (err) {
            console.log(path + "failed to delete local image:" + err);
        } else {
            console.log('successfully deleted local image');                                
        }
    });

}


//Routes
router.get(/scenarios/,function(req,res){
    diretoryTreeToObj(req.query.root, function(err, result){
        if(err)
            console.error(err);

        res.send(JSON.stringify(result));
    });
});

router.post('/file',function(req,res){
    if(req.body.accepted){
        var actFilePath = req.body.actfilepath;
        var baseFilePath = req.body.basefilepath;

        // deleteFile(baseFilePath);
        
        copyFile(actFilePath, baseFilePath);
    }
    res.send('in file');
});

module.exports = router;