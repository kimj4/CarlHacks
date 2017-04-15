chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    chrome.tabs.executeScript(tab.id, {"file": "a.js"});
});




// document.addEventListener('DOMContentLoaded', function() {
//   var div = document.createElement("DIV");
//   div.id = "someName";
//   var img = document.createElement("IMG");
//   img.src = "/cat.png";
//   div.appendChild(img);
//   document.body.appendChild(div);
//
//   getCurrentTabUrl(function(url) {
//     renderStatus('Detecting ' + url);
//   });
//  });
