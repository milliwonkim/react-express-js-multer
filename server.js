const path = require("path");
const express = require("express");
const app = express();
const multer = require("multer");
const PORT = 5000;
app.use(express.static("public"));
const storage = multer.diskStorage({
    destination: "./public/img/",
    filename: function (req, file, cb) {
        cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 0.5*1024*1024
    }
});

app.post("/upload", upload.single("img"), function (req, res, next) {
    res.send({
        fileName: req.file.filename
    });
});

app.listen(PORT, () => {console.log(`Port On ${PORT}`)})