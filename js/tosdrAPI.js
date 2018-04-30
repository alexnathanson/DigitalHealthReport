console.log('Test 4.29.4!');

//-------------FUNCTIONS!!!------------------------------------------------------------------

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (this.readyState == 4 && this.status == 200){
              console.log("successfull call to " + aUrl);
              //console.log(this.responseText);
              aCallback(anHttpRequest.responseText);
            }
        }
        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

function formatResponseServiceList(someData){
  //console.log(someData);
  var data = JSON.parse(someData);
  var jObject = new Object(Object.entries(data.TOSDR));

  //tosdrDictResp = data;
  //console.log(jObject);
  checkTOS(myHostname, jObject);
}

function formatResponse(someData){
  //var data=JSON.stringify(someData);
  var sData=JSON.parse(someData);

  //console.log(sData);

  gradeIt(sData);

}

function siteData(linkToGet){

  var getLink = tosdr(linkToGet);

  var siteGet = new HttpClient();
  var siteGetResp = null;
  siteGet.get(getLink, formatResponse);

}

//formats link
function tosdr(site){
	link = 'https://tosdr.org/api/1/service/' + site  + '.json';
	return link;
}

function gradeIt(apiDeets){
  
  //console.log(apiDeets);
  var output = "";
  
  if(apiDeets.class !== undefined && apiDeets.class){
    output = apiDeets.class;
  } else {
    output = "Grade not determined";
  }

  appendIt(output, "gradeTOS");

  gradeDetails(apiDeets);
}

function gradeDetails(json_obj){

  var pLen = json_obj.points.length;

  var score = 0.0; //should it be a int?
  for (var p = 0; p < pLen; p++){
    var thisPoint = json_obj.points[p];
    var thisTitle = json_obj.pointsData[thisPoint].title;
    console.log(thisTitle);
    appendIt(thisTitle, "detailsTOS");
  }
}

//filter by date
function appendIt(letter, domId){
 
  var tD = document.getElementById(domId);

  //var newDate = document.createElement("p");
  var infoNode = document.createTextNode(letter);     // Create a text node
  //newDate.appendChild(dateNode);                               
  tD.appendChild(infoNode);
};

function checkTOS(host, jsonData){
 // console.log(jsonData[0][0]);
  
  var tosdrLen = jsonData.length;

//should be set to false
  var boolTOS = false;

  for (var jd = 0; jd < tosdrLen; jd++){
    for (var urls_ = 0; urls_ < jsonData[jd][1].urls.length; urls_ ++){
      if (host == jsonData[jd][1].urls[urls_]){
        host = jsonData[jd][0];
        //console.log(host);
        boolTOS = true;
        break;
      }
    }
  }

  if (boolTOS != false){
    siteData(host);
  } else {
    finalOutput = "Grade not determined";
    appendIt(finalOutput, "gradeTOS");
  }

}

//-----------------STUFF --------------------------------

var myHostname = 'cnn.com'

//location of tosdr reference;
var tosdrServiceList = "json/tosdr_april29.json";
//var tosdrServiceList = "json/small_april29.json";

//remove the prefixes
if(myHostname.substring(0, 4) == 'www.'){
  myHostname = myHostname.substring(4, myHostname.length);
  console.log("new hostname = " + myHostname);
} else if (myHostname.substring(0, 11) == 'http://www.'){
  //remove http
  myHostname = myHostname.substring(11, myHostname.length);
  console.log("new hostname = " + myHostname);
} else if (myHostname.substring(0, 12) == 'https://www.'){
  //remove https
  myHostname = myHostname.substring(12, myHostname.length);
  console.log("new hostname = " + myHostname);
}

var tosdrDict = new HttpClient();
var tosdrDictResp = null;
tosdrDict.get(tosdrServiceList, formatResponseServiceList);

console.log("hostname: " + myHostname);


var finalOutput = "";
