<div align="center">

 # ![Insomnia](https://github.com/alexanderepstein/Insomnia/blob/master/sleep_github.png) Insomnia ![Insomnia](https://github.com/alexanderepstein/Insomnia/blob/master/sleep_github.png)

 ![Counting Sheep](https://github.com/alexanderepstein/Insomnia/blob/master/giphy.gif)

 Insomnia will remind you to take a rest and that you can always come back to the work tomorrow.
 Inspired by http://sleepyti.me a website that calculates optimal times to fall asleep based on when you want to wake up.
 The idea is that when you wake up in the middle of a sleep cycle you will feel groggy, however if you wakeup during the
 transition between sleep cycles you will feel refreshed!
</div>

This application uses the averages that sleep cycles are 90 minutes each and a person takes 15 minutes to fall asleep from when they begin to try and calculates the times for you to sleep. It will notify you throughout the night when the optimal times to shutdown your computer and start to head to sleep and provide a button to do just that. This application works well with https://justgetflux.com/ 

## Screenshots

#### MenuBar
![Tray](https://github.com/alexanderepstein/Insomnia/blob/master/screenshots/Insomnia%20Tray.png?raw=true)

#### Notification
![Notification](https://github.com/alexanderepstein/Insomnia/blob/master/screenshots/Insomnia%20Notification.png?raw=true)

#### Main Window
![Main](https://cldup.com/28F4UE0y4v.png)

#### About Window
![About](https://cldup.com/dgwNWiW6-Z.png)

#### Preferences Window
![Prefs](https://cldup.com/O87Kye4s-V.png)


# Downloads
To get the full sourced version run in terminal:
```bash
git clone https://github.com/alexanderepstein/Insomnia
```

Otherwise to just get the application download your respective platforms file from the list of download links below:
* [Debian Linux 32 Bit](https://goo.gl/bqXCmt)
* [Debian Linux 64 Bit](https://goo.gl/FbHvLh)
* [Mac OS 64 Bit](https://goo.gl/jMa9a5)
* [Windows 32 Bit](https://goo.gl/bB61tc)
* [Windows 64 Bit](https://goo.gl/NuzRQ0)

## Install

### Mac
Open up a new finder window and go to the Applications folder. Then drag the Insomnia.app from the Insomnia dmg to the Applications folder. Double Clicking on the app should run it and it could be kept in the dock from here.

### Linux
Open up a terminal and navigate to the folder containing the downloaded installer files and run
```bash
sudo dpkg -i Insomnia_1.1.0_amd64.deb
```
Or:
```bash
sudo dpkg -i Insomnia_1.1.0_x86.deb
```
 
 This will actually install Insomnia as a utility application which can be accessed from your respective distributions application launchpad.

### Windows
Open up another windows explorer and navigate to your program files folder (x86 or 64 bit is irrelevant). Now drag the entire Insomnia Windows folder you extracted  from the downloaded zip in the previous step over to the program files folder. Go into the folder that was just dragged over and find the Insomnia.exe and run it. Now the application will show up in the dock where it can be pinned.

## Uninstall

### Mac
Go to the applications folder and delete the Insomnia application.

### Linux
Open up a terminal and run:
```bash
sudo dpkg --remove Insomnia
```

### Windows
Open up the program files folder and delete the Insomnia folder.

## Helping Out
It is assumed you already have node installed and therefore npm.

To download the full source code and install the devDependencies run the following lines:
```bash
git clone https://github.com/alexanderepstein/Insomnia
cd Insomnia
npm install
cd ..
electron Insomnia # this will run the application
```   

If you get some error and the application wont run try running the following lines and see if that works.

### Linux/Mac
```bash
cd Insomnia
sudo npm install -g
```

The app styling was made with [Sass](http://sass-lang.com/) `v3.3.14` and [Ruby](https://www.ruby-lang.org/) `v2.3.1p112`.

To compile the stylesheet you'll only need to run the following command:
```bash
sass --watch scss:css --style compressed
```

### Windows
Right click on the start menu icon at the bottom left and click on the option to open a command prompt in developer mode
cd to the insomnia directory then run
```bash
npm install -g
```

If you have a feature you would like to add or optimizations to the original code
* Feel free to fork this repository and submit a pull request
* Add an issue labeled as an enhancement and if I think its a good idea I will do my best to implement it myself

## License

MIT License

Copyright (c) 2017 Alex Epstein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
