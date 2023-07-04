const Axios = require("axios");
const fs = require('fs');




async function getData(url) {
    const { data, headers } = await Axios({
        url: String(url),
        method: 'GET',
        responseType: 'stream',
    });
    return data;
}

async function download(downloadUrl) {
    const data = getData(downloadUrl)
    if (String(downloadUrl).includes('cdn.medal.tv/ugcc/content-social')) {
        const stream = fs.createWriteStream('Clip.mp4');
        data.pipe(stream);
    } else {
        
    }

}
download('https://medal.tv/games/roblox/clips/1hxoTxj8oGAtWD/jgrKC05WD8iT')