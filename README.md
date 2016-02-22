# chatApplication
AngularJS chat application for web programming course

## Handin
Hand in a single archive file, containing all the source files for the application, including instructions on how to install and run the application in a README.md file. Note: unless you make changes to the supplied server, then you DON'T need to hand in that code! As a matter of fact, your code should absolutely not be integrated into that folder, the server and the client should be stored in two separate folders!
Do note that your solution should NOT include the bower and/or the node_modules folders!

### TO RUN THE APPLICATION

Navigate to supplied server folder(we changed one line :)) and run "npm install" into the Terminal, and then "node chatserver.js"
Then navigate to the client/src folder and open index.html in Firefox(not Chrome)

The browser-window has to be relitively large because of Bootstrap messes things up when you have your browser to small

### TO BE ABLE TO RUN GRUNT

navigate to the client folder and run:
#### grunt 
which will run jshint, concat and uglify by default