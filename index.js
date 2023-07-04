const Axios = require("axios");
const fs = require('fs');
const parser = require('htmlparser2')

async function downloadFile(url) {
    const { data, headers } = await Axios({
        url: url,
        method: 'GET',
        responseType: 'stream',
    });
    const stream = fs.createWriteStream('Clip.mp4');
    data.pipe(stream);
}

async function download(downloadUrl) {
    if (String(downloadUrl).includes('cdn.medal.tv/ugcc/content-social')) {
        downloadFile(downloadUrl)
    } else {

    }

}
download('')