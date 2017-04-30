const notifier = require('electron-notifications'); //allow for notifications
const path = require('path'); //allow for use of path
const iconPath = path.join(__dirname, 'sleep.png'); //grabs the icon for notifications
const fs = require('fs');
const filePath = path.join(__dirname, 'settings.txt');
var time = null; //wakeuptime to be set by user
var exec = require('child_process').exec; //allows the shutdown of the host machine
var schedule = require('node-schedule'); //allows for jobs scheduled at certain times

var mins = []; //array to hold the mins for formatting
var hours = []; //array to hold the hours for formatting
var jobs = []; //array of node schedule jobs to be ran
var sleepTimes = []; //array of times to rest determined by algorithm
var audio = new Audio('alert.mp3'); //set up notification sound
var militaryTime = false;
var meridans = [];
var mySettings = null;
var tempTime = [];

function setTime() { //called when set wakeup time button is pressed
    time = document.getElementById('alarmTime').value; //grab the wake up time
    generateSleepTimes(); //determine sleepTimes based off of wakeuptime
    setSleepTimes(); //determine the sleepTimes in formatted form to be shown to user
    document.getElementById('sleepTimes').innerHTML = "Optimal sleeping times"; //change blank text
    nodeJobs(); //set up node-schedule jobs
    document.getElementById('lblTime').innerHTML = "Notifications set."; //change blank text
    //console.log(sleepTimes); //use this line to determine issue of timing

}



function readPreferences()
{
  readFile();
  mySettings = (mySettings).split(" ");
  if (mySettings[0] === "true")
  {
    militaryTime = true;
  }
  else
  {
    militaryTime = false;
  }
  time = mySettings[1];
  document.getElementById('alarmTime').value = time;
  setTime();
}

function loadPreferences()
{
  readFile();
  mySettings = (mySettings).split(" ");
  if (mySettings[0] === "true")
  {
    militaryTime = true;
  }
  else
  {
    militaryTime = false;
  }
  if (militaryTime)
  {
    document.getElementById('timeType').checked = true;
    document.getElementById('timeType2').checked = false;
  }
  else
  {
    document.getElementById('timeType').checked = false;
    document.getElementById('timeType2').checked = true;
  }
  document.getElementById('defaultTime').value = mySettings[1];
}

function readFile()
{
  //console.log("Running readfile");
  mySettings = fs.readFileSync(filePath,'utf8');
}

function setPreferences()
{
  var mytempstring = "";
  mytempstring = document.getElementById('timeType').checked + " ";
  tempTime = (document.getElementById('defaultTime').value).split(":");
  mytempstring = mytempstring + tempTime[0] + ":" + tempTime[1] + " ";
  mytempstring = mytempstring + "Insomniav1.1.0";
  writeFile(mytempstring);
  readFile();
  mySettings = (mySettings).split(" ");
  if (mySettings[0] === "true")
  {
    militaryTime = true;
  }
  else
  {
    militaryTime = false;
  }
  setSleepTimes();
}

function writeFile(settingsData)
{
  fs.writeFile(filePath, settingsData, (err) => {
  if (err) throw err;
});
}

function generateSleepTimes() {
    var splitTime = time.split(":") //split time into hours and minutes
    var wakeUpDate = new Date(); //set a new date object
    if (splitTime[0] < wakeUpDate.getHours() ||(splitTime[0] == wakeUpDate.getHours() && splitTime[1] < wakeUpDate.getMinutes())) //if condition met
    {
        wakeUpDate.setDate(wakeUpDate.getDate() + 1); //the alarm is for the next day
    }
    wakeUpDate.setHours(splitTime[0]); //set hours of wakeup date to wakeup time hours
    wakeUpDate.setMinutes(splitTime[1] - 15); //initially subtract 15 mins from wakeuptime to account for falling asleep
    wakeUpDate.setSeconds(0); //set just in case its anything but
    wakeUpDate.setMilliseconds(0); //set just in case its anything but

    for (i = 0; i < 6; i++) {
        wakeUpDate.setHours(wakeUpDate.getHours() - 1); //subtract 1 hour from perviously determined sleeptime
        wakeUpDate.setMinutes(wakeUpDate.getMinutes() - 30); //subtract 30 mins from perviously determined sleeptime
        sleepTimes[i] = new Date(wakeUpDate); //determine new sleeptime
    }
    sleepTimes = sleepTimes.reverse(); //want earliest times to come first not last

}

function setSleepTimes() //just setting the sleep times the user sees (special formatting exists here)
    {

  if (militaryTime)
  {
    for (i = 0; i < 6; i++) {
        if (sleepTimes[i].getHours() < 10) { //if hours is less than 10
            hours[i] = "0" + sleepTimes[i].getHours(); //put a zero in front of the string
        } else {
            hours[i] = sleepTimes[i].getHours(); //else just the hours
        }
        if (sleepTimes[i].getMinutes() < 10) { //if minutes is less than 10
            mins[i] = "0" + sleepTimes[i].getMinutes() //put a zero in front of the string
        } else {
            mins[i] = sleepTimes[i].getMinutes(); //else just the minutes
        }
    }
    document.getElementById('lblcheck0').innerHTML = hours[0] + ":" + mins[0]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck1').innerHTML = hours[1] + ":" + mins[1]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck2').innerHTML = hours[2] + ":" + mins[2]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck3').innerHTML = hours[3] + ":" + mins[3]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck4').innerHTML = hours[4] + ":" + mins[4]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck5').innerHTML = hours[5] + ":" + mins[5]; //add optimal sleep times to the HTML
  }
  else
  {
    for (i = 0; i < 6; i++) {
        if (militaryToStandard(sleepTimes[i].getHours()) < 10) { //if hours is less than 10
            hours[i] = "0" + militaryToStandard(sleepTimes[i].getHours()); //put a zero in front of the string
        } else {
            hours[i] = militaryToStandard(sleepTimes[i].getHours()); //else just the hours
        }
        if (sleepTimes[i].getMinutes() < 10) { //if minutes is less than 10
            mins[i] = "0" + sleepTimes[i].getMinutes() //put a zero in front of the string
        } else {
            mins[i] = sleepTimes[i].getMinutes(); //else just the minutes
        }
        meridans[i] = ampm(sleepTimes[i].getHours());
    }
    document.getElementById('lblcheck0').innerHTML = hours[0] + ":" + mins[0] + meridans[0]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck1').innerHTML = hours[1] + ":" + mins[1] + meridans[1]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck2').innerHTML = hours[2] + ":" + mins[2] + meridans[2]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck3').innerHTML = hours[3] + ":" + mins[3] + meridans[3]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck4').innerHTML = hours[4] + ":" + mins[4] + meridans[4]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck5').innerHTML = hours[5] + ":" + mins[5] + meridans[5]; //add optimal sleep times to the HTML
}
}

function nodeJobs() {
    for (i = 0; i < 6; i++) {
        try {
            jobs[i].cancel(); //try to cancel respective job
        } catch (e) {

        }

        jobs[i] = schedule.scheduleJob(sleepTimes[i], showNotification); //scheduling notification jobs
    }
}

function showNotification() {
    try {
        audio.play() //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify('Insomnia', { //Notification
        message: 'Time to rest',
        icon: iconPath,
        buttons: ['Dismiss', 'Shutdown'],
        vetical: true,
        duration: 20000,
    })

    notification.on('clicked', () => { //how to behave when notification is clicked
        notification.close();
    })

    notification.on('swipedRight', () => { //how to behave when notification is swipedRight
        notification.close();
    })

    notification.on('buttonClicked', (text, buttonIndex, options) => { //how to behave if one of the buttons was pressed
        if (text === 'Dismiss') {
            notification.close(); //close the notification
        } else if ("Shutdown") {
            shutdown(); //shutdown the computer
        }

    })
}

//from @charlietfl on StackOverflow
function militaryToStandard(hours) {
    /* make sure add radix*/
    var hours = ((hours + 11) % 12) + 1;
    return hours;
}


function ampm(hours24)
{
  hours24 = parseInt(hours24,10);
  if (hours24 > 11)
  {
    return "pm";
  }
  else
  {
    return "am";
  }
}
function shutdown(callback) {
    exec('shutdown now', function(error, stdout, stderr) {
        callback(stdout);
    }); //shutsdown the computer
}
