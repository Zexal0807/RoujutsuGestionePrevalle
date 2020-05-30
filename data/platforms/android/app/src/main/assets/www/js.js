var content = "https://www.roujutsu.it/app/myasd/1/app-home";
var push;

console.log("INZIO: "+(new Date).getSeconds() +":"+(new Date).getUTCMilliseconds());

document.addEventListener('deviceready', function(){
	push = PushNotification.init({
		"android": {
			"senderID": "1036831153583",
			"forceShow": true
		},
		"ios": {
			"sound": true,
			"vibration": true,
			"badge": true
		},
		"windows": {}
	});
	
	//Gruppo TUTTE-ASD
	push.subscribe('my-asd',function(){
		console.log('success');
	},function(e){
		console.log('error:', e);
	});
	//Gruppo Singola Asd
	push.subscribe('my-asd-1',function(){
		console.log('success');
	},function(e){
		console.log('error:', e);
	});
	
	push.on('registration', function(data) {
		console.log("ID: "+data.registrationId);
		console.log("REGISTRAZIONE " + (new Date).getSeconds() +":"+(new Date).getUTCMilliseconds());
		var oldRegId = localStorage.getItem('registrationId');
			localStorage.setItem('registrationId', data.registrationId);
		if (oldRegId !== data.registrationId) {
		}
	});

	push.on('error', function(e) {
		console.log("push error = " + e.message);
	});
	
	push.on('notification', function(data) {
		console.log("NOTIFICATION "+(new Date).getSeconds() +":"+(new Date).getUTCMilliseconds());
		console.log(data);
		var page = "";
		if(data.additionalData.page != undefined){
			page = data.additionalData.page;
		}
		loadUrl(content+page);
	});
});
console.log("FINE "+(new Date).getSeconds() +":"+(new Date).getUTCMilliseconds());
setTimeout(function(){
	loadUrl(content)
}, 2000);
function loadUrl(url){
	location.href=url;
}