const admin = require("firebase-admin");
const debug = require("debug")("socialNetwork:firebase");
const chalk = require("chalk");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "allfriends-f5482.appspot.com",
});

const firebase = async (req, res, next) => {
  const bucket = admin.storage().bucket();
  await bucket.upload(req.file.path);
  await bucket.file(req.file.filename).makePublic();
  const fileURL = bucket.file(req.file.filename).publicUrl();
  debug(chalk.bgCyan("Image url: "));
  debug(chalk.bgCyan(fileURL));
  req.file.fileURL = fileURL;
  next();
};

module.exports = firebase;
