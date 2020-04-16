if (window == top) {
    window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
}

trigger_key = 71; // g key
function doKeyPress(e) {
    if (e.shiftKey && e.keyCode == trigger_key) { // if e.shiftKey is not provided then script will run at all instances of typing "G"
        chrome.extension.sendRequest({ redirect: newurl }); //build newurl as per viewtext URL generated earlier.
    }
}