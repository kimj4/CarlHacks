// document.addEventListener('DOMContentLoaded', function() {
function saveData() {
    var urls = document.getElementById('tbox').value;
    chrome.storage.sync.set({
      userUrls: urls
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      var savedList = document.getElementById('savedList');
      var i;
      urlsArray = urls.split(/\r\n|\r|\n/);
      savedList.innerHTML = "";
      for (i = 0; i < urlsArray.length; i++) {
        savedList.insertAdjacentHTML('beforeend',
          '<li>' + urlsArray[i] + '</li>');
      }
      if (document.getElementById('remove') == null) {
        document.getElementById('allSaved').insertAdjacentHTML('afterend', '<div><button id="remove">Remove all</button></div>');
        document.getElementById('remove').addEventListener('click', removeData);
      }
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
}

function removeData() {
  console.log("jfc");
  chrome.storage.sync.set({
    userUrls: ''
  }, function() {
    var savedList = document.getElementById('savedList');
    savedList.innerHTML = "";
    var tbox = document.getElementById('tbox');
    tbox.value = '';
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    userUrls: ''
  }, function(items) {
    document.getElementById('tbox').value = items.userUrls;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restore_options();
  document.getElementById('saveBtn').addEventListener('click', saveData);
});
