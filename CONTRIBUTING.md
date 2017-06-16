# Contributing

### First off, thank you for considering contributing to Sandman. 

#### 1. Where do I go from here?

If you've noticed a bug or have a question, search the <a href="https://github.com/alexanderepstein/Sandman/issues">issue tracker</a> to see if someone else in the community has already created a ticket. If not, go ahead and <a href="https://github.com/alexanderepstein/Sandman/issues/new">make one</a>!


#### 2. Fork & Clone The Repository
It is assumed you already have <a href="https://nodejs.org/en/">node</a> installed and therefore npm. 

To download the full source code and install the Dependencies run the following lines:
```bash
git clone https://github.com/alexanderepstein/Sandman
cd Sandman
npm install
cd ..
npm start dev # this will run the application with all of the devtools open
```   

If you get some error and the application wont run try running the following lines and see if that works.

##### Linux/Mac
```bash
cd Sandman
sudo npm install -g
```

##### Windows
Right click on the start menu icon at the bottom left and click on the option to open a command prompt in developer mode
cd to the Sandman directory then run
```bash
npm install -g
```

#### 3. Implement your fix or feature

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first :smile_cat:

#### 4. Check The Application Runtime 

Make sure that when you run ```npm start dev``` nothing is clearly wrong with the application. 

#### 5. Check The Compilation Of The Application (Optional)

If you cd into the build folder and run the file labeled with your OS you should be able to build a compiled version of the application. 
If you are on windows it will build a folder with an exe, on linux it should create 2 .deb files and 1 .rpm file, finally on Mac it should create a dmg.
After creating your respective type of the application either install and run it or just run it and see if any errors occur.

#### 6. Create A Pull Request

First make sure to commit and push your changes to your forked repository. 
Check to see if there are any conflicts with the main repostior and your fork. 
If there are none submit the request and give details as to what you changed or added.

#### 7. Bask In All The Glory Of Adding To A FOSS Application
![Had to do it to em](https://68.media.tumblr.com/2dfc3369827df9b981e111d7fd8fc732/tumblr_mvemcyarmn1rslphyo1_400.gif)
