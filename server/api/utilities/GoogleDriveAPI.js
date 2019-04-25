var {google} = require("googleapis");
var drive = google.drive("v3");
var key = require("../utilities/privatekey");
var multerGdrive = require('multer-gdrive');
var fs = require('fs');

let Duplex = require('stream').Duplex;

function bufferToStream(buffer) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}


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
        console.log("Authorization success");
    }
});

module.exports.uploadImage = async function (fileName, fileBody, folderId, cb) {

    var fileMetadata = {
        'name': fileName,
        parents: [folderId]
    };
    let buffer = Buffer.from(fileBody.buffer);
    let _stream = bufferToStream(buffer)
    var media = {
        mimeType: 'image/jpeg',
        body: _stream
    };
    try {
        drive.files.create({
            auth: jwToken,
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, file) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, file)
            }
        });
    } catch (e) {
        cb(e, null);

    }
}

module.exports.getImage = async function (fileId, cb) {
    try {
        drive.files.get({
                auth: jwToken,
                fileId: fileId,
                fields: 'id',
                alt: 'media'
            },
            {
                responseType: 'stream'
            }, function (err, res) {

                cb(null,res);

            });
    } catch (e) {
        cb(e, null);
    }
}


/*, (err, {
        data
    }) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = data.files;
        if (files.length) {
            console.log('Files:');
            return files;
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
    });*/
