function a(i,callback){
    while(i<13){
    i++;
  }
  callback("ok");
}

a(1,function(result){
	var timeInMs = Date.now();
    console.log("++完畢！"+result);
    var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();

	console.log(timeStampInMs, Date.now());
});