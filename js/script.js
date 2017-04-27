
function setTime(){
    var time=document.getElementById('alarmTime').value;
    console.log(time)
 }

$(function(){

 var shell = require('shell');
 // Require child_process
 var exec = require('child_process').exec;

 // Create shutdown function
 function shutdown(callback){
     exec('shutdown now', function(error, stdout, stderr){ callback(stdout); });
 }


 shutdown(function(output){
     console.log(output);
 });

  $('.github').on('click', 'a', function (e) {
             e.preventDefault();
             // Open URL with default browser.
             shell.openExternal(e.target.href);
         });
});
