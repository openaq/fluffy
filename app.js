/**
* Watchdog of the system, this script does the following:
*   - Update Slack channel every time it runs
*   - Notify Slack and send emails if there are no recent fetches
*
*/
'use strict';

import request from 'request';
import { send as sendMail } from './lib/mailer';
import { send as sendSlack } from './lib/slack';
import { parallel } from 'async';

const baseURL = process.env.BASE_URL || 'https://api.openaq.org/v1/';
const diffThreshold = process.env.DIFF_THRESHOLD || 20;

// Adding a random string at the end to prevent caching
request.get(`${baseURL}fetches?limit=1&$t={Date.now()}`, (err, res, body) => {
  if (err) {
    sendSlack('<!channel> Hmm, I was not even able to get the latest fetch data, no good.', () => {
      process.exit(0);
    });
  }

  // Turn it into JSON
  body = JSON.parse(body);
  const lastTimeUpdated = body.results[0].timeEnded;
  const diff = (new Date() - new Date(lastTimeUpdated)) / 60000; // Difference in minutes

  // If we haven't gotten a new fetch in a reasonable time, warn people
  // otherwise just send a friendly notice
  if (diff >= diffThreshold) {
    const msg = `Uh oh, I haven't seen an update since ${lastTimeUpdated} which was ${diff.toFixed(1)} minutes ago.`;
    parallel([
      function (done) {
        sendSlack(`<!channel> ${msg}`, done);
      },
      function (done) {
        sendMail(msg, done);
      }
    ], (err, results) => {
      if (err) {
        console.error(err);
      }

      console.info('All done');
      process.exit(0);
    });
  } else {
    sendSlack(`Nothing to worry about, the last update I saw was ${diff.toFixed(1)} minutes ago.`, () => {
      console.info('All done');
      process.exit(0);
    });
  }
});
