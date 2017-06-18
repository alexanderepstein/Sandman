ECHO Running packaging scripts
CALL electron-packager ../ Sandman --platform win32 --arch x64 --out dist/ --electronVersion 1.7.3 --ignore tests --ignore assets/Usage.gif --ignore scss --ignore build --ignore assets/giphy.gif
CALL electron-packager ../ Sandman --platform win32 --arch ia32 --out dist/ --electronVersion 1.7.3 --ignore tests --ignore assets/Usage.gif --ignore scss --ignore build --ignore assets/giphy.gif
