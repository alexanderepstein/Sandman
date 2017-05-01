# <h1 align="center"> <img src="https://github.com/alexanderepstein/Insomnia/blob/master/sleep_github.png" alt="Insomnia Logo" style="width:50px;height:50px;"> <label style="text-align:center"> Insomnia </label> <img src="https://github.com/alexanderepstein/Insomnia/blob/master/sleep_github.png" alt="Insomnia Logo" style="width:50px;height:50px;"> </h1>

<p align="center"><img  src="https://github.com/alexanderepstein/Insomnia/blob/master/giphy.gif" alt="Counting Sheep"></p>

<p align="center">
Insomnia will remind you to take a rest and that you can always come back to the work tomorrow.
Inspired by http://sleepyti.me a website that calculates optimal times to fall asleep based on when you want to wake up.
The idea is that when you wake up in the middle of a sleep cycle you will feel groggy, however if you wakeup during the
transition between sleep cycles you will feel refreshed!

This application uses the averages that sleep cycles are 90 minutes each and a person takes 15 minutes to fall asleep from when they begin to try and calculates the times for you to sleep. It will notify you throughout the night when the optimal times to shutdown your computer and start to head to sleep and provide a button to do just that. This application works well with https://justgetflux.com/  
</p>

# <p align="center" > Screenshots </p>

<h4 style="color:white;text-align:center">MenuBar</h4>
<div  align="center">
 <img  src="https://github.com/alexanderepstein/Insomnia/blob/master/screenshots/Insomnia%20Tray.png?raw=true" alt="Tray">
</div>

<h4 style="color:white;text-align:center">Notification</h4>
<div align="center">
 <img  src="https://github.com/alexanderepstein/Insomnia/blob/master/screenshots/Insomnia%20Notification.png?raw=true" alt="Notification">

<h4 style="color:white;text-align:center">Main Window</h4>
 <img  src="https://github.com/alexanderepstein/Insomnia/blob/master/screenshots/Insomnia%20Main.png?raw=true" alt="Main">

<h4 style="color:white;text-align:center">About Window</h4>
 <img  src="https://github.com/alexanderepstein/Insomnia/blob/master/screenshots/Insomnia%20About.png?raw=true" alt="About">

<h4 style="color:white;text-align:center">Preferences Window </h4>
<img  src="https://github.com/alexanderepstein/Insomnia/blob/master/screenshots/Preferences.png?raw=true" alt="Prefs">


# <p align="center" > Downloads </p>
To get the full sourced version run

      git clone https://github.com/alexanderepstein/Insomnia

Otherwise to just get the application download your respective platforms file from the list of download links below.

* <a href="https://goo.gl/bqXCmt">Debian Linux 32 Bit</a>

* <a href="https://goo.gl/FbHvLh">Debian Linux 64 Bit</a>

* <a href="https://goo.gl/jMa9a5">Mac OS 64 Bit</a>

* <a href="https://goo.gl/bB61tc">Windows 32 Bit</a>

* <a href="https://goo.gl/NuzRQ0">Windows 64 Bit</a>

# <p align="center" > Install </p>

* Mac: Open up a new finder window and go to the Applications folder. Then drag the Insomnia.app from the Insomnia dmg to the Applications folder. Double Clicking on the app should run it and it could be kept in the dock from here.

* Linux: Open up a terminal and navigate to the folder containing the downloaded installer files and run

           sudo dpkg -i Insomnia_1.1.0_amd64.deb
           or
           sudo dpkg -i Insomnia_1.1.0_x86.deb
  this will actually install Insomnia as a utility application which can be accessed from your respective distributions application launchpad.

* Windows: Open up another windows explorer and navigate to your program files folder (x86 or 64 bit is irrelevant).  Now drag the entire Insomnia Windows folder you extracted  from the downloaded zip in the previous step over to the program files folder. Go into the folder that was just dragged over and find the Insomnia.exe and run it. Now the application will show up in the dock where it can be pinned.

# <p align="center" > Uninstall </p>

* Mac: Go to the applications folder and delete the Insomnia application.

* Linux: Open up a terminal and run

      sudo dpkg --remove Insomnia

* Windows: Open up the program files folder and delete the Insomnia folder.


# <p align="center" > License</p>

MIT License

Copyright (c) 2017 Alex Epstein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# <p align="center" > Helping Out </p>
<p align="center" >
(It is assumed you already have node installed and therefore npm)<br>
To download the full source code and install the devDependencies run the following lines

</p>

    git clone https://github.com/alexanderepstein/Insomnia
    cd Insomnia
    npm install
    cd ..
    electron Insomnia //this will run the application
<p align="center" >
If you get some error and the application wont run try running the following lines and see if that works

</p>

<h3 align="center"> Linux/Mac </h3>

    cd Insomnia
    sudo npm install -g


<h3 align="center"> Windows </h3>


<p align="center">
Right click on the start menu icon at the bottom left and click on the option to open a command prompt in developer mode
cd to the insomnia directory then run </p>


     npm install -g

<h4 align="center" > If you have a feature you would like to add or optimizations to the original code</h4>
   * Feel free to fork this repository and submit a pull request
   * Add an issue labeled as an enhancement and if I think its a good idea I will do my best to implement it myself
