const notifier = require("electron-notifications"); //allow for notifications
const path = require("path"); //allow for use of path
const os = require("os");
const exec = require("child_process").exec; //allows the shutdown of the host machine
const schedule = require("node-schedule"); //allows for jobs scheduled at certain times
const {shell} = require("electron"); // allows the ability to open a webpage in users default browser
const settings = require("electron-settings");
const fs = require("fs");
const iconPath = path.join(__dirname, "../assets/","sleep.png"); //grabs the icon for notifications
const audio = new Audio(path.join(__dirname, "../assets/","alert.mp3")); //set up notification sound
const filePath = path.join(__dirname, "../assets/","settings.txt");

var i = null;
var restNotification = false;
var upTimeNotification = false;
var seenRelease = false; //checks if user has already seen update exists and ignored
var jobs = []; //array of node schedule jobs to be ran
var latestRelease = null;
var upTimeJob = null;
var resetTime = null;


function militaryToStandard(hours) {
  /* make sure add radix*/
  var hours = ((hours + 11) % 12) + 1; //determine standard version of military time
  return hours; //return the hours in this new formatting
}


function ampm(hours24) {
  hours24 = parseInt(hours24, 10); //grab hours in military time version
  if (hours24 > 11) //determine meridian
  {
    return "pm"; //return meridian string
  } else {
    return "am"; //return meridian string
  }
}

function nodeJobs(sleepTimes) {
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

  upTimeJob = schedule.scheduleJob("0 0 * * * *", function() {
    upTimeJobs();
  });
  return;
}


function setSleepTimes(sleepTimes) //just setting the sleep times the user sees (special formatting exists here)
{
  var hours = []; //array to hold the hours for formatting
  var mins = []; //array to hold the mins for formatting
  var meridians = []; //array to hold the merdians to respective sleepTimes if militaryTime is false

  if (settings.get("militaryTime", "false") === "true") {
    for (i = 0; i < 6; i++) {
      if (sleepTimes[i].getHours() < 10) { //if hours is less than 10
        hours[i] = "0" + sleepTimes[i].getHours(); //put a zero in front of the string
      } else {
        hours[i] = sleepTimes[i].getHours(); //else just the hours
      }
      if (sleepTimes[i].getMinutes() < 10) { //if minutes is less than 10
        mins[i] = "0" + sleepTimes[i].getMinutes(); //put a zero in front of the string
      } else {
        mins[i] = sleepTimes[i].getMinutes(); //else just the minutes
      }
    }
    document.getElementById("lblcheck0").innerHTML = hours[0] + ":" + mins[0]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck1").innerHTML = hours[1] + ":" + mins[1]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck2").innerHTML = hours[2] + ":" + mins[2]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck3").innerHTML = hours[3] + ":" + mins[3]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck4").innerHTML = hours[4] + ":" + mins[4]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck5").innerHTML = hours[5] + ":" + mins[5]; //add optimal sleep times to the HTML
  } else {
    for (i = 0; i < 6; i++) {
      if (militaryToStandard(sleepTimes[i].getHours()) < 10) { //if hours is less than 10
        hours[i] = "0" + militaryToStandard(sleepTimes[i].getHours()); //put a zero in front of the string
      } else {
        hours[i] = militaryToStandard(sleepTimes[i].getHours()); //else just the hours
      }
      if (sleepTimes[i].getMinutes() < 10) { //if minutes is less than 10
        mins[i] = "0" + sleepTimes[i].getMinutes(); //put a zero in front of the string
      } else {
        mins[i] = sleepTimes[i].getMinutes(); //else just the minutes
      }
      meridians[i] = ampm(sleepTimes[i].getHours()); //set up the array of meridians
    }
    document.getElementById("lblcheck0").innerHTML = hours[0] + ":" + mins[0] + meridians[0]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck1").innerHTML = hours[1] + ":" + mins[1] + meridians[1]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck2").innerHTML = hours[2] + ":" + mins[2] + meridians[2]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck3").innerHTML = hours[3] + ":" + mins[3] + meridians[3]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck4").innerHTML = hours[4] + ":" + mins[4] + meridians[4]; //add optimal sleep times to the HTML
    document.getElementById("lblcheck5").innerHTML = hours[5] + ":" + mins[5] + meridians[5]; //add optimal sleep times to the HTML
  }
  return sleepTimes;
}


function generateSleepTimes() {
  var time = document.getElementById("alarmTime").value;
  var splitTime = time.split(":"); //split time into hours and minutes
  var wakeUpDate = new Date(); //set a new date object
  var sleepTimes = [];
  if (splitTime[0] < wakeUpDate.getHours() || (splitTime[0] === wakeUpDate.getHours() && splitTime[1] < wakeUpDate.getMinutes())) //if condition met
  {
    wakeUpDate.setDate(wakeUpDate.getDate() + 1); //the alarm is for the next day
  }
  wakeUpDate.setHours(splitTime[0] - settings.get("lagHours")); //set hours of wakeup date to wakeup time hours
  wakeUpDate.setMinutes(splitTime[1] - settings.get("lagMinutes")); //initially subtract 15 mins from wakeuptime to account for falling asleep
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
  return sleepTimes;
}


function setTime() { //called when set wakeup time button is pressed
  settings.set("Version", "v1.8.0");
  sleepTimes = generateSleepTimes(); //determine sleepTimes based off of wakeuptime
  sleepTimes = setSleepTimes(sleepTimes); //determine the sleepTimes in formatted form to be shown to user
  document.getElementById("sleepTimes").innerHTML = "Optimal sleeping times"; //change blank text
  nodeJobs(sleepTimes); //set up node-schedule jobs
  document.getElementById("lblTime").innerHTML = "Notifications set."; //change blank text
  //console.log(sleepTimes); //use this line to determine issue of timing
  return;
}

function writeFile(settingsData) {
  fs.writeFile(filePath, settingsData, (err) => { //write the settings file that will contain the settingsData parameter
    if (err) {
      throw err;
    }
  });
  try //for error catching
  {
    fs.chmodSync(filePath, "777"); //set up permissions (seems to fix issue of linux reading settings after install)
  } catch (e) {
    throw e; //log this error to the console (basically occurs everytime after the first run)
  }
  return;
}

function readPreferences() {
  document.getElementById("alarmTime").value = settings.get("defaultTime", "08:30");; //set the time on the DOM
  setTime(); //run the main function to generate and show sleep time
  return;
}

function loadPreferences() {
  if (settings.get("militaryTime", "false") === "true") //if militaryTime preference
  {
    document.getElementById("timeType").checked = true; //set radio button
    document.getElementById("timeType2").checked = false; //dont set this button
  } else //if standard time preference
  {
    document.getElementById("timeType").checked = false; //dont set this button
    document.getElementById("timeType2").checked = true; //set radio button
  }
  if (settings.get("closeOnX", "true") === "true") //mySettings[2] is where the closeOnX setting is stored
  {
    document.getElementById("closeOnXcheck").checked = true; //set checkbox
  } else {
    document.getElementById("closeOnXcheck").checked = false; //set check box
  }
  document.getElementById("defaultTime").value = settings.get("defaultTime", "08:30"); //set time to preference time
  document.getElementById("lagHours").value = settings.get("lagHours", "0");
  document.getElementById("lagMinutes").value = settings.get("lagMinutes", "15");
  document.getElementById("upTimeHours").value = settings.get("upTimeHours", "12");
  document.getElementById("upTimeMinutes").value = settings.get("upTimeMinutes", "0");
  return;
}



function setPreferences() {
  settings.set("militaryTime", (document.getElementById("timeType").checked).toString());
  settings.set("defaultTime", document.getElementById("defaultTime").value);
  settings.set("closeOnX", (document.getElementById("closeOnXcheck").checked).toString());
  settings.set("lagHours", document.getElementById("lagHours").value);
  settings.set("lagMinutes", document.getElementById("lagMinutes").value);
  settings.set("upTimeHours", document.getElementById("upTimeHours").value);
  settings.set("upTimeMinutes", document.getElementById("upTimeMinutes").value);
  var tempstring = settings.get("closeOnX") + " Sandman";
  writeFile(tempstring);
  return;
  //console.log(settings.getAll());
}






function showNotification() {
  if (!restNotification) {
    restNotification = true;
    try {
      audio.play(); //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify("Sandman", { //Notification
      message: "Time to rest",
      icon: iconPath,
      buttons: ["Dismiss", "Shutdown"],
      vetical: true,
      duration: 99999999999999, //max number this would take
    });

    notification.on("clicked", () => { //how to behave when notification is clicked
      notification.close();
      restNotification = false;
    });

    notification.on("swipedRight", () => { //how to behave when notification is swipedRight
      notification.close();
      restNotification = false;
    });

    notification.on("buttonClicked", (text, buttonIndex, options) => { //how to behave if one of the buttons was pressed
      if (text === "Dismiss") {
        notification.close(); //close the notification
        restNotification = false;
      } else if ("Shutdown Computer") {
        confirmShutdownNotification(); //check to confirm computer shutdown
        notification.close();
        restNotification = false;
      }

    });
  }
  return;
}

function getLatestReleaseInfo() {
  if (!seenRelease) //if they havent seen the notification before
  {
    $.getJSON("https://api.github.com/repos/alexanderepstein/Sandman/tags").done(function(json) { //grab the latest release information
      var release = json[0].name; //get the newest app version
      latestRelease = release;
      release = release.split("");
      var myversion = settings.get("Version", "v1.8.0").split("");

      if (release[1] > myversion[1]) //check if it matches current app version
      {
        showLatestUpdateNotification("Major Update"); //show the notification
      } else if (release[1] === myversion[1] && release[3] > myversion[3]) {
        showLatestUpdateNotification("Minor Update"); //show the notification
        //console.log(release[3] + " " + myversion[3]);
      } else if (release[1] === myversion[1] && release[3] === myversion[3] && release[5] > myversion[5]) {
        showLatestUpdateNotification("Bugfixes"); //show the notification
        //console.log(release[5] + " " + myversion[5]);
      } else {
        //console.log("Running the latest release of Sandman"); //log it
      }
    });
  }
  seenRelease = true; //we checked or they saw the notification already
  return;
}

function showUpTimeNotification() {
  if (!upTimeNotification) {

    upTimeNotification = true;
    try {
      audio.play(); //play notifiation sound
    } catch (e) {

    }
    const notification = notifier.notify("Sandman", { //Notification
      message: "Your computer needs a break",
      icon: iconPath,
      buttons: ["Dismiss", "Restart"],
      vetical: true,
      duration: 99999999999999,
    });

    notification.on("clicked", () => { //how to behave when notification is clicked
      upTimeNotification = false;
      notification.close();
    });

    notification.on("swipedRight", () => { //how to behave when notification is swipedRight
      upTimeNotification = false;
      notification.close();
    });

    notification.on("buttonClicked", (text, buttonIndex, options) => { //how to behave if one of the buttons was pressed
      if (text === "Dismiss") {
        upTimeNotification = false;
        notification.close(); //close the notification
      } else if ("Restart") {
        confirmRestartNotification();
        notification.close();
        upTimeNotification = false;

      }

    });
  }
  return;
}

function confirmShutdownNotification() {
  try {
    audio.play(); //play notifiation sound
  } catch (e) {

  }
  const notification = notifier.notify("Sandman", { //Notification
    message: "Confirm Shutdown",
    icon: iconPath,
    buttons: ["Cancel", "Confirm"],
    vetical: true,
    duration: 20000,
  });

  notification.on("clicked", () => { //how to behave when notification is clicked
    notification.close();
  });

  notification.on("swipedRight", () => { //how to behave when notification is swipedRight
    notification.close();
  });

  notification.on("buttonClicked", (text, buttonIndex, options) => { //how to behave if one of the buttons was pressed
    if (text === "Cancel") {
      notification.close(); //close the notification
    } else if ("Confirm") {
      shutdown(); //shutdown the computer
    }

  });
  return;
}

function confirmRestartNotification() {
  try {
    audio.play(); //play notifiation sound
  } catch (e) {

  }
  const notification = notifier.notify("Sandman", { //Notification
    message: "Confirm Restart",
    icon: iconPath,
    buttons: ["Cancel", "Confirm"],
    vetical: true,
    duration: 20000,
  });

  notification.on("clicked", () => { //how to behave when notification is clicked
    notification.close();
  });

  notification.on("swipedRight", () => { //how to behave when notification is swipedRight
    notification.close();
  });

  notification.on("buttonClicked", (text, buttonIndex, options) => { //how to behave if one of the buttons was pressed
    if (text === "Cancel") {
      notification.close(); //close the notification
    } else if ("Confirm") {
      restart(); //shutdown the computer
    }

  });
  return;
}

function showLatestUpdateNotification(updateType) {
  try {
    audio.play(); //play notifiation sound
  } catch (e) {

  }
  const notification = notifier.notify("Sandman", { //Notification
    message: updateType + " Available",
    icon: iconPath,
    buttons: ["Dismiss", "Update Page"],
    vetical: true,
    duration: 20000,
  });

  notification.on("clicked", () => { //how to behave when notification is clicked
    notification.close();
  });

  notification.on("swipedRight", () => { //how to behave when notification is swipedRight
    notification.close();
  });

  notification.on("buttonClicked", (text, buttonIndex, options) => { //how to behave if one of the buttons was pressed
    if (text === "Dismiss") {
      notification.close(); //close the notification
    } else if ("Update Page") {
      shell.openExternal("https://github.com/alexanderepstein/Sandman/releases/tag/" + latestRelease);
    }

  });
  return;
}


function shutdown(callback) {
  exec("shutdown now", function(error, stdout, stderr) {
    callback(stdout);
  }); //shutsdown the computer
  return;
}

function restart(callback) {
  exec("shutdown now -r", function(error, stdout, stderr) {
    callback(stdout);
  }); //restarts the computer
  return;
}

function upTimeJobs() {
  var uptime = os.uptime(); // uptime of computer in seconds
  uptime = (uptime / 60) / 60; //turn it into hours
  var mins = parseFloat(settings.get("upTimeMinutes"));
  mins = mins / 60;
  var hours = parseFloat(settings.get("upTimeHours"));
  var time = hours + mins;
  if (uptime >= time) //if computer has been on longer then 12 hours reccomend a restart
  {
    showUpTimeNotification(); //show the notification
  }
  return;
}
