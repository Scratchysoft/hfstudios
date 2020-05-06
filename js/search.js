function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
if(getParameterByName("query") != null  && !window.location.href.includes("search.html")){
    window.location.replace("search.html?query=" + getParameterByName("query"));
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