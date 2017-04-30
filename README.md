# <img src="https://github.com/alexanderepstein/Insomnia/blob/master/sleep_github.png" alt="Insomnia Logo" style="width:50px;height:50px;">  Insomnia 

Insomnia will remind you to take a rest and that you can always come back to the work tomorrow.
Inspired by http://sleepyti.me a website that calculates optimal times to fall asleep based on when you want to wake up.
The idea is that when you wake up in the middle of a sleep cycle you will feel groggy, however if you wakeup during the
transition between sleep cycles you will feel refreshed!

This application uses the averages that sleep cycles are 90 minutes each and a person takes 15 minutes to fall asleep from when they begin to try and calculates the times for you to sleep. It will notify you throughout the night when the optimal times to shutdown your computer and start to head to sleep and provide a button to do just that. This application works well with https://justgetflux.com/  


# Downloads
To get the full sourced version run

      git clone https://github.com/alexanderepstein/Insomnia

Otherwise to just get the application download your respective platforms file from the list of download links below.

* Debian Linux 32 Bit: https://goo.gl/G1BxOH

* Debian Linux 64 Bit: https://goo.gl/lXEb42

* Mac OS 64 Bit: https://goo.gl/jMa9a5

* Windows 32 Bit: https://goo.gl/bB61tc

* Windows 64 Bit: https://goo.gl/NuzRQ0

# Install

* Mac: Open up a new finder window and go to the Applications folder. Then drag the Insomnia.app from the Insomnia dmg to the Applications folder. Double Clicking on the app should run it and it could be kept in the dock from here.

* Linux: Open up a terminal and navigate to the folder containing the downloaded installer files and run

           sudo dpkg -i Insomnia_1.1.0_amd64.deb
           or
           sudo dpkg -i Insomnia_1.1.0_x86.deb
  this will actually install Insomnia as a utility application which can be accessed from your respective distributions application launchpad.

* Windows: Open up another windows explorer and navigate to your program files folder (x86 or 64 bit is irrelevant).  Now drag the entire Insomnia Windows folder you extracted  from the downloaded zip in the previous step over to the program files folder. Go into the folder that was just dragged over and find the Insomnia.exe and run it. Now the application will show up in the dock where it can be pinned.

# Uninstall

* Mac: Go to the applications folder and delete the Insomnia application.

* Linux: Open up a terminal and run

      sudo dpkg --remove Insomnia

* Windows: Open up the program files folder and delete the Insomnia folder.
