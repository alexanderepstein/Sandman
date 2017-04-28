var time = null;
const notifier = require('electron-notifications');
const path = require('path');
const iconPath = path.join(__dirname, 'icon.png');
var exec = require('child_process').exec;
var cron = require('node-cron');
var task0,task1,task2,task3,task4,task5;
var cronStarted = 0;
var sleepTimes = [];

function setTime(){
  time=document.getElementById('alarmTime').value;
  document.getElementById('lblTime').innerHTML = "WakeUp Time: " + time;
  showNotification();
  generateSleepTimes();
  console.log(sleepTimes);
  startCronJobs();
 }

function generateSleepTimes()
{
  var splitTime = time.split(":")
  var wakeUpDate = new Date();
  wakeUpDate.setDate(wakeUpDate.getDate() +1);
  wakeUpDate.setHours(splitTime[0]);
  wakeUpDate.setMinutes(splitTime[1]-15);

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

function startCronJobs()
{
  if (cronStarted==1)
  {
    task0.stop();
    task1.stop();
    task2.stop();
    task3.stop();
    task4.stop();
    task5.stop();
  }
  if (document.getElementById('check0').checked)
  {
    var tempDate = log(sleepTimes[0]).split(" ");
    var tempTime = tempDate[4].split(":");
    console.log(tempTime)

  }
  cronStarted = 1;
}


function showNotification()
{

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
