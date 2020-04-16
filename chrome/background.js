// 'use strict';

// chrome.runtime.onMessage.addListener(
//     function (message, callback) {
//         if (message == "changeColor") {
//             chrome.tabs.executeScript({
//                 code: 'document.body.style.backgroundColor="orange"'
//             });
//         }
//     });

chrome.runtime.onMessage.addListener(
    function (message, callback) {
        // console.log("message", message);
        
        // if (message == "runContentScript") {
            chrome.tabs.executeScript({
                file: 'content-script.js'
            });
        // }
    });

// chrome.runtime.onMessage.addListener(
//     function(message, callback) {
//         chrome.tabs.executeScript({
//             // code: 'document.body.style.backgroundColor="orange"'
//             code: 'console.log("orange")'
//         });
//    });

// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelector('button').addEventListener('click', main);      
// });
// function main() {
//   var source = document.getElementById('source').value;
//   document.getElementById("result").innerHTML = source;
// }