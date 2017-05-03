<div align="center">

 # ![Insomnia](https://github.com/alexanderepstein/Insomnia/blob/master/sleep_github.png) Insomnia ![Insomnia](https://github.com/alexanderepstein/Insomnia/blob/master/sleep_github.png)

 ####  an application built with late night developers in mind


 ![Counting Sheep](https://github.com/alexanderepstein/Insomnia/blob/master/giphy.gif)

 Insomnia will remind you to take a rest and that you can always come back to the work tomorrow.

A sleep cycle is a 90-minute chunk of time where your body transitions through various phases of sleep — all the way down to deep REM sleep — then back again. Some health experts believe that these 90-minute sleep cycles are the key to restful sleep. They recommend trying to sleep exactly 7.5 hours — or even 9 hours, if you have the time.


Based on your wakeup time and the sleep algorithm Insomnia calculates the best times for you to sleep. It will notify you throughout the night when the optimal times to shutdown your computer and start to head to sleep and provide a button to do just that.

This application works well with https://justgetflux.com/
Inspired by http://sleepyti.me

</div>

## In Action

![Usage](https://github.com/alexanderepstein/Insomnia/blob/master/screenshots/Usage.gif)


## Downloads
To get the full sourced version run in terminal:
```bash
git clone https://github.com/alexanderepstein/Insomnia
```

Otherwise to just get the application click the link before to head to the latest release page and download your respective platform.
##### [Version 1.2.0 Release](https://github.com/alexanderepstein/Insomnia/releases/tag/v1.2.0)


## Install

### Mac
Open up a new finder window and go to the Applications folder. Then drag the Insomnia.app from the Insomnia dmg to the Applications folder. Double Clicking on the app should run it and it could be kept in the dock from here.

### Linux
Open up a terminal and navigate to the folder containing the downloaded installer files and run
#### Debian
```bash
sudo dpkg -i Insomnia_1.2.0_amd64.deb
```
Or:
```bash
sudo dpkg -i Insomnia_1.2.0_x86.deb
```
#### RedHat
```bash
sudo rpm -i Insomnia.rpm
```
 This will actually install Insomnia as a utility application which can be accessed from your respective distributions application launchpad.

### Windows
Open up another windows explorer and navigate to your program files folder (x86 or 64 bit is irrelevant). Now drag the entire Insomnia Windows folder you extracted  from the downloaded zip in the previous step over to the program files folder. Go into the folder that was just dragged over and find the Insomnia.exe and run it. Now the application will show up in the dock where it can be pinned.

## Uninstall

### Mac
Go to the applications folder and delete the Insomnia application.

### Linux
Open up a terminal and run:
#### Debian

```bash
sudo dpkg --remove Insomnia
```
#### RedHat

```bash
sudo rpm -e Insomnia.rpm
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
### CSS Compilation

The app styling was made with: [Sass](http://sass-lang.com/) `v3.3.14`  [Ruby](https://www.ruby-lang.org/) `v2.3.1p112`.

 To compile the stylesheet you'll only need to run the following command:
 ```bash
 sass --watch scss:css --style compressed
 ```


### To Package Electron Application To Binary
First run

### Linux/Mac
```bash
sudo npm install -g electron-packager
```
### Windows
Right click on the start menu icon at the bottom left and click on the option to open a command prompt in developer mode
then run
```bash
npm install -g electron-packager
```
Then once electron packager is installed to package your electron application open up a terminal and cd into the Insomnia folder then run

### Linux
For 64 Bit Binary:
```bash
electron-packager . Insomnia --platform linux --arch x64 --out dist/
```
For 32 Bit Binary
```bash
electron-packager . Insomnia --platform linux --arch ia32 --out dist/
```
### Mac
```bash
electron-packager . Insomnia --platform darwin --arch x64 --out dist/
```

### Windows
For 64 Bit Binary:
```bash
electron-packager . Insomnia --platform win32 --arch x64 --out dist/
```
For 32 Bit Binary
```bash
electron-packager . Insomnia --platform win32 --arch ia32 --out dist/
```



If you have a feature you would like to add or optimizations to the original code
* Feel free to fork this repository and submit a pull request
* Add an issue labeled as an enhancement and if I think its a good idea I will do my best to implement it myself

```bash
( •_•)
( •_•)>⌐■-■
(⌐■_■)
```

## License

MIT License

Copyright (c) 2017 Alex Epstein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
