import {google} from "googleapis";
import got from 'got';

// Auth details
const CLIENT_ID = '13144220183-uq6q6n2rqj7dde8q972j5e3f8rsq2opi.apps.googleusercontent.com';
const CLIENT_SECRET = '##########';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '##########';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oAuth2Client
})

// Function that uploads a file to Google Drive
// Takes the file's URL, the file's name and the file's type as parameters
// The file's type is optional and defaults to 'image/jpg'
export async function uploadFile(url, name, type = 'image/jpg') {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: name,
                mimeType: type,
                parents: ['1G2WJtMyf79-Voyl56K2sE1K0uwwqjxTi']
            },
            media: {
                mimeType: type,
                body: got.stream(url)
            }
        });
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}
