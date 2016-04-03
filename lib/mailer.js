'use strict';

import nodemailer from 'nodemailer';

// Create SMTP
const smtpConfig = {
  host: process.env.SMTP_SERVER,
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
};
const transporter = nodemailer.createTransport(smtpConfig);
const to = process.env.SMTP_TO_ADDRESSES;

export function send (msg, done) {
  const data = {
    from: 'noreply@openaq.org',
    to: to,
    subject: 'Problem with openaq-fetch',
    text: msg
  };

  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.error(err);
    }

    console.log(info);
    done(null);
  });
}
