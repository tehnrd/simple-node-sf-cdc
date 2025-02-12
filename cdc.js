import jsforce from "jsforce";
import axios from "axios";
import colorize from "json-colorizer";
import { parseArgs } from "node:util";
import "dotenv/config";

const SF_USERNAME = process.env.SF_USERNAME;
const SF_PASSWORD = process.env.SF_PASSWORD;
const SF_SECURITY_TOKEN = process.env.SF_SECURITY_TOKEN;
const SF_LOGIN_URL = process.env.SF_LOGIN_URL;
const SF_INSTANCE_URL = process.env.SF_INSTANCE_URL;
const SF_CLIENT_ID = process.env.SF_CLIENT_ID;
const SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET;

// Parse command line arguments
const {
  values: { channel, recordId },
} = parseArgs({
  options: {
    channel: {
      type: "string",
      short: "c",
      default: "AccountChangeEvent",
    },
    recordId: {
      type: "string",
      short: "i",
    },
  },
});

// SFDC connection
let conn;

// Log in to Salesforce with username, password and security token
if (SF_USERNAME && SF_PASSWORD && SF_SECURITY_TOKEN) {
  conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });
  await conn.login(SF_USERNAME, SF_PASSWORD + SF_SECURITY_TOKEN);
}

// Log in to Salesforce with client credentials flow
if (SF_CLIENT_ID && SF_CLIENT_SECRET && SF_INSTANCE_URL) {
  const tokenResponse = await axios({
    method: "post",
    url: SF_INSTANCE_URL + "/services/oauth2/token",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SF_CLIENT_ID, // your connected app's Consumer Key
      client_secret: process.env.SF_CLIENT_SECRET, // your connected app's Consumer Secret
    }),
  });

  // 2. Extract token and instance info
  const { access_token, instance_url } = tokenResponse.data;

  // 3. Initialize a jsforce Connection
  conn = new jsforce.Connection({
    instanceUrl: instance_url,
    accessToken: access_token,
  });
}

// Log in to Salesforce
const user = await conn.identity();

console.log("Successfully logged in with Username:", user.username);

let count = 0;

// Subscribe to the streaming channel
conn.streaming.topic("/data/" + channel).subscribe((message) => {
  if (!recordId || (recordId && message.payload.ChangeEventHeader.recordIds.includes(recordId))) {
    console.log("--- AccountChangeEvent Received ---");
    console.log(colorize(JSON.stringify(message, null, 2)));
    count++;
    console.log(`Total messages received: ${count}`);
  }
});

console.log(`Subscribed to ${channel}`);

if (recordId) {
  console.log(`Filtering on RecordId: ${recordId}`);
}
