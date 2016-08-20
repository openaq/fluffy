Fluffy
===

This is an internal watchdog, run on a regular basis to ensure that the system is still fetching new data. If it notices any irregularities, it'll send emails and/or messages to the OpenAQ #alerts Slack channel.

Right now it's very basic, only making sure that fetches have come in within the last 40 minutes, but it can be expanded in the future.

![](https://s-media-cache-ak0.pinimg.com/736x/5b/e6/76/5be6763396086b5d1e3b813b00100e13.jpg)

Environment Variables
---

| Name | Description | Default |
|---|---|---|
| BASE_URL | base URL to use for requests | https://api.openaq.org/v1/ |
| DIFF_THRESHOLD | minutes since last fetch over which to raise an alert | 40 |
| SMTP_SERVER | SMTP mail server address to send email | none |
| SMTP_USERNAME | SMTP username | none |
| SMTP_PASSWORD | SMTP password | none |
| SMTP_TO_ADDRESSES | Email addresses or comma separated list to send alerts to | none |
| SLACK_WEBHOOK_URL | Slack webhook url to send alerts to | none |