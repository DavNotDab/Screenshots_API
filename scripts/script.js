import screenshotmachine from 'screenshotmachine';
import {uploadFile} from './drive.js';
const customerKey = '545b8c';
const secretPhrase = '';

// Array with all the sites' URLs to be screenshotted
const urls = [
    "https://ifunded.de/en/",
    "www.propertypartner.co",
    "propertymoose.co.uk",
    "www.homegrown.co.uk",
    "https://www.realtymogul.com"
];

// Function that takes a site's URL and returns the site's screenshot URL
function takeScreenshot(url) {
    let options = {
        url: url,
        dimension: '1920x1080',
        device: 'desktop',
        format: 'jpg',
        delay: '100',
    }

    return screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);
}

// Function that convert the sites' URLs into the sites' screenshots URLs
// Takes an array of sites' urls as parameter and returns a same-length array with the sites' screenshots URLs
function getApiUrls(urls) {
    return urls.map(takeScreenshot);
}

// Function that gets the clean name of a site given its URL
// Takes an array of sites' urls as parameter and returns a same-length array with the sites' clean names
function getFileNames(urls) {
    return urls.map(url => url.replace(/.+\/\/|www.|\..+/g, ''));
}

const screenshots = getApiUrls(urls);
const names = getFileNames(urls);

// Loop that uploads all the screenshots to Google Drive
// It also logs any errors that may occur
for (let i = 0; i < screenshots.length; i++) {
    uploadFile(screenshots[i], `${i+1}_`+names[i]+'.jpg').then(() => {
        console.log('File uploaded');
    }).catch((error) => {
        console.log(error.message);
    });
}

// To see the uploaded files,
// go to https://drive.google.com/drive/folders/1G2WJtMyf79-Voyl56K2sE1K0uwwqjxTi?usp=sharing
