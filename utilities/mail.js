/* -----------------------------------------------------------------------
   * @ description : Here initialising nodemailer transport for sending mails.
----------------------------------------------------------------------- */

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import path from 'path';
import { EmailTemplate } from 'email-templates';
import config from 'config';

const { smtpUser, smtpPass, smtpPort, smtpServer, mailFrom } = config.get('smtp');

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: smtpServer, // hostname
    port: smtpPort, // port for secure SMTP
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  })
);

export const subjects = {
  userAccount: 'Account Verification',
  userLogin: 'Login Confirmation Email',
  forgotPassword: 'Forgot Pasword',
  licenseApprove: 'Bookzdoctor Approval'
};

const dirPath = '../email-templates/';
export const htmlFromatWithObject = async (request, file) => {
  const tempDir = path.resolve(__dirname, dirPath, file);
  const template = new EmailTemplate(path.join(tempDir));
  return await template.render({ ...request });
};

export const sendMail = (request, cb) => {
  let options = {
    from: mailFrom,
    to: request.to, // list of receivers
    subject: request.subject, // Subject line
    html: request.html // html body
  };
  if (request.cc) {
    options.cc = request.cc;
  }
  if (request.replyTo) {
    options.replyTo = request.replyTo;
  }
  if (request.files) {
    options.attachments = [
      {
        // filename: request.files.fileName,
        path: request.files.content
        // type: 'application/pdf',
        // disposition: 'attachment'
      }
    ];
  }

  transporter.sendMail(options, function(error, info) {
    // send mail with defined transport object
    cb(error, info);
  });
};
