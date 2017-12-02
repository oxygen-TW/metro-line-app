var request = require('request');
var ReadFile = require("fs");

var timer;
var FareTableJson = "";

//HttpGetFareTable();
FS();
ParseFareTable(FS(),"小港","高雄國際機場");

function ParseFareTable(FareTable,orig,dest){
	console.log(FareTable);
	var json = FareTable;

	var price = 0;
	var flag = false;
    for(var k in json) {
    	if(json[k]["OriginStationName"]["Zh_tw"] == orig && json[k]["DestinationStationName"]["Zh_tw"] == dest){
	    	console.log(k, json[k]['Fares'][2]['Price']);
	    	price = json[k]['Fares'][2]['Price'];
	    	flag = true;
    	}
	}
	if (!flag)
    	return "請輸入正確的車站";
   	else
    	return price;
}

function FS(){
		ReadFile.readFile('fare.json', (err, data) => {  
	    if (err) throw err;
	    let _FareTableJson = JSON.parse(data);
	    return JSON.parse(data);
	    //console.log(FareTableJson);
	});
}

/*function HttpGetFareTable(){
  clearTimeout(timer);

  request('https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/KRTC?$top=30&$format=json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        FareTableJson = body;
      }
    })
  console.log("Update Fare Table")
  timer = setInterval(HttpGetFareTable, 5000); //每一天抓取一次新資料
}*/