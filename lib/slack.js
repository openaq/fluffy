'use strict';

import request from 'request';

const webhookURL = process.env.SLACK_WEBHOOK_URL;

export function send (msg, done) {
  const payload = {text: msg};
  request.post({url: webhookURL, body: payload, json: true}, (err, res, body) => {
    if (err) {
      console.error(err);
    }

    done(null);
  });
}
