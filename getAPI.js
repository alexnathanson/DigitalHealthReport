console.log('Test 1!');

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open('GET',yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

yourUrl = 'https://tosdr.org/api/1/service/facebook.json'
var json_obj = JSON.parse(Get(yourUrl));
console.log('Test 2!');
console.log(json_obj.pointsData);