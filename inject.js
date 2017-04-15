function dothing() {
  oldCatsArray = chrome.storage.sync.get('catsArray', function(result) {
    oldCatsArray = result.catsArray;
  });
  if (oldCatsArray) {
    oldCatsArray.push(catCode);
  } else {
    oldCatsArray = [catCode];
  }
  console.log(oldCatsArray);
  chrome.storage.sync.set({
    catsArray: oldCatsArray
  })
};

var catCode;

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

      var randomCat = getRandomInt(1,4);

      var randomizedImgUrl = "icons/cat" + randomCat + ".png";
      img.src = chrome.extension.getURL(randomizedImgUrl);
      catCode = randomizedImgUrl;
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


// var div2 = document.getElementById('cat')[0];
// div2.addEventListener('click', function (event) {
//   alert('Hi!');
// });
