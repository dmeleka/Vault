import crypto from 'crypto'
import { config } from 'dotenv';
config()

const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.SECRET_KEY, 'hex');

function encryptData(req) {

    // Encrypt each object inside req.body
    const encryptedBody = {};

    for (const key in req.body) {
        if (Object.prototype.hasOwnProperty.call(req.body, key)) {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

            let encryptedData = cipher.update(JSON.stringify(req.body[key]), 'utf8', 'hex');
            encryptedData += cipher.final('hex');

            // Store the encrypted data and the IV separately in the output object
            encryptedBody[key] = {
                data: encryptedData,
                iv: iv.toString('hex')
            };
        }
    }
    return encryptedBody;
}

function decryptData(dataArray) {

    // Decrypt each object in the array
    const decryptedArray = dataArray.map(data => {
        // const decryptedData = {};

        // Define the properties to decrypt
        const propertiesToDecrypt = ['title', 'username', 'password', 'cardNumber', 'csv', 'expiryDate'];

        // Loop through each property to decrypt
        for (const property of propertiesToDecrypt) {
            if (data[property]) {
                const encryptedData = data[property].data;
                const iv = data[property].iv;

                // Convert the encrypted data and IV from hex to binary
                const encryptedDataBuffer = Buffer.from(encryptedData, 'hex');
                const ivBuffer = Buffer.from(iv, 'hex');

                // Initialize the cipher with the secret key and IV
                const decipher = crypto.createDecipheriv(algorithm, secretKey, ivBuffer);

                // Decrypt the data
                let decrypted = decipher.update(encryptedDataBuffer);
                decrypted = Buffer.concat([decrypted, decipher.final()]);

                // Convert the decrypted data from binary to a string
                const decryptedString = decrypted.toString('utf8');

                // Remove the extra quotes from the decrypted string
                data[property] = decryptedString.replace(/\"/g, '');
            }
        }

        return data;
    });

    return decryptedArray;
}



export { encryptData, decryptData }