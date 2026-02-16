const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 8100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set storage engine
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// Initialize upload
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 10000000 } // 10 MB limit
}).single('user_file');

// Check file type
// function checkFileType(file, cb) {
//     // Allowed extensions
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check extension
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime type
//     const mimetype = filetypes.test(file.mimetype);
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('Error: No File Selected!');
            } else {
                res.send(`File Uploaded: ${req.file.filename}`);
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});