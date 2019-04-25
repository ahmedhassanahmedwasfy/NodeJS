var {google} = require("googleapis");
var drive = google.drive("v3");
var key = require("./privatekey.json");
var path = require("path");
var fs = require("fs");
var multer = require('multer');
var multerGdrive = require('multer-gdrive');

var jwToken = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, ["https://www.googleapis.com/auth/drive"],
    null
);
jwToken.authorize((authErr) => {
    if (authErr) {
        console.log("error : " + authErr);
        return;
    } else {
        console.log("Authorization accorded");
    }
});

var folderId = "1hKIRDWn4yz25QV7UehAUzeqytVpY0aYv";
var fileMetadata = {
    'name': req.file.name,
    parents: [folderId]
};
var media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(path.join(__dirname, './uploadfile.txt'))
};
drive.files.create({
    auth: jwToken,
    resource: fileMetadata,
    media: media,
    fields: 'id'
}, function(err, file) {
    if (err) {
        // Handle error
        console.error(err);
    } else {
        console.log('File Id: ', file.data.id);
    }
});


var upload = multer({
    storage: multerGdrive(jwToken)
})
app.post('/upload', upload.array('photos', 3), function(req, res, next) {
    res.send('Successfully uploaded ' + req.files.length + ' files!')
})



//send request for test
/*
var targetFolder = "1hKIRDWn4yz25QV7UehAUzeqytVpY0aYv"
drive.files.list({
    auth: jwToken,
    q: "'" + targetFolder + "' in parents and trashed=false",
    fields: 'files(id, name)',
}, (err, {
    data
}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = data.files;
    if (files.length) {
        console.log('Files:');
        files.map((file) => {
            console.log(`${file.name} (${file.id})`);
        });
    } else {
        console.log('No files found.');
    }
});*/
