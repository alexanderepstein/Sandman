# Insomnia <img src="https://github.com/alexanderepstein/Insomnia/blob/master/sleep.png" alt="Insomnia Logo" style="width:50;height:50;">

Insomnia will remind you to take a rest and that you can always come back to the work tomorrow.
Inspired by http://sleepyti.me a website that calculates optimal times to fall asleep based on when you want to wake up.
The idea is that when you wake up in the middle of a sleep cycle you will feel groggy, however if you wakeup during the
transition between sleep cycles you will feel refreshed!

This application uses the averages that sleep cycles are 90 minutes each and a person takes 15 minutes to fall asleep from when they begin to try and calculates the times for you to sleep. It will notify you throughout the night when the optimal times to shutdown your computer and start to head to sleep and provide a button to do just that. This application works well with https://justgetflux.com/  


# Install

* Inside of the dist folder I have created applications for Mac and Windows along with an installer for Debian Linux. For installing on any platform the first thing you will want to do is clone this repository.

      git clone https://github.com/alexanderepstein/Insomnia
* From here you want to navigate to where the repository was cloned, then open up the dist folder. Then find the folder that contains the version for your respective platform.  Depending on what platform you are on there are different steps to continue

    * Mac: Open up a new finder window and go to the Applications folder. Then drag the Insomnia.app to the Applications folder. Double Clicking on the app should run it and it could be kept in the dock from here.

    * Linux: Open up a terminal and navigate to the folder containing the Insomnia_1.0.0.deb (open up a terminal at the location of the previous step) and run
            sudo dpkg -i Insomnia_1.0.0.deb
    this will actually install Insomnia as a utility application which can be accessed from your respective distributions application launchpad.

    * Windows: Open up another windows explorer and navigate to your program files folder (x86 or 64 bit is irrelevant). In the previous explorer window go back to the dist folder. Now drag the entire Insomnia Windows 32 & 64 Bit folder over to the program files folder. Go into the folder that was just dragged over and find the Insomnia.exe and run it. Now the application will show up in the dock where it can be pinned.
