# CDC Project

## Description
This project connects to Salesforce and listens for Account Change Events using the jsforce library.

## Prerequisites
- Node.js installed
- npm installed
- Salesforce account with API access

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
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
2. Add the following environment variables to the `.env` file:
   ```env
   SF_USERNAME=<your-salesforce-username>
   SF_PASSWORD=<your-salesforce-password>
   SF_SECURITY_TOKEN=<your-salesforce-security-token>
   SF_LOGIN_URL=<your-salesforce-login-url>
   ```

## Usage
1. To start the project, run the following command:
   ```sh
   npm start
   ```
2. The project will log in to Salesforce and subscribe to the Account Change Events channel.
3. You can filter the events by setting the `recordIdFilter` variable in the `cdc.js` file:
   ```javascript
   // ...existing code...
   const recordIdFilter = "0015a00003K9pycAAB"; // Set your desired record ID
   // ...existing code...
   ```

## License
This project is licensed under the MIT License.
