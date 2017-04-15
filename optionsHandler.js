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
      for (i = 0; i < urlsArray.length; i++) {
        savedList.insertAdjacentHTML('beforeend',
          '<li>' + urlsArray[i] + '<button class="deleteBtn">&#10006;</button></li>');
      }
      setTimeout(function() {
        status.textContent = '';
      }, 750);
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
