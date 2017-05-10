const notifier = require('electron-notifications'); //allow for notifications
const path = require('path'); //allow for use of path
const iconPath = path.join(__dirname, 'sleep.png'); //grabs the icon for notifications
const os = require('os');
const audio = new Audio('alert.mp3'); //set up notification sound
const exec = require('child_process').exec; //allows the shutdown of the host machine
const schedule = require('node-schedule'); //allows for jobs scheduled at certain times
const {shell} = require('electron'); // allows the ability to open a webpage in users default browser
const settings = require('electron-settings');
const fs = require('fs');
const filePath = path.join(__dirname, 'settings.txt');

var restNotification = false;
var upTimeNotification = false;
var time = null; //wakeuptime to be set by user
var appVersion = null; //setting to store the app version
var militaryTime = false; // setting determining whether to show times in military time
var seenRelease = false; //checks if user has already seen update exists and ignored id
var mins = []; //array to hold the mins for formatting
var hours = []; //array to hold the hours for formatting
var jobs = []; //array of node schedule jobs to be ran
var sleepTimes = []; //array of times to rest determined by algorithm
var meridians = []; //array to hold the merdians to respective sleepTimes if militaryTime is false
var tempTime = []; //used for a temperary purpose not sure if reffered to outside of function
var latestRelease = null;
var upTimeJob = null;
var resetTime = null;

function setTime() { //called when set wakeup time button is pressed
    settings.set('Version','v1.5.0')
    time = document.getElementById('alarmTime').value; //grab the wake up time
    generateSleepTimes(); //determine sleepTimes based off of wakeuptime
    setSleepTimes(); //determine the sleepTimes in formatted form to be shown to user
    document.getElementById('sleepTimes').innerHTML = "Optimal sleeping times"; //change blank text
    nodeJobs(); //set up node-schedule jobs
    document.getElementById('lblTime').innerHTML = "Notifications set."; //change blank text
    //console.log(sleepTimes); //use this line to determine issue of timing

}

function writeFile(settingsData)
{
  fs.writeFile(filePath, settingsData, (err) => {  //write the settings file that will contain the settingsData parameter
  if (err) throw err;
});
try //for error catching
{
fs.chmodSync(filePath, '777'); //set up permissions (seems to fix issue of linux reading settings after install)
}
catch (e)
{
  console.log("Error setting permissions on settings.txt") //log this error to the console (basically occurs everytime after the first run)
}
}

function readPreferences()
{
  if (settings.get('militaryTime','false') === "true") //if militaryTime preference is set to true
  {
    militaryTime = true; //set the preference in the code
  }
  else //if standard time preference
  {
    militaryTime = false; //set the military time perference in the code to false
  }
  time = settings.get('defaultTime','08:30'); //set time variable
  appVersion = settings.get('Version','v1.5.0');
  document.getElementById('alarmTime').value = time; //set the time on the DOM
  setTime(); //run the main function to generate and show sleep time
}

function loadPreferences()
{
  appVersion = settings.get('Version','v1.5.0');
  if (settings.get('militaryTime','false') === "true") //mySettings[0] is where the military time setting is stored
  {
    militaryTime = true; //set prefrence to military time
  }
  else
  {
    militaryTime = false; //set preference to standard time
  }
  if (militaryTime)  //if militaryTime preference
  {
    document.getElementById('timeType').checked = true; //set radio button
    document.getElementById('timeType2').checked = false; //dont set this button
  }
  else //if standard time preference
  {
    document.getElementById('timeType').checked = false; //dont set this button
    document.getElementById('timeType2').checked = true; //set radio button
  }
  if (settings.get('closeOnX','true') === "true") //mySettings[2] is where the closeOnX setting is stored
  {
    document.getElementById('closeOnXcheck').checked = true; //set checkbox
  }
  else
  {
    document.getElementById('closeOnXcheck').checked = false; //set check box
  }
  document.getElementById('defaultTime').value = settings.get('defaultTime','08:30'); //set time to preference time
}



function setPreferences()
{
  settings.set('militaryTime',(document.getElementById('timeType').checked).toString());
  settings.set('defaultTime',document.getElementById('defaultTime').value);
  settings.set('closeOnX',(document.getElementById('closeOnXcheck').checked).toString());
  var tempstring = settings.get('closeOnX') + " Sandman"
  writeFile(tempstring);
  console.log(settings.getAll());
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
    wakeUpDate = new Date(sleepTimes[5]);
    wakeUpDate.setHours(wakeUpDate.getHours() + 1);
    resetTime = new Date(wakeUpDate);
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
        meridians[i] = ampm(sleepTimes[i].getHours()); //set up the array of meridians
    }
    document.getElementById('lblcheck0').innerHTML = hours[0] + ":" + mins[0] + meridians[0]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck1').innerHTML = hours[1] + ":" + mins[1] + meridians[1]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck2').innerHTML = hours[2] + ":" + mins[2] + meridians[2]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck3').innerHTML = hours[3] + ":" + mins[3] + meridians[3]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck4').innerHTML = hours[4] + ":" + mins[4] + meridians[4]; //add optimal sleep times to the HTML
    document.getElementById('lblcheck5').innerHTML = hours[5] + ":" + mins[5] + meridians[5]; //add optimal sleep times to the HTML
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
    try {
      jobs[6].cancel();
      upTimeJob.cancel();
    } catch (e) {

    }
    jobs[6] = schedule.scheduleJob(resetTime, setTime);

    upTimeJob = schedule.scheduleJob('0 0 * * * *', function(){
    upTimeJobs();
  });
}

function showNotification() {
  if (!restNotification)
  {
    restNotification = true;
    try {
        audio.play() //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify('Sandman', { //Notification
        message: 'Time to rest',
        icon: iconPath,
        buttons: ['Dismiss', 'Shutdown'],
        vetical: true,
        duration: 99999999999999, //max number this would take
    })

    notification.on('clicked', () => { //how to behave when notification is clicked
        notification.close();
        restNotification = false;
    })

    notification.on('swipedRight', () => { //how to behave when notification is swipedRight
        notification.close();
        restNotification = false;
    })

    notification.on('buttonClicked', (text, buttonIndex, options) => { //how to behave if one of the buttons was pressed
        if (text === 'Dismiss') {
            notification.close(); //close the notification
            restNotification = false;
        } else if ("Shutdown Computer") {
            confirmShutdownNotification(); //check to confirm computer shutdown
            notification.close()
            restNotification = false;
        }

    })
  }
}

function getLatestReleaseInfo() {
  if(!seenRelease) //if they havent seen the notification before
  {
   $.getJSON("https://api.github.com/repos/alexanderepstein/Sandman/tags").done(function (json) { //grab the latest release information
        var release = json[0].name; //get the newest app version
        latestRelease = release;
        release = release.split("");
        var myversion = settings.get('Version','v1.5.0').split("");

        if (release[1] > myversion[1]) //check if it matches current app version
        {
          showLatestUpdateNotification("Major Update"); //show the notification
        }
        else if (release[1]==myversion[1] && release[3] > myversion[3])
        {
          showLatestUpdateNotification("Minor Update"); //show the notification
          console.log(release[3] + " " + myversion[3]);
        }
        else if (release[1]==myversion[1] && release[3] == myversion[3] && release[5] > myversion[5])
        {
          showLatestUpdateNotification("Bugfixes"); //show the notification
            console.log(release[5] + " " + myversion[5]);
        }
        else {
          console.log("Running the latest release of Sandman"); //log it
        }
   });
 }
 seenRelease = true; //we checked or they saw the notification already
}

function showUpTimeNotification() {
  if (!upTimeNotification)
  {

  upTimeNotification = true;
    try {
        audio.play(); //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify('Sandman', { //Notification
        message: 'Your computer needs a break',
        icon: iconPath,
        buttons: ['Dismiss', 'Restart'],
        vetical: true,
        duration: 99999999999999,
    })

    notification.on('clicked', () => { //how to behave when notification is clicked
        upTimeNotification = false;
        notification.close();
    })

    notification.on('swipedRight', () => { //how to behave when notification is swipedRight
        upTimeNotification = false;
        notification.close();
    })

    notification.on('buttonClicked', (text, buttonIndex, options) => { //how to behave if one of the buttons was pressed
        if (text === 'Dismiss') {
          upTimeNotification = false;
            notification.close(); //close the notification
        } else if ("Restart") {
          confirmRestartNotification();
          notification.close();
          upTimeNotification = false;

        }

    })
  }
}
function confirmShutdownNotification() {
    try {
        audio.play(); //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify('Sandman', { //Notification
        message: 'Confirm Shutdown',
        icon: iconPath,
        buttons: ['Cancel', 'Confirm'],
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
        if (text === 'Cancel') {
            notification.close(); //close the notification
        } else if ("Confirm") {
            shutdown(); //shutdown the computer
        }

    })
}

function confirmRestartNotification() {
    try {
        audio.play(); //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify('Sandman', { //Notification
        message: 'Confirm Restart',
        icon: iconPath,
        buttons: ['Cancel', 'Confirm'],
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
        if (text === 'Cancel') {
            notification.close(); //close the notification
        } else if ("Confirm") {
            restart(); //shutdown the computer
        }

    })
}

function showLatestUpdateNotification(updateType) {
    try {
        audio.play(); //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify('Sandman', { //Notification
        message:  updateType + ' Available',
        icon: iconPath,
        buttons: ['Dismiss', 'Update Page'],
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
        } else if ("Update Page") {
            shell.openExternal('https://github.com/alexanderepstein/Sandman/releases/tag/' + latestRelease);
        }

    })
}

function militaryToStandard(hours) {
    /* make sure add radix*/
    var hours = ((hours + 11) % 12) + 1; //determine standard version of military time
    return hours; //return the hours in this new formatting
}


function ampm(hours24)
{
  hours24 = parseInt(hours24,10); //grab hours in military time version
  if (hours24 > 11) //determine meridian
  {
    return "pm"; //return meridian string
  }
  else
  {
    return "am"; //return meridian string
  }
}
function shutdown(callback) {
    exec('shutdown now', function(error, stdout, stderr) {
        callback(stdout);
    }); //shutsdown the computer
}

function restart(callback) {
    exec('shutdown now -r', function(error, stdout, stderr) {
        callback(stdout);
    }); //restarts the computer
}

function upTimeJobs()
{
  var uptime = os.uptime(); // uptime of computer in seconds
  uptime = (uptime/60)/60 //turn it into hours
  if (uptime >= 12) //if computer has been on longer then 12 hours reccomend a restart
  {
    showUpTimeNotification(); //show the notification
  }
}
