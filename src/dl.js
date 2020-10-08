const ytdl = require('ytdl-core');
const fs = require('fs');
const http = require('http');
const  { exec } = require('child_process');

const dltype = "mp4"; //download type

var server = http.createServer(handleRequest);

async function handleRequest(request, response){
    var url = "undefined";
    url = request.url;
    url = url.split("/");
    url = url[1];
    if (url == "favicon.ico") return;
    var urllist = url.split(",");
    var linklist = urllist;
    for (var i = 0; i < urllist.length; i++) {
        var ll = urllist[i];
        linklist[i] = `https://www.youtube.com/watch?v=${ll}`;
    }
    var leng = linklist.length;
    var names = [];
    var namelist = [];
    for (var i = 0; i < urllist.length; i++) {
        var temppp = urllist[i].split("/");
        temppp = temppp[3];
        temppp = temppp.split("=");
        temppp = temppp[1];
        namelist[i] = temppp;
    }
    if (namelist == undefined) {
        namelist = [];
    }
    for (var i = 0; i < leng; i++) {
        var ytl = linklist[i];
        if (namelist[i] == undefined) {
            namelist[i] = i;
        }
        var filen = namelist[i];
        var suc = 0;
        try {
            if (fs.existsSync(`${filen}.${dltype}`)) {
                suc = 1;
            }
        } catch (err) {

        }
        if (suc == 0) dl(ytl, filen);
        names[names.length] = filen;
    }
    response.write(`<html><head><script>var url = window.location.href; url = url.split("/"); url = url[3]; url = "http://localhost:80/download.html?" + url; window.location.assign(url);</script></head></html>`);
    response.end();
}

async function dl(link, file) {
    var fn = `${file}.${dltype}`;
    var vid = ytdl(link, {quality:"137"});
    var aud = ytdl(link, {quality:"140"});
    vid.pipe(fs.createWriteStream(`vid_${fn}`));
    aud.pipe(fs.createWriteStream(`aud_${fn}`));
    var idle = 0;
    setTimeout(function () {
        var int = setInterval(function () {
                var state = vid._transformState;
                state = state.writechunk;
                if (state == null) {
                    idle++;
                } else {
                    idle = 0;
                }
                if (idle > 1000) {
                    exec(`ffmpeg -i vid_${fn} -i aud_${fn} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${fn}`);
                    clearInterval(int);
                }
            }, 10);
    }, 120);
}

/*async function dl_list(linklist, namelist) {
    var leng = linklist.length;
    var names = [];
    if (namelist == undefined) {
        namelist = [];
    }
    for (var i = 0; i < leng; i++) {
        console.log(`downloading video ${i}`);
        var ytl = linklist[i];
        if (namelist[i] == undefined) {
            namelist[i] = i;
        }
        var filen = namelist[i];
        dl(ytl, filen);
        names[names.length] = filen;
    }
    console.log("finished downloading");
    return names;
}
*/

server.listen(2000);

console.log("ready");
