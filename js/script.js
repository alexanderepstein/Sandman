var time = null;
var exec = require('child_process').exec;

function setTime(){
  time=document.getElementById('alarmTime').value;
  document.getElementById('lblTime').innerHTML = "WakeUp Time: " + time;

    console.log(time)
 }
//TODO add logic here to generate list and either make it global or return the list
function generateSleepTimes()
{

}

 function shutdown(callback){
     exec('shutdown now', function(error, stdout, stderr){ callback(stdout); });
 }
