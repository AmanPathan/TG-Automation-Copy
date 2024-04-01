# Steps to run project

## step1: open this project in VSCode and then open Terminal
## step2: open split terminal
## step3: in first terminal run following commands
``` 
cd client
npm i
npm start
```
## step4: in second terminal run following commands
``` 
cd server
npm i
nodemon index.js
```
## step5: now your app is running!



# Project Update Summary

This document summarizes the recent changes made to the project.

## Changes Made

1. **Updated the create & fill form controller:**
    - Updated the `/fillform` route to create a form if no `formId` is provided in the request body.
    - If `formId` is provided, it checks if the form exists, and if not, creates a new form and populates it with data.
    - Added logic to populate the form with data from the `studentPerformance` field of the request body.
    - Modified the `/sendreport` route to require `formId` to fetch data from the database and generate a PDF report.

2. **Created controllers for accessing an Excel file containing student data:**
    - Implemented controllers to process an Excel file containing student data and store them in the Student database section of the Users schema.
    - Note: The routes for these controllers are currently not working, but the controller logics are ready.

3. **Created a controller to divide students into Teacher Guardian (TG) groups:**
    - Implemented a controller to fetch student data from the database and allocate students to TG groups by dividing them equally among the TGs.

4. **Created a controller to retrieve each faculty's TG group members:**
    - Developed a controller to fetch TG group members corresponding to each faculty's facultyId.

5. **Defined routes for each of the controllers:**
    - Set up routes for the newly created controllers. Note that these routes are currently not functional due to ongoing development and debugging.

6. **Remaining Tasks:**
    - Test the existing routes and debug any issues encountered.
    - Develop a dashboard where each faculty can view their TG group members.
    - Implement a dashboard to display TG meeting data, including student names, attendance, discussion points, etc.

## Note
- The existing routes, especially `/fillform`, are functioning correctly.
- Due to health reasons, testing and debugging of the newly implemented routes have been postponed.

Please refer to the codebase for detailed implementation and further development tasks. If you have any questions or require assistance, feel free to reach out.
