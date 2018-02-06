// Subs count from YT and Twitch

// Сдесь редактирование файла ('' - обязательны)

var channelId = 'UCZfvLX7vf4rSd8OJFujgvSg' // For Youtube
var apiKey = 'AIzaSyBk8xION30TEINPmWFPsYJXFxyMd51ZvBY' // Also for YouTube
var channelIdtw = 'oleglivanov' // For Twitch
var apiKeytw = 's28lwjbid3b8ihhw22r7s1q2o0bjxz' // Also for Twitch

// Конец редактирования
function startSubs(content) {
    document.getElementById("Subs").innerHTML = content;
};

function subs() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        var myObj = {};
        if (this.response) {
            myObj = JSON.parse(this.response);
        }
        if (Object.keys(myObj).indexOf("items") !== -1) {
            startSubs(myObj.items[0].statistics.subscriberCount)
        }
    }
    var json = ('https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + channelId + '&key=' + apiKey);
    xmlhttp.open("GET", json, true);
    xmlhttp.send();
};

function startSubsT(content) {
    document.getElementById("TSubs").innerHTML = content;
};

function subsT() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        var myObj = {};
        if (this.response) {
            myObj = JSON.parse(this.response);
        }
        if (Object.keys(myObj).indexOf("_total") !== -1) {
            startSubsT(myObj._total)
        }
    }
    var json = ('https://api.twitch.tv/kraken/channels/' + channelIdtw + '/follows?client_id=' + apiKeytw)
    xmlhttp.open("GET", json, true)
    xmlhttp.send()
};
subsT()
subs()
setInterval(() => {
    subs()
    subsT()
}, 10000)