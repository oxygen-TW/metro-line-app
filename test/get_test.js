var request = require('request');
request('https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/LiveBoard/KRTC?$format=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {

    var json = JSON.parse(body);

    for(var k in json) {
    	if(json[k]["StationName"]["Zh_tw"] == "高雄國際機場"){
	    	console.log(k, json[k]["StationID"]);
	   		console.log("本站->"+json[k]["StationName"]["Zh_tw"]);
		    console.log("\n路線->"+json[k]["LineName"]["Zh_tw"]);
		    console.log("\n目的地->"+json[k]["TripHeadSign"]);
		    var next_train = json[k]["EstimateTime"];
		    //next_train = (next_train == 0 ? "末班已過": next_train);
		    console.log("\n下班車->"+next_train+"分鐘後");	
    	}
	}
  }
})