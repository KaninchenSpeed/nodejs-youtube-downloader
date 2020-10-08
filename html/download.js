var download_list = [];
var dl = [];
var disp = "";
var port = "81";

var uri = window.location.href;
var ip = uri;
ip = ip.split("/");
ip = ip[2];
uri = uri.split("?");
uri = uri[1];
if (uri == undefined) {} else {
    var vo = uri.split(",");
    disp += "<h1>download</h1>";
    for (var i = 0; i < vo.length; i++) {
        download_list[i] = vo[i];
        dl[i] = `http://${ip}:${port}/${vo[i]}.mp4`;
        disp += `<a id="out" href="${dl[i]}" download>${vo[i]}</a><br>`
    }
    disp += "<h1>stream</h1>";
    for (var i = 0; i < vo.length; i++) {
        download_list[i] = vo[i];
        dl[i] = `http://${ip}:${port}/${vo[i]}.mp4`;
        disp += `<a id="out" href="${dl[i]}">${dl[i]}</a><br>`;
    }
    setInterval(function () {
        document.getElementById("main").innerHTML = disp;
    }, 100);
}