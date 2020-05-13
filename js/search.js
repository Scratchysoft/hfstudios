var reader; //GLOBAL File Reader object for demo purpose only

/**
 * Check for the various File API support.
 */
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true; 
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

var search_items_file;

/**
 * read text input
 */
function readText(filePath) {
    var output = ""; //placeholder for text output
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            search_items_file = output;
        };//end onload()
        reader.readAsText(filePath.files[0]);
    }//end if html5 filelist support
    /*else if(ActiveXObject && filePath) { //fallback to IE 6-8 support via ActiveX
        try {
            reader = new ActiveXObject("Scripting.FileSystemObject");
            var file = reader.OpenTextFile(filePath, 1); //ActiveX File Object
            output = file.ReadAll(); //text contents of file
            file.Close(); //close file "input stream"
            displayContents(output);
        } catch (e) {
            if (e.number == -2146827859) {
                alert('Unable to access local files due to browser security settings. ' + 
                    'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' + 
                    'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"'); 
            }
        }       
    }*/
    else { //this is where you could fallback to Java Applet, Flash or similar
        return false;
    }       
    return true;
}

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
    readText("json/search_items.json")
    var obj = JSON.parse(search_items_file);
    console.log(obj);
    var results = [];
    var searchField = "title";
    var searchVal = query
    for (var i=0 ; i < obj.list.length ; i++)
    {
        if (obj.list[i][searchField].includes(searchVal)) {
            results.push(obj.list[i]);
            if(obj.list[i]["type"] == "game"){
                $("body").append('<a href="' + obj.list[i]["url"] + '">');
            }
            if(obj.list[i]["type"] == "art"){
                $("body").append('<img src="' + obj.list[i]["src"] + '">');
            }
        }
    }
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