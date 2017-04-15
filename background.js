setInterval(checkCurrent, 500); // run every second

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  console.log("in getCurrentTabUrl");
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}


function checkCurrent() {
  getCurrentTabUrl(function(url) {
    chrome.storage.sync.get({
      userUrls: ''
    }, function(items) {
      var goodUrls;
      goodUrls = items.userUrls;
      var goodUrlsArray = goodUrls.split('\n');

      pathArray = url.split( '/' );
      var protocol = pathArray[0];
      var host = pathArray[2];
      var homesite = host;

      var i, ulen;
      ulen = goodUrlsArray.length;
      for (i = 0; i < ulen; i++) {
        if (homesite == goodUrlsArray[i]) {
        }
      }
    });
  });
}


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
