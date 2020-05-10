var search_items;

function getJSON(){
    $.getJSON("search_items.json", function(json) {
        console.log(json.Items[0].URL); // this will show the info it in firebug console
    });
}
getJSON();
var s = JSON.parse(search_items);
var page_urls = [];
var page_itemn;

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function findStringInItemList(list, item){
    y = [];
    for(var x = 0; x < list.length; x++) {
        if(list[x].Name.includes(item)){
            y.push(x);
        }
    }
    return y;
}

if(getParameterByName("query") != null  && !window.location.href.includes("search.html")){
    window.location.replace("search.html?query=" + getParameterByName("query"));
}
if(getParameterByName("query") != null && window.location.href.includes("search.html")){
    document.getElementById("searchText").innerHTML = getParameterByName("query");
    page_itemn = findStringInList(s.Items);
    page_itemn.forEach(element => {
        page_urls.push(s.Items[element].URL);
        $("body").append("<p>" + s.Items[element].URL + "</p>");
    });

    
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