const multer = require('multer');
const path = require('path');


const LifeChipStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.dirname(__dirname) + "/public/LifeChips/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, uniqueSuffix + extname);
    }
});

const RecentEventStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.dirname(__dirname) + "/public/recentAndAbout/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, uniqueSuffix + extname);
    }
});


exports.LifeChipsUpLoad= (req, res, next)=>{
    if (!req.body.type) {
        res.send({message: 'error', error: 'type is required'});
    }
    else {
        let upload = multer({storage: LifeChipStorage}).single("media");
        upload(req, res, (err) => {
            console.log(req.file);
            if (err) {
                res.send("err:" + err);
            } else {
                req.body.url = req.file.filename;
                next();
            }
        })
    }
}


exports.RecentEventUpLoad= (req, res, next)=>{
    let upload = multer({storage: RecentEventStorage}).single("media");
    upload(req, res, (err) => {
        console.log(req.file);
        if (err) {
            res.send("err:" + err);
        } else {
            req.body.url = req.file.filename;
            next();
        }
    })
}