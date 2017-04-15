// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}


/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function getUrl(searchTerm, callback, errorCallback) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
  });
  errorCallback(url);
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function populateZoo() {
  chrome.storage.sync.get({
    userUrls: '',
    catsArray: []
  }, function(items) {
    var x ="", i, j;
    var offsetWidth = document.getElementById('zoodiv').offsetWidth;
    var thirdOffsetWidth = offsetWidth / 3;

    // add circles and cats
    for (i=1; i<=4; i++) {

      // x = x + '<div id="layer ' + i + '">';
      // for (j = 1; j <= 3; j++) {
      //   x = x + '<img src="/icons/circle.png" height="' + thirdOffsetWidth +
      //     '" width = "' + thirdOffsetWidth + '">';
      // }
      // x = x + '</div>';
      var div = document.createElement('div');
      div.id = 'layer ' + i;
      div.style.width = offsetWidth.toString() + 'px';
      div.style.position = 'relative';
      var posy = (i - 1) * thirdOffsetWidth;
      // var posy = offsetWidth;
      div.style.top = posy.toString() + 'px';
      for (j = 1; j <= 3; j++) {
          var img = document.createElement('img');
          img.src = "/icons/circle.png";
          img.height = thirdOffsetWidth;
          img.width = thirdOffsetWidth;
          img.style.position = 'absolute';
          var pos = (j - 1) * (thirdOffsetWidth);
          img.style.left = pos.toString() + 'px';
          div.appendChild(img);
      }
      document.getElementById("zoodiv").appendChild(div);
    }

    for (i = 0; i < 4; i++) {
      var curLayer = document.getElementById('layer ' + (i + 1).toString());
      for (j = 0; j < 3; j++) {
          var cat = document.createElement('img');
          cat.id = 'cat' + (i + j + 1).toString();
          cat.src = items.catsArray[i + j];
          cat.height = thirdOffsetWidth;
          cat.width = thirdOffsetWidth;
          cat.style.position = 'absolute';
          var posl = j * thirdOffsetWidth;
          // alert(posl);
          cat.style.left = posl.toString() + 'px';
          // cat.style.top = 0;
          curLayer.appendChild(cat);
      }
    }

    // for (i = 1; i <= items.catsArray.length; i++) {
    //   // alert(items.catsArray.length);
    //   var curLayer = document.getElementById('layer ' + Math.ceil(i/3).toString());
    //   var cat = document.createElement('img');
    //   cat.id = 'cat' + i;
    //   cat.src = items.catsArray[i - 1];
    //   cat.height = thirdOffsetWidth;
    //   cat.width = thirdOffsetWidth;
    //
    //   cat.style.position = 'absolute';
    //   var posl = i * thirdOffsetWidth;
    //   cat.style.left = posl.toString + 'px';
    //   // cat.style.top = 0;
    //   curLayer.appendChild(cat);
    // }

  });
});


document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    pathArray = url.split( '/' );
    var protocol = pathArray[0];
    var host = pathArray[2];
    var homesite = protocol + '//' + host;
    renderStatus('Detecting ' + homesite);
    if (homesite == "https://www.google.com") {
      renderStatus('You\'re on an approved site');
    }
  });
 });
