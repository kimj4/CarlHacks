// adds an image to the page when background.js says to
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var div = document.createElement('div');
    div.style.left = '50\%';
    var img = document.createElement('img');
    img.src = "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg";
    div.appendChild(img);
    document.body.appendChild(div);
});
