/*
Oxygen Studio
Liu,Tzu-Hao
v 1.0.0 beta
*/

var linebot = require('linebot');
var express = require('express');
var request = require('request');

var _download = HttpGet();
var timer;

var bot = linebot({
  channelId: 1527136017,
  channelSecret: "ae5c818dd9b4e9a078de5afc7eb0df4f",
  channelAccessToken: "cv2K/C6EtWNsTuqT5MOSo+yzKQnCxf9DlHqHy8I5jhNM49q0HO42fGY1J/ZmDce82OMeF2XTxN/oxMiGUqJFNikKSmJJj5d4SawMKsKS2LLZ0CrI9+fJVnqxrn3op30VfhAYAemWlVSzhiHnsjHxfAdB04t89/1O/w1cDnyilFU="
});

_bot();
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//port 3000 to 8080
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

function _bot() {
    bot.on('message', function(event) {
    if (event.message.type = 'text') {
      var msg = event.message.text;
      var replyMsg = ParseData(msg,_download);
      event.reply(replyMsg).then(function(data) {
        // success 
        console.log("log->"+replyMsg);
      }).catch(function(error) {
        // error 
        console.log('error');
      });
    }
  });
}

function ParseData(station,body){

      var json = JSON.parse(body);
      var flag = false;

      if(station == "關於" || station == "幫助") //中文保留字
        return ;

      if(station == "about" || station == "help") //英文保留字
        return ;

      var msgBack = "";
      for(var k in json) {
        if(json[k]["StationName"]["Zh_tw"] == station){

          var next_train = json[k]["EstimateTime"];
          next_train_status = (next_train == 0 ? "即將進站": next_train+"分鐘後");
          /*console.log(k, json[k]["StationID"]);
          console.log("本站->"+json[k]["StationName"]["Zh_tw"]);
          console.log("路線->"+json[k]["LineName"]["Zh_tw"]);
          console.log("目的地->"+json[k]["TripHeadSign"]);
          console.log("下班車->"+next_train_status);*/ 

          if(!flag)
            msgBack += "本站："+json[k]["StationName"]["Zh_tw"];

          flag = true; //set flag 
          msgBack += "\n\n"+json[k]["TripHeadSign"] + "\n下班車->"+next_train_status;
          //return "Find";
        }
    }
    if (!flag)
      return "請輸入正確的車站";
    else
      return msgBack;
}

function HttpGet(){
  clearTimeout(timer);

  request('https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/LiveBoard/KRTC?$format=json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        _download = body;
      }
    })
  console.log("Update data")
  timer = setInterval(HttpGet, 5000); //每5秒抓取一次新資料
}