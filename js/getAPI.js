console.log('Test 4.24.10!');

var header = false;

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open('GET',yourUrl,false);

    if (header){
          Httpreq.sendRequestHeader();
    }

    Httpreq.send(null);
    return Httpreq.responseText;          
}

function tosdr(site){
	link = 'https://tosdr.org/api/1/service/' + site  + '.json';
	return link;
}

function builtWith(site){
  //https://api.builtwith.com/v12/api.json?KEY=e1ce53d9-75d5-4ee7-bcf7-66692b762d3d&LOOKUP=builtwith.com
	link = 'https://api.builtwith.com/v12/api.json?KEY=e1ce53d9-75d5-4ee7-bcf7-66692b762d3d&LOOKUP=nytimes.com';
  //link = 'https://api.builtwith.com/v12/api.json?KEY=e1ce53d9-75d5-4ee7-bcf7-66692b762d3d&LOOKUP=' + site + '.com';
	return link;
}

var HttpClient = function() {
    console.log("do a thing");
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

function whoIs(site){
	var domain 	= "whoapi.com";	// domain name you want to check
	//var r 		= "taken";	// check availability
	var apikey 	= 'f7fec7f7af624870b8b3eba01db44822';	// your API key
//http://api.whoapi.com/?apikey=f7fec7f7af624870b8b3eba01db44822&r=whois&domain=nytimes.com&ip=
//http://api.whoapi.com/?ip=52.32.117.162&r=ipwhois&apikey=demokey
//http://api.whoapi.com/?domain=whoapi.com&r=whois&apikey=demokey
//former:
	//link = 'http://api.whoapi.com/?apikey=' + apikey + '&r=whois&domain=' + site + '.com';
  link = 'http://api.whoapi.com/?domain=' + site + '.com' + '&r=whois&&apikey=' + apikey;

	return link;
}




function loadJSON() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data=JSON.stringify(this.responseText);
        data=JSON.parse(data);
        console.log("Http Request!");
        console.log(data);
    }
  };
  http.open("GET", "timewellspent.json", true);
  http.send();
}

var myHostname = window.location.hostname; //this gets the name of the particular window

console.log("hostname: " + myHostname);

//remove the prefixes
if(myHostname.substring(0, 4) == 'www.'){
  myHostname = myHostname.substring(4, myHostname.length);
  console.log("new hostname = " + myHostname);
} else if (myHostname.substring(0, 10) == 'http://www.'){
  //remove http
  myHostname = myHostname.substring(10, myHostname.length);
  console.log("new hostname = " + myHostname);
} else if (myHostname.substring(0, 11) == 'https://www.'){
  //remove https
  myHostname = myHostname.substring(11, myHostname.length);
  console.log("new hostname = " + myHostname);
}


testSite = myHostname;

/*
var client = new HttpClient();
client.get('https://api.builtwith.com/v12/api.json?KEY=e1ce53d9-75d5-4ee7-bcf7-66692b762d3d&LOOKUP=nytimes.com', function(response) {
    console.log('new test!');
    console.log(response);
});*/

/*
yourUrl = tosdr(testSite);
var json_obj = JSON.parse(Get(yourUrl));
console.log(json_obj.pointsData);
*/

/*
yourUrl = whoIs(testSite);
var json_obj = JSON.parse(Get(yourUrl));
//var getIt = Get(yourUrl);
//console.log(getIt.whois_raw);
console.log(json_obj);
*/

/*
yourUrl = builtWith(testSite);
var json_obj = JSON.parse(Get(yourUrl));
console.log(json_obj);
*/

data = 'timewellspent.json';

//loadJSON();




appendIt();

//filter by date
function appendIt(){
  var siteData = tosdr(testSite);
  var json_obj = JSON.parse(Get(siteData));

  //var dd = today.getDate();
  //var mm = today.getMonth()+1; //January is 0!
  //var yyyy = today.getFullYear();

  console.log("Terms of Service; Didn't Read");
  console.log(json_obj.pointsData);
  
  var tD = document.getElementById("details");

  //var newDate = document.createElement("p");
  var infoNode = document.createTextNode(json_obj.pointsData);     // Create a text node
  //newDate.appendChild(dateNode);                               
  tD.appendChild(infoNode);
};

function checkTOS(hostname){
  //get dictionary
  //loop through it

  /*
  for (var i = 0; i < dictTOS.length; i++){
    
    //if the hostname matches break
    if (){
      break;
    }
    
  }
  */
}