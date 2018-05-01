console.log('Test 5.1.2!');

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
  //console.log("Formatting Response Service List");
  var data = JSON.parse(someData);
  var jObject = new Object(Object.entries(data.TOSDR));

  //tosdrDictResp = data;
  //console.log(jObject);
  checkTOS(cleanedHost, jObject);
}

function formatResponse(someData){
  //console.log("Formating Response");
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
  
  //console.log("Grading TOS");
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

  //console.log("Getting TOS grade details");

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
  
  //console.log("Appending");

  var tD = document.getElementById(domId);

  //var newDate = document.createElement("p");
  var infoNode = document.createTextNode(letter);     // Create a text node
  //newDate.appendChild(dateNode);                               
  tD.appendChild(infoNode);
};

function checkTOS(host, jsonData){
 //console.log("Checking TOS");
  
  //console.log(jsonData);

  var tosdrLen = jsonData.length;

//should be set to false
  var boolTOS = false;

  for (var jd = 0; jd < tosdrLen; jd++){
    for (var urls_ = 0; urls_ < jsonData[jd][1].urls.length; urls_ ++){
      if (host == jsonData[jd][1].urls[urls_]){
        host = jsonData[jd][0];
        console.log(host);
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

function cleanHost(host){

  //console.log("Cleaninghost");

  //remove the prefixes
  if(host.substring(0, 4) == 'www.'){
    host = host.substring(4, host.length);
    console.log("new hostname = " + host);
  } else if (host.substring(0, 11) == 'http://www.'){
    //remove http
    host = host.substring(11, host.length);
    console.log("new hostname = " + host);
  } else if (host.substring(0, 12) == 'https://www.'){
    //remove https
    host = host.substring(12, host.length);
    console.log("new hostname = " + host);
  }

  return host;
}

function triggerTOSDR(myHostname){

  cleanedHost = cleanHost(myHostname);

  //location of tosdr reference;
  //var tosdrServiceList = "json/small_april29.json";

  tosdrDict.get(tosdrServiceList, formatResponseServiceList);

  console.log("hostname: " + cleanedHost);

}

function remChild(list){
  while (list.hasChildNodes()) {   
      list.removeChild(list.firstChild);
  }
}

function clearDOM(){

  var list1 = document.getElementById("gradeTOS");
    // As long as <ul> has a child node, remove it
   var list2 = document.getElementById("detailsTOS");
  // As long as <ul> has a child node, remove it
   var list3 = document.getElementById("gradePWND");
  // As long as <ul> has a child node, remove it
   var list4 = document.getElementById("detailsPWND");
  // As long as <ul> has a child node, remove it

  remChild(list1);
  remChild(list2);
  remChild(list3);
  remChild(list4);

}

function runIt(){

  //clear data
  clearDOM();

  newQuery = document.getElementById("submitBox").value;

  //console.log("new query: " + newQuery);

  triggerTOSDR(newQuery);
  showData(newQuery);
}
//------- GLOBAL VARIABLES ------------------------------
var tosdrServiceList = "json/tosdr_april29.json";

var finalOutput = "";

//replace with input
var cleanedHost = '';

var newQuery = document.getElementById("submitBox").value;
//triggerTOSDR(myHostname);

var tosdrDict = new HttpClient();
var tosdrDictResp = null;


//------Davon------------

//javascript page
//You've been Pwnd function
function pwnd(site){
  link = 'https://haveibeenpwned.com/api/v2/breaches?domain=' + site;
  return link;
}

var xhr = new XMLHttpRequest(); 

//testSite = document.getElementById("input").value;

//yourUrl = pwnd(testSite);


function showData(newQuery) {
  // var newQuery = document.getElementById("submitBox").value;
//    var newQuery = 'https://haveibeenpwned.com/api/v2/breaches?domain=adobe.com'
    
    //console.log(newQuery);

    xhr.open('GET',pwnd(newQuery),false);

    xhr.send();
    
    console.log(xhr.status);
    
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);    
        
        if(response[0] !== undefined){
            document.getElementById("detailsPWND").innerHTML = response[0].Description;
            console.log(response[0].Description);
        
        }
        if(response[0] == undefined){
            document.getElementById("detailsPWND").innerHTML = "No breach found";
        }
  }  
}