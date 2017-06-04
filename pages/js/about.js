const {shell} = require("electron"); // allows the ability to open a webpage in users default browser

function donate()
{
  shell.openExternal("https://cash.me/$AlexEpstein");
}

function personalPage()
{
  shell.openExternal("https://alexanderepstein.github.io");
}
