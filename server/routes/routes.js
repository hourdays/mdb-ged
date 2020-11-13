let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  path = require('path'),
  router = express.Router();

const DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    /*
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
    */
    cb(null, true);
  }
});
/*
// User model
let User = require('../models/User');
// User model
let Upload = require('../models/Upload');

router.post('/file-upload', upload.array('files', 10), (req, res, next) => {
  const reqFiles = []
  const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + '/public/' + req.files[i].filename)
  }

  const upld = new Upload({
    _id: new mongoose.Types.ObjectId(),
    files: reqFiles
  });
  upld.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Done upload!",
      uploadCreated: {
        _id: result._id,
        files: result.files
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})
*/
/*
router.get("/", (req, res, next) => {
  User.find().then(data => {
    res.status(200).json({
      message: "Data fetched!",
      users: data
    });
  });
});
*/
// Image model
let Image = require('../models/Image');

router.post('/image-upload', upload.single('image'), (req, res, next) => {
  const image = new Image({
    _id: new mongoose.Types.ObjectId(),
    name: req.file.filename, 
    desc: req.file.mimetype, 
    body: { 
      data: fs.readFileSync(path.join(DIR + req.file.filename)),
      contentType: req.file.mimetype
    }
  });
  image.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Image uploaded!"
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
});

router.get("/images", (req, res, next) => {
    Image.find().then(data => {
      res.status(200).json({
        message: "Images fetched!",
        images: data
      });
    });
  });

// PDF model
let PDF = require('../models/PDF');

router.post('/pdf-upload', upload.single('pdf'), (req, res, next) => {
  const pdf = new PDF({
    _id: new mongoose.Types.ObjectId(),
    name: req.file.filename, 
    desc: req.file.mimetype, 
    body: { 
      data: fs.readFileSync(path.join(DIR + req.file.filename)),
      contentType: req.file.mimetype
    }
  });
  pdf.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "PDF uploaded!"
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
});

router.get("/PDFs", (req, res, next) => {
  PDF.find().then(data => {
    res.status(200).json({
      message: "PDFs fetched!",
      PDFs: data
    });
  });
});

module.exports = router;