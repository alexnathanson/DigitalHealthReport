//javascript page
//You've been Pwnd function
function pwnd(site){
	link = 'https://haveibeenpwned.com/api/v2/breaches?domain=' + site;
	return link;
}

var xhr = new XMLHttpRequest(); 

//testSite = document.getElementById("input").value;

//yourUrl = pwnd(testSite);


function showData() {
   var newQuery = document.getElementById("submitBox").value;
//    var newQuery = 'https://haveibeenpwned.com/api/v2/breaches?domain=adobe.com'
    
    console.log(newQuery);

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

