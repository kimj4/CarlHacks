function dothing() {
  alert("aaa");

  oldCatsArray = chrome.storage.sync.get('catsArray', function(result) {
    oldCatsArray = result.catsArray;
  });
  if (oldCatsArray) {
    oldCatsArray.push(1);
  } else {
    oldCatsArray = [1];
  }
  console.log(oldCatsArray);
  chrome.storage.sync.set({
    catsArray: oldCatsArray
  })
};

// adds an image to the page when background.js says to
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (document.getElementById('cat') == null) {
      var div = document.createElement('div');
      div.style.position = 'absolute';

      var left = Math.random() * 100;
      div.style.left = left.toString() + "\%";

      var right = Math.random() * 100;
      div.style.right = right.toString() + "\%";

      var top = Math.random() * 100;
      div.style.top = top.toString() + "\%";

      var bottom = Math.random() * 100;
      div.style.bottom = bottom.toString() + "\%";
      // alert(div.style.left + "   " + div.style.right);

      var img = document.createElement('img');
      img.src = "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg";
      img.height = '50';
      img.width = '50';
      div.id = 'cat';
      div.appendChild(img);
      document.body.appendChild(div);
      var div2 = document.getElementById('cat');
      div2.addEventListener("click", dothing);
    } else {
      // alert(document.getElementById('cat'));
    }


});


// var div2 = document.getElementById('cat')[0];
// div2.addEventListener('click', function (event) {
//   alert('Hi!');
// });
