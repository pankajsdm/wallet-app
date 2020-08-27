/*
 * @file: universal.js
 * @description: It Contain function layer for upload media and document.
 * @author: Pankaj Pandey
 */

import path from 'path';
import fs from 'fs';
import Jimp from 'jimp';
import AWS from 'aws-sdk';
import PATHDEF from './constants'



const s3 = new AWS.S3({
    region: 'us-east-1',
    accessKeyId: process.env.accessKeyS3, //"AKIAIB2QB2MAU2JKGFRA",
    secretAccessKey: process.env.secretKeyS3 //"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",
});


export const uploadFormDataFile = async (buffer, filePath, fileName) => {
    return await Promise.all([
      Jimp.read(buffer).then(lenna => {
        return lenna.write(path.join(__uploadDir, `${filePath}/original/${fileName}`));
      }),

      Jimp.read(buffer).then(lenna => {
        return lenna
          .resize(100, 100)
          .write(path.join(__uploadDir, `${filePath}/thumbnail/${fileName}`));
      })
    ]).then(res => {
      return res;
    });
};

export const uploadFile = async (base64FileCode, filePath, fileName) => {
  let buffer = await decodeBase64Image(base64FileCode);
  const path = path.join(__dirname, `${filePath}/original/${fileName}`);
  return await Promise.all([
    Jimp.read(buffer).then(lenna => {
      return lenna.write(path.join(__dirname, `${filePath}/original/${fileName}`));
    })
  ]).then(res => {
    return res;
  });
};


const decodeBase64Image = async function (dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let response = {};
    if (matches) {
      if (matches.length !== 3) {
        return new Error("Invalid input string");
      }
  
      response.type = matches[1];
      response.data = Buffer.from(matches[2], "base64");
    } else {
      response.error = "Invalid image";
    }
  
    return response;
  };


export const uploadImagebyBase64 = async function (base64FileCode, uploadFolder, filename) {
  let docBuffer = await decodeBase64Image(base64FileCode);
  if (docBuffer.error == "Invalid image") {
    return false;
  } else {
  var imageType = docBuffer.type;
  var typeArr = new Array();
  typeArr = imageType.split("/");
  var fileExt = '.'+typeArr[typeArr.length-1];
  var fileName = filename + fileExt;
  return await Promise.all([
    Jimp.read(docBuffer.data).then(lenna => {
      return lenna.write(path.join(__dirname, `${uploadFolder}/${fileName}`));
    })
  ]).then(res => {
    return fileExt;
  });
  }
};
