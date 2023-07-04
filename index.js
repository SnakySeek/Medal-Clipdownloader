const Axios = require("axios");
const fs = require('fs');
const { parse } = require('node-html-parser');



async function downloadFile(url, needsHtml) {
    if (needsHtml) {
        Axios.get(url).then(response => {
            const file = response.data;
            const root = parse(file);
            const metaTags = root.querySelectorAll('meta');
            metaTags.forEach(meta => {
                let property = meta.getAttribute('property');
                if (property==='og:video:url') {
                    downloadFile(meta.getAttribute('content'), false)
                }
            });
        }).catch(error => {console.error('Error retrieving HTML:', error)});
    } else {
        const { data, headers } = await Axios({url: url, method: 'GET', responseType: 'stream'});
        data.pipe(fs.createWriteStream('Clip.mp4'));
    }
}

async function download(downloadUrl) {
    if (String(downloadUrl).includes('cdn.medal.tv/ugcc/content-social')) {
        downloadFile(downloadUrl, false)
    } else {downloadFile(downloadUrl, true)}

}
download('https://medal.tv/games/roblox/clips/1hxoTxj8oGAtWD/jgrKC05WD8iT')