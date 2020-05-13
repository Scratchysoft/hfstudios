var search_items_file = `
{"list": [
    {"title":"Quick Smash", "type":"game", "id":0,"url":"https://theblueoompaloompa.itch.io/quick-smash"},
    {"title":"Circular Shooter", "type":"game", "id":1,"url":"https://theblueoompaloompa.itch.io/circular-shooter"},
    {"title":"Cow", "type":"art", "id":2,"src":"/images/Cow.svg"}
]}
`;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var query = getParameterByName("query");

if(getParameterByName("query") != null  && !window.location.href.includes("search.html")){
    window.location.replace("search.html?query=" + query);
}

if(getParameterByName("query") != null && window.location.href.includes("search.html")){
    document.getElementById("searchText").innerHTML = query;
    var obj = JSON.parse(search_items_file);
    console.log(obj);
    var results = [];
    var searchField = "title";
    var searchVal = query
    $("body").append('<ul id="results">');
    for (var i=0 ; i < obj.list.length ; i++)
    {
        if (obj.list[i][searchField].includes(searchVal)) {
            results.push(obj.list[i]);
            console.log(obj.list[i]["type"])
            if(obj.list[i]["type"] == "game"){
                $("ul#results").append('<li id="result"><a id="result" href="' + obj.list[i]["url"] + '">' + obj.list[i]["title"] + '</a></li>');
            }
            if(obj.list[i]["type"] == "art"){
                $("ul#results").append('<li id="result"><img id="result" width="300px" style="border-width: 10px;" src="' + obj.list[i]["src"] + '"></img></li>');
            }
        }
    }
    $("body").append("</ul>");
}


function openSearch(){
    var form = document.createElement("form");
    var inputbox = document.createElement("input");
    inputbox.setAttribute("type", "text");
    inputbox.setAttribute("id", "search_box");
    inputbox.setAttribute("name", "query");
    inputbox.setAttribute("style", "width: 100%; border-radius: 5px;")
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("style", "display: none;");
    form.appendChild(inputbox);
    form.appendChild(submit);
    document.getElementById("navbar-border").appendChild(form);
}