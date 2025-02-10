import jsforce from "jsforce";
import { colorize } from "json-colorizer";

import "dotenv/config";

const SF_USERNAME = process.env.SF_USERNAME;
const SF_PASSWORD = process.env.SF_PASSWORD;
const SF_SECURITY_TOKEN = process.env.SF_SECURITY_TOKEN;
const SF_LOGIN_URL = process.env.SF_LOGIN_URL;

// Channel for Account Change Events
const channel = "/data/AccountChangeEvent";

// Events are still delivered for all, but this will filter console logs
const recordIdFilter = "001xxxxxxxxx";
// const recordIdFilter = null;

// Create a new connection
const conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });

// Log in to Salesforce
await conn.login(SF_USERNAME, SF_PASSWORD + SF_SECURITY_TOKEN);
const user = await conn.identity();

console.log("Successfully logged in with Username:", user.username);

let count = 0;

// Subscribe to the streaming channel
conn.streaming.topic(channel).subscribe((message) => {
  if (!recordIdFilter || (recordIdFilter && message.payload.ChangeEventHeader.recordIds.includes(recordIdFilter))) {
    console.log("--- AccountChangeEvent Received ---");
    console.log(colorize(message));
    count++;
    console.log(`Total messages received: ${count}`);
  }
});

console.log(`Subscribed to ${channel}`);
