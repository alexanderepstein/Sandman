var time = null;
const notifier = require('electron-notifications');
const path = require('path');
const iconPath = path.join(__dirname, 'sleep.png');
var exec = require('child_process').exec;
var schedule = require('node-schedule');
var mins = [];
var hours = [];
var jobs=[];

var sleepTimes = [];

var audio = new Audio('alert.mp3');

function setTime(){
  time=document.getElementById('alarmTime').value;
  document.getElementById('sleepTimes').innerHTML = "Optimal sleeping times";
  document.getElementById('lblTime').innerHTML = "Notifications set.";
  //showNotification();
  generateSleepTimes();
  setSleepTimes();
  nodeJobs();
  console.log(sleepTimes);

 }

function generateSleepTimes()
{
  var splitTime = time.split(":")
  var wakeUpDate = new Date();
  if (!(splitTime[0]>= 0 && splitTime[0] <=12))
  {
    wakeUpDate.setDate(wakeUpDate.getDate() +1);
  }
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

}

function setSleepTimes()
{
  for (i = 0;i<=6;i++)
  {
    if (sleepTimes[i].getHours() <10)
    {
      hours[i] = "0" + sleepTimes[i].getHours();
    }
    else {
        hours[i] = sleepTimes[i].getHours();
    }
    if (sleepTimes[i].getMinutes()<10)
    {
      mins[i] = "0" + sleepTimes[i].getMinutes()
    }
    else {
      mins[i] = sleepTimes[i].getMinutes();
    }
  }

  document.getElementById('lblcheck0').innerHTML = hours[0]+":"+mins[0];
  document.getElementById('lblcheck1').innerHTML = hours[1]+":"+mins[1];
  document.getElementById('lblcheck2').innerHTML = hours[2]+":"+mins[2];
  document.getElementById('lblcheck3').innerHTML = hours[3]+":"+mins[3];
  document.getElementById('lblcheck4').innerHTML = hours[4]+":"+mins[4];
  document.getElementById('lblcheck5').innerHTML = hours[5]+":"+mins[5];
}

function nodeJobs()
{
for (i = 0;i<=6;i++)
  {
    try
    {
      jobs[i].cancel();
    }
    catch (e)
    {

    }

    jobs[i] = schedule.scheduleJob(sleepTimes[i],showNotification);
  }
}

function showNotification()
{
  try
  {
  audio.play()
  }
  catch (e)
  {

  }
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
