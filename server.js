const express = require("express");
const fs = require('fs');
const app = express();
app.use(express.json());
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//app.use(express.static(__dirname + '/UI.html'));
//console.log("Directory----"+__dirname);


app.get('/', (req, res) => {
    res.sendFile('UI.html', { root: __dirname });
});

app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    req.files.forEach((f) => {
        fs.renameSync(`${f.path}`, `public/uploads/${f.originalname}`);
      });
    res.json({ message: "1" });
    //console.log("uploadedfiles" +uploadedFiles);
}
app.listen(5000, () => {
    console.log(`Server started...`);
});