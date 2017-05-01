const notifier = require('electron-notifications'); //allow for notifications
const path = require('path'); //allow for use of path
const iconPath = path.join(__dirname, 'sleep.png'); //grabs the icon for notifications
const fs = require('fs');
const filePath = path.join(__dirname, 'settings.txt');
const os = require('os');
var time = null; //wakeuptime to be set by user
var exec = require('child_process').exec; //allows the shutdown of the host machine
var schedule = require('node-schedule'); //allows for jobs scheduled at certain times


var mins = []; //array to hold the mins for formatting
var hours = []; //array to hold the hours for formatting
var jobs = []; //array of node schedule jobs to be ran
var sleepTimes = []; //array of times to rest determined by algorithm
var audio = new Audio('alert.mp3'); //set up notification sound
var militaryTime = false;
var meridians = [];
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
  readFile(); //set up the mySettings variable by reading the settings file
  if (mySettings[0] === "true") //if militaryTime preference is set to true
  {
    militaryTime = true; //set the preference in the code
  }
  else //if standard time preference
  {
    militaryTime = false; //set the military time perference in the code to false
  }
  time = mySettings[1]; //set time variable
  document.getElementById('alarmTime').value = time; //set the time on the DOM
  setTime(); //run the main function to generate and show sleep time
}

function loadPreferences()
{
  readFile(); //read the settings text
  if (mySettings[0] === "true") //mySettings[0] is where the military time setting is stored
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
  if (mySettings[2] === "true") //mySettings[2] is where the closeOnX setting is stored
  {
    document.getElementById('closeOnXcheck').checked = true; //set checkbox
  }
  else
  {
    document.getElementById('closeOnXcheck').checked = false; //set check box
  }
  document.getElementById('defaultTime').value = mySettings[1]; //set time to preference time
}

function readFile()
{
  //console.log("Running readfile");
  mySettings = fs.readFileSync(filePath,'utf8'); //read in the settings file
  mySettings = (mySettings).split(" "); //split up the settings into an array (each index contains a different setting)
}

function setPreferences()
{
  var mytempstring = ""; //set up specially formatted string to write to settings
  mytempstring = document.getElementById('timeType').checked + " "; //get the military time preference and add to string
  tempTime = (document.getElementById('defaultTime').value).split(":"); //set up temp time array by grabbing time preference
  mytempstring = mytempstring + tempTime[0] + ":" + tempTime[1] + " "; //set the time preference
  mytempstring = mytempstring + document.getElementById('closeOnXcheck').checked + " " + "Insomniav1.1.0"; //add version to get rid of \n error when reading a setting
  writeFile(mytempstring); //write out the new settings file
  readFile(); //set up the mySettings variable for the new preferences
  if (mySettings[0] === "true") //check if military time
  {
    militaryTime = true; //set the preference
  }
  else
  {
    militaryTime = false; //set the preference
  }
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
        meridians[i] = ampm(sleepTimes[i].getHours());
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

    var j = schedule.scheduleJob('*/59 * * * *', function(){
    upTimeJobs();
  });
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



function showUpTimeNotification() {
    try {
        audio.play() //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify('Insomnia', { //Notification
        message: 'Your computer needs a break',
        icon: iconPath,
        buttons: ['Dismiss', 'Restart'],
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
        } else if ("Restart") {
            restart(); //shutdown the computer
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
  var uptime = os.uptime();
  uptime = (uptime/60)/60
  if (uptime >= 12)
  {
    showUpTimeNotification();
  }
}
