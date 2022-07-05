// Send a http post with a method and url
function httpPost(method,url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( method, post, false ); // false for synchronous request
    xmlHttp.send( null );
}

function click(item){
    document.querySelector(item).addEventListener('click', function(e) {
        httpPost("POST","https://bubble-machine-api-dummy.herokuapp.com/rest/session/1/step");
    location.reload();
    }, false);
}



// When clicking on nextstep button change step next simulation
click("#nextStep")


document.querySelector("#nextStep").addEventListener('click', function(e) {

}, false);

// When clicking on resetSimulation button reset simulation 
document.querySelector("#resetSimulation").addEventListener('click', function(e) {
    httpPost("PUT","https://bubble-machine-api-dummy.herokuapp.com/rest/session/1/reset");
    location.reload();
}, false);


// When clicking on disablefriends button add class to hide friend bubbles 
document.querySelector("#disablefriends").addEventListener('click', function(e) {
    var checkboxes = document.querySelectorAll('.person');
    for (var i = 0, len = checkboxes.length; i < len; i++) {
        checkboxes[i].classList.toggle("hide");
    }
}, false);

// When clicking on disableItems button add class to hide item bubbles 
document.querySelector("#disableItems").addEventListener('click', function(e) {
    var checkboxes = document.querySelectorAll('.item');
    for (var i = 0, len = checkboxes.length; i < len; i++) {
        checkboxes[i].classList.toggle("hide");
    }
}, false);


var
  svg = document.getElementById('mysvg'),
  NS = svg.getAttribute('xmlns');

function httpGet(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://bubble-machine-api-dummy.herokuapp.com/rest/session/1", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

const session = JSON.parse(httpGet());

// console.log(session);


function reversNumber(number){
if(number < 0){
    return Math.abs(number);
}
else{
    return Math.abs(number) * -1;
}
}

var i = 0;
var persons = 0;
var items = 0;
for (const item of session["nodes"] ) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(session["nodes"][i]["id"]+" | "+ session["nodes"][i]["label"]+" | X="+session["nodes"][i]["x"]+" | Y="+session["nodes"][i]["y"]));
    document.querySelector("#listNotes").appendChild(li);
    c = document.createElementNS(NS, 'circle');
    c.setAttribute('id',session["nodes"][i]["id"]);
    if(session["nodes"][i]["label"] == "person"){
        c.classList.add(session["nodes"][i]["label"]+persons);
        c.classList.add(session["nodes"][i]["label"]);
        persons++;
    }
    else{
        c.classList.add(session["nodes"][i]["label"]+items);
        c.classList.add(session["nodes"][i]["label"]);
        items++;
    }
    // c.classList.add(session["nodes"][i]["label"]);
c.setAttributeNS(null, 'cx', session["nodes"][i]["x"]);
c.setAttributeNS(null, 'cy',  reversNumber(session["nodes"][i]["y"]));
c.setAttributeNS(null, 'r', 0.6);
svg.appendChild(c);
    i++;
}



var i = 0;
for (const item of session["links"] ) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(session["links"][i]["label"]+" - "+session["links"][i]["source"]+" - "+session["links"][i]["target"]));
    document.querySelector("#listDocuments").appendChild(li);
    var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
newLine.setAttribute('id','line2');


switch (session["links"][i]["label"]) {
    case 'friend':
        newLine.setAttribute('x1',`${document.querySelector(".person"+session["links"][i]["source"]).cx.baseVal.value}`);
        newLine.setAttribute('y1',`${document.querySelector(".person"+session["links"][i]["source"]).cy.baseVal.value}`);
        newLine.setAttribute('x2',`${document.querySelector(".person"+session["links"][i]["target"]).cx.baseVal.value}`);
        newLine.setAttribute('y2',`${document.querySelector(".person"+session["links"][i]["target"]).cy.baseVal.value}`);
        newLine.setAttribute("stroke", "#ffff007a")
        newLine.setAttribute("stroke-width", "0.6")
        svg.append(newLine);
        i++;
    break;
    case 'infolink':
        if(session["links"][i]["target"] > 9){
            const number = session["links"][i]["target"];
            const arrOfDigits = Array.from(String(number), Number);
            for (const item of arrOfDigits ) {
                var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                newLine.setAttribute('x1',`${document.querySelector(".item"+session["links"][i]["source"]).cx.baseVal.value}`);
                newLine.setAttribute('y1',`${document.querySelector(".item"+session["links"][i]["source"]).cy.baseVal.value}`);
                newLine.setAttribute('x2',`${document.querySelector(".person"+item).cx.baseVal.value}`);
                newLine.setAttribute('y2',`${document.querySelector(".person"+item).cy.baseVal.value}`);
                newLine.setAttribute("stroke", "black")
                newLine.setAttribute("stroke-width", "0.01")
                // svg.append(newLine);
            }
    
            continue;
        }
        newLine.setAttribute('x1',`${document.querySelector(".item"+session["links"][i]["source"]).cx.baseVal.value}`);
        newLine.setAttribute('y1',`${document.querySelector(".item"+session["links"][i]["source"]).cy.baseVal.value}`);
        newLine.setAttribute('x2',`${document.querySelector(".person"+session["links"][i]["target"]).cx.baseVal.value}`);
        newLine.setAttribute('y2',`${document.querySelector(".person"+session["links"][i]["target"]).cy.baseVal.value}`);
        newLine.setAttribute("stroke", "black")
        newLine.setAttribute("stroke-width", "0.01")
        // svg.append(newLine);
        i++;
    break;
    case 'itemlink':
        if(session["links"][i]["target"] > 9){
            const number = session["links"][i]["target"];
            const arrOfDigits = Array.from(String(number), Number);
            for (const item of arrOfDigits ) {
                var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                newLine.setAttribute('x1',`${document.querySelector(".item"+session["links"][i]["source"]).cx.baseVal.value}`);
                newLine.setAttribute('y1',`${document.querySelector(".item"+session["links"][i]["source"]).cy.baseVal.value}`);
                newLine.setAttribute('x2',`${document.querySelector(".person"+item).cx.baseVal.value}`);
                newLine.setAttribute('y2',`${document.querySelector(".person"+item).cy.baseVal.value}`);
                newLine.setAttribute("stroke", "green")
                newLine.setAttribute("stroke-width", "0.01")
                // svg.append(newLine);
            }
    
            continue;
        }
        newLine.setAttribute('x1',`${document.querySelector(".item"+session["links"][i]["source"]).cx.baseVal.value}`);
        newLine.setAttribute('y1',`${document.querySelector(".item"+session["links"][i]["source"]).cy.baseVal.value}`);
        newLine.setAttribute('x2',`${document.querySelector(".person"+session["links"][i]["target"]).cx.baseVal.value}`);
        newLine.setAttribute('y2',`${document.querySelector(".person"+session["links"][i]["target"]).cy.baseVal.value}`);
        newLine.setAttribute("stroke", "green")
        newLine.setAttribute("stroke-width", "0.01")
        // svg.append(newLine);
        i++;
    break;
}



}


    // https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/


