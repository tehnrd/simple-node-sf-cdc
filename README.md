# CDC Project

## Description
This project connects to Salesforce and listens for CDC events.

## Prerequisites
- Node.js installed
- npm installed
- Salesforce account with API access

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/tehnrd/simple-node-sf-cdc
   ```
2. Navigate to the project directory:
   ```sh
   cd cdc
   ```
3. Install the necessary dependencies:
   ```sh
   npm install
   ```

## Configuration
1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` 

For username password login:
   ```env
   SF_USERNAME=<your-salesforce-username>
   SF_PASSWORD=<your-salesforce-password>
   SF_SECURITY_TOKEN=<your-salesforce-security-token>
   SF_LOGIN_URL=https://login.salesforce.com or https://test.salesforce.com
   ```
   For client credentials login flow:
   ```
   SF_CLIENT_ID=<connected-app-clientId>
   SF_CLIENT_SECRET=<connected-app-clientSecret>
   SF_DOMAIN=<instance-url>
   ```

## Usage

```
node cdc.js --channel <channel name> --recordId <record id to filter>
```
```
node cdc.js --channel AccountChangeEvent
```
```
node cdc.js --channel AccountChangeEvent --recordId 0015a00003SWRhFWFW
```
```
node cdc.js --channel ContractChangeEvent
```
```
node cdc.js --channel ContractChangeEvent --recordId 8005a000005DE54FDG
```

## License
This project is licensed under the MIT License.
