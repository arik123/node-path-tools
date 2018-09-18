This is a basic package that finds if files are in windows path and can return their location

Usage 
  ```js
const pathTools = reqire("node-path-tools");
pathTools.getLocationFromPath(filename); // returns absolute path to file if file dont exist it returns undefined
pathTools.existsInPath(filename); // returns if file exists
  ```
