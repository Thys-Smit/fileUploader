/*
 * @Author: Thys Smit 
 * @Date: 2017-11-23 11:48:36 
 * @Last Modified by:   Thys Smit 
 * @Last Modified time: 2017-11-23 11:48:36 
 */

function getJSON() {
    var url = '/API/backup/'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText)
    }

    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}