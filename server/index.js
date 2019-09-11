const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/public')));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
});

var upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.listen(port);