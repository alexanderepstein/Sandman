var time = null;
const notifier = require('electron-notifications');
const path = require('path');
const iconPath = path.join(__dirname, 'icon.png');
var exec = require('child_process').exec;
var schedule = require('node-schedule');
var jobs=[];

var sleepTimes = [];

var audio = new Audio('alert.mp3');

function setTime(){
  time=document.getElementById('alarmTime').value;
  document.getElementById('sleepTimes').innerHTML = "Optimal sleeping times";
  document.getElementById('lblTime').innerHTML = "Notifications set.";
  //showNotification();
  generateSleepTimes();
  nodeJobs();
  //console.log(sleepTimes);

 }

function generateSleepTimes()
{
  var splitTime = time.split(":")
  var wakeUpDate = new Date();
  wakeUpDate.setDate(wakeUpDate.getDate() +1);
  wakeUpDate.setHours(splitTime[0]);
  wakeUpDate.setMinutes(splitTime[1]-15);
  wakeUpDate.setSeconds(0);
  wakeUpDate.setMilliseconds(0);

  for(i=0;i<=6;i++)
  {
    wakeUpDate.setHours(wakeUpDate.getHours() -1);
    wakeUpDate.setMinutes(wakeUpDate.getMinutes()-30);
    sleepTimes[i]= new Date(wakeUpDate);
  }
  sleepTimes = sleepTimes.reverse();
  document.getElementById('lblcheck0').innerHTML = sleepTimes[0].getHours()+":"+sleepTimes[0].getMinutes();
  document.getElementById('lblcheck1').innerHTML = sleepTimes[1].getHours()+":"+sleepTimes[1].getMinutes();
  document.getElementById('lblcheck2').innerHTML = sleepTimes[2].getHours()+":"+sleepTimes[2].getMinutes();
  document.getElementById('lblcheck3').innerHTML = sleepTimes[3].getHours()+":"+sleepTimes[3].getMinutes();
  document.getElementById('lblcheck4').innerHTML = sleepTimes[4].getHours()+":"+sleepTimes[4].getMinutes();
  document.getElementById('lblcheck5').innerHTML = sleepTimes[5].getHours()+":"+sleepTimes[5].getMinutes();
}



function nodeJobs()
{
for (i = 0;i<=6;i++)
  {
    jobs[i] = schedule.scheduleJob(sleepTimes[i],showNotification);
  }
}

function showNotification()
{
  audio.play()
  const notification = notifier.notify('Insomnia', {
  message: 'Time to rest',
  icon: iconPath,
  buttons: ['Dismiss', 'Shutdown'],
  vetical: true,
  duration:20000,
})

notification.on('clicked', () => {
  notification.close();
})

notification.on('swipedRight', () => {
  notification.close();
})

notification.on('buttonClicked', (text, buttonIndex, options) => {
  if (text === 'Dismiss') {
    notification.close();
  } else if("Shutdown") {
    shutdown();
  }

})
}
 function shutdown(callback)
 {
     exec('shutdown now', function(error, stdout, stderr){ callback(stdout); });
 }
