const fs = require('fs');
const crypto = require('crypto');

function generateRandomKey(length) {
    return crypto.randomBytes(length).toString('hex');
}

const apiKey = generateRandomKey(16);  // 32 characters
const secretKey = generateRandomKey(32);  // 64 characters

const envContent = `API_KEY=${apiKey}\nSECRET_KEY=${secretKey}\n`;

fs.writeFile('.env', envContent, (err) => {
    if (err) {
        console.error('Error writing to .env file', err);
    } else {
        console.log('.env file has been saved with random keys');
    }
});
