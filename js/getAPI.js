console.log('Test 2!');

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open('GET',yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

function tosdr(site){
	link = 'https://tosdr.org/api/1/service/' + site  + '.json';
	return link;
}

function adTech(site){
	link = ' ' + site + ".json";
	return link;
}

testSite = 'facebook';

yourUrl = tosdr(testSite);

var json_obj = JSON.parse(Get(yourUrl));
console.log(json_obj.pointsData);

yourUrl = adTech(testSite);
