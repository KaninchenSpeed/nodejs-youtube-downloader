var download_list = [];
var dl = [];
var sw = 0;

function add() {
    var input = document.getElementById("in").value;
    if (input === "") return;
    document.getElementById("in").value = "";
    download_list[download_list.length] = input;
}

function download() {
    var url = "";
    for (var i = 0; i < download_list.length; i++) {
        if (i > 0) url += ",";
        url += download_list[i];
    }
    url = `http://localhost:2000/${url}`;
    window.location.assign(url);
}

function del() {
    var leng = download_list.length - 1;
    var temp = [];
    for (var i = 0; i < leng; i++) {
        temp[i] = download_list[i];
    }
    download_list = temp;
}

setInterval(function () {
    var disp = "";
    if (sw == 0) {
        for (var i = 0; i < download_list.length; i++) {
            if (i == 0) {
                disp = `<p id="out">${download_list[i]}</p><br>`;
            } else {
                disp += `<p id="out">${download_list[i]}</p><br>`;
            }
        }
    }
    
    document.getElementById("outsec").innerHTML = disp;
}, 10);
