# ResearchFusion - A Human Participant Study Support Platform

Welcome to the human-participant-study-support-system. This project addresses the challenges of conducting ethical human-participant studies at the University of Auckland. Researchers found it difficult and time-consuming to manage multiple studies and human participants. As a result, this novel web application (ResearchFusion) will assist researchers with a comprehensive and user-friendly dashboard for managing their studies. The dashboard has functionalities in displaying the participant's recruitment process and the expired studies. Besides, each study has a general report, researcher, session, and participant management dashboard to manage the details. <br/>
On this README, you can see the background introduction, installation guide, product key features, data structure, code structure, used technologies, and the future work of this project.

> <a name="home">Table of Contents  
> 1. [Installation Guide](#ch1)  
> 2. [Product Key Features](#ch2)  
> 3. [Data Structure](#ch3)  
> 4. [Code Structure](#ch4)
> 5. [Used Technologies](#ch5)
> 6. [Future Work](#ch6)

For the details of the project's planning (project proposal report) and each week's project progress, please see [Wiki](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/wiki).

## <a name="ch1">Installation Guide
This novel web application (ResearchFusion) has been published at the following link: 
https://human-participant-system-frontend.vercel.app/
Users can enjoy this website without any installation and use the following username and password to log in.
```shell
# Example User 1
username: ewan
password: 123456

# Example User 2
username: yucheng
password: 123456

# Example User 3
username: dev
password: 123456
```
Furthermore, we still provide the installation guide for users who wish to execute the application locally. Please follow the following steps:
### Step 1: Pull the repository
Use Git to pull the code via the URL: [human-participant-study-support-system](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system.git) 
### Step 2: Install yarn
If you haven't installed yarn before, please install yarn with the following command. We will use yarn in the following section.
```
npm install -g yarn
```
### Step 3: Install the dependencies
- If you are using VS Studio Code, please open a new Terminal and use the following command to install the dependencies
  
  - **Backend**: Change the directory to the root folder of the backend and execute the command `yarn install`
  - **Frontend**: Change the directory to the root folder of the frontend and execute the command `yarn install`
  
- Other than VS Studio Code, please open the Command Promote and change the path to the project, then install the dependencies 
  
  - **Backend**: Change the directory to the root folder of the backend and execute the command `yarn install`
  - **Frontend**: Change the directory to the root folder of the frontend and execute the command `yarn install`

### Step 4: Step up MongoDB
- Create an env file under the `backend` folder with the following information:
```
DB_URL = 'mongodb+srv://Jessica:THFZWV0wKfJs19Ze@studymanagement.nxvpoy3.mongodb.net/ResearchFusionFinal'
```
- If user is unable to connect to the database with the above method or wishes to create a database locally, please follow the following steps:
  - **Step 1**: Create an env file under the `backend` folder with the following information:
    ```
    DB_URL = 'mongodb://localhost:27017/ResearchFusionFinal'
    ```
  - **Step 2**: Connect to the local MongoDB Compass and create the following database and collections:
    ```
    Database: ResearchFusionFinal
    Collection:
    - Researcher
    - Study
    - Session
    - Participant
    - StudyParticipant
    - Tag
    ```
  - **Step 3**: Under each collection, use MongoDB Compass `Import JSON or CSV file` function under the `ADD DATA` button to import JSON files. Each collection's JSON file is stored under the `backend` folder's `dbExport` folder.
  
     |   Collection name |             dbExport file name              |
     |-------------------|---------------------------------------------|
     |  Researcher       | ResearchFusionFinal.Researcher.json         |
     |  Study            | ResearchFusionFinal.Study.json              |
     |  Session          | ResearchFusionFinal.Session.json            |
     |  Participant      | ResearchFusionFinal.Participant.json        |
     |  StudyParticipant | ResearchFusionFinal.StudyParticipant.json   |
     |  Tag              | ResearchFusionFinal.Tag.json                |

### Step 5: Run the App
- **Backend Server**: Change the directory to the root folder of the backend and execute the command `yarn start`
- **Frontend Server**: Change the directory to the root folder of the frontend and execute the command `yarn start`

[:top:](#home)

## <a name="ch2">Product Key Features

### Product Features Overview
The ResearchFusion platform, associated with the University of Auckland, offers researchers a comprehensive suite of tools. This platform streamlines the process of setting up, managing, and conducting various research studies.

Our product is a versatile and powerful platform designed to meet various research management needs. It offers a range of keys, such as study, researcher, session and participant management, each carefully developed to streamline processes, enhance user experience, and provide valuable functionality. The platform aims to revolutionize research studies by offering an all-in-one solution for researchers to manage, track, and streamline their projects. In this document, we'll explore these features in detail.

### Target Requirements

The following targets are what we planned to meet at the start of the project:

#### User Management
  - Users can log into the system using their email and password.
  - Users can update their profile information and reset their password.

#### Study Management:
  - View list of studies by status: `active`, `closed`, and participants progress.
  - Create, edit, or close studies.
  - Add, create or remove researchers to/from studies.
  - View study details.
  - Export with JSON files for data backup.
  - Generate reports: Automatically generate a report for the study, including everything related to the study (such as title, description, participants list, etc).

#### Participants Management:
  - Generate mailing lists for invitations/notifications.
  - Add or delete participants:
    - Import CSV files for participants batching addition.
    - Soft delete for withdrawals.
    - Recruit extra participants midway.
    - Prioritize experienced participants.
  - Export CSV files for data backup.
  - Reveal Potential Participants: For instance, lists of participants who are willing to be contacted.
  - Tagging: Create tags for participants characteristics, which can be used for pre-screening.
  - Further Participation Records: For those who agreed to be added to the database for future studies.
  - Rewards Record: Record if a participant will receive a reward (voucher or something else).
  - Report Acceptance: Record if a participant is willing to accept the final report.

#### Session Management:
  - Schedule study sessions, assign participants, and set session locations, dates and times.
  - Sessions can be created, edited, and archived.
  - Show participants list in each session.
  - Generate a participant mailing list for each session.
  -  Export CSV files for data backup.

### UX (User experience) simulation
We simulate the possible users' experience and list the possible interactions as the following:
<details>
<summary><h4>Home Page</h4></summary>
  
1. `Track 1`: **Home page** :arrow_right: click **Potential Participants** button :arrow_right: select some of the participants in the pop up table :arrow_right: click **Show Mailing List** button :arrow_right: email list of the selected participants
2. `Track 2`: **Home page** :arrow_right: click **Expired Study** button :arrow_right: view expired studies list :arrow_right: click **All Study** button :arrow_right: back to all studies list  
3. `Track 3`: **Home page** :arrow_right: click user avatar at the right top side :arrow_right: click **Profile** :arrow_right: update profile (first name, last name, email) :arrow_right: click **Update** button :arrow_right: update personal profile successfully
4. `Track 4`: **Home page** :arrow_right: click **Create Study** button :arrow_right: input all necessary information about the study :arrow_right: click **Submit** button :arrow_right: the study would been created
5. `Track 5`: **Home page** :arrow_right: click `One of the study name shown in the table` :arrow_right: go to the `Study info page` which shows study information, sessions list (if this is not an anonymous study) and participants list <br/>
</details>
<details>
<summary><h4>Study Info Page</h4></summary>
  
1. `Track 1`: **Study Info page** :arrow_right: click **Export JSON** button :arrow_right: download a JSON file includes everything related to the study
2. `Track 2`: **Study Info page** :arrow_right: click `Hamburger button` at the left top side :arrow_right: expand the left sidebar
3. `Track 3`: **Study Info page** :arrow_right: click **Study Detail** in the sidebar :arrow_right: go to the `Study Details page` :arrow_right: click **Manage Researchers** button :arrow_right: click **Add New Researcher** button :arrow_right: input new researcher's first name, last name and email address :arrow_right: click **Add** button :arrow_right: select an email address in the `Existing researcher email list` :arrow_right: click `Add icon` :arrow_right: a researcher would be added to the study
4. `Track 4`: **Study Info page** :arrow_right: click **Study Detail** in the sidebar :arrow_right: go to the `Study Details page` :arrow_right: update study related information :arrow_right: click **Submit** button :arrow_right: the study information would be updated
5. `Track 5`: **Study Info page** :arrow_right: click **Manage Participants** in the sidebar :arrow_right: go to the `Participants Management page` :arrow_right: click **Add New Participants** button :arrow_right: input related information (`Email` is required) about a participant or click **Upload a CSV file** to upload a CSV file (`Email` column is required) :arrow_right: click **Add** button :arrow_right: new participants information would be added to the study
6. `Track 6`: **Study Info page** :arrow_right: click **Manage Sessions** in the sidebar :arrow_right: go to the `Session Management page` :arrow_right: click **New Session** button :arrow_right: input related information and select the participant to the new session :arrow_right: click **Save** button :arrow_right: the new session would be created
7. `Track 7`: **Study Info page** :arrow_right: click **Close Study** button :arrow_right: the study would be closed :arrow_right: click **Clear Participants Info** button :arrow_right: all participants and sessions in the study would be cleared
</details>
<details>
<summary><h4>Participants Management Page</h4></summary>

1. `Track 1`: **Participants Management page** :arrow_right: click `Edit icon` in one row :arrow_right: update the information about the participant :arrow_right: click **Save** button :arrow_right: the information about the participant would be updated
2. `Track 2`: **Participants Management page** :arrow_right: select some participants in the table :arrow_right: select a property in the list :arrow_right: click **Toggle Selected Rows** button :arrow_right: the status of property in selected participants would be switched
3. `Track 3`: **Participants Management page** :arrow_right: select some participants in the table :arrow_right: input or select a tag in the text field :arrow_right: click **Add Tag to Selected Rows** or **Delete Tag from Selected Rows** button :arrow_right: inputed tag would be added to or deleted from selected participants
4. `Track 4`: **Participants Management page** :arrow_right: select some participants in the table :arrow_right: click **Delete Selected Participants** button :arrow_right: selected participants would be deleted from the study
5. `Track 5`: **Participants Management page** :arrow_right: select some participants in the table :arrow_right: click **Actions** button :arrow_right: click `Show Mailing List` :arrow_right: view mailing list about selected participants
6. `Track 6`: **Participants Management page** :arrow_right: click **Actions** button :arrow_right: click `View in FullScreen` :arrow_right: view participants table in fullscreen :arrow_right: press `Esc` or click **Exit FullScreen** button  :arrow_right: exit the fullscreen mode
7. `Track 7`: **Participants Management page** :arrow_right: click **Actions** button :arrow_right: click `Selected Rows by Emails` :arrow_right: input participants email (split multiple emails by `space` or `,`) in email input text field :arrow_right: press `Enter` or click **Find Rows** button :arrow_right: participants with the same email would be selected :arrow_right: press `Esc` or click **Clear** button :arrow_right: clear selected rows and input emails
8. `Track 8`: **Participants Management page** :arrow_right: click **Actions** button :arrow_right: click `Show Gift List` or `Show Report Recipients` :arrow_right: click `checkbox` at the right side of each row or select participants then click **Toggle Selected Rows** button :arrow_right: the sent status of participants would be switched
</details>
<details>
<summary><h4>Session Management Page</h4></summary>

1. `Track 1`: **Session Management page** :arrow_right: click **Action** button in the right side of each row :arrow_right: click `Edit Session` :arrow_right: update session information :arrow_right: click **Save** button :arrow_right: the information about the session would be updated
2. `Track 2`: **Session Management page** :arrow_right: click **Action** button in the right side of each row :arrow_right: click `View Participants` :arrow_right: view participants in the session :arrow_right: click **Mailing List** button :arrow_right: view mailing list about the participants
3. `Track 3`: **Session Management page** :arrow_right: click **Action** button in the right side of each row :arrow_right: click `Archive Session` button :arrow_right: the session would be archived :arrow_right: click **Archived Sessions** button :arrow_right: view archived sessions list
</details>

### UI (User Interface) Design

The platform's UI design is centred around ease of access, clarity, and efficient information dissemination. Here's a breakdown of the UI components:

#### Login Interface
A straightforward module allowing users to input their credentials and gain access to the platform. Aesthetic touches like the platform's logo add to its visual appeal. The researcher can log in using the username and password.

<img width="724" alt="LoginPage" src="https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/a99a4f4b-7e71-4816-b88a-a306496708e5">

#### Dashboard
The dashboard page provides a clear overview of studies with their respective progress bars, allowing researchers to assess each study's status and participant count quickly. In the upper right corner are three buttons with multiple functions provided to the researchers:
1. The `EXPIRED STUDY` Button shows all expired studies and reminds researchers to update the study's close date or close the study.
2. The `POTENTIAL PARTICIPANTS` Button shows all potential participants willing to participate in other studies in the future so that researchers can simply copy the email address to upload the participant details.
3. The `CREATE STUDY` Button navigates to the Create Study page with a user-friendly form for researchers to create a study.

![DashboardPage](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/fa7eb9e2-cbde-4e5d-9b84-127c32c4c637)

#### Potential Participants Dialog
This modal showcases potential participants who can be included in a research study. It provides their email addresses and any tags associated with them. Users can select the participants they want and copy the email list of selected participants.
##### Key Features
- `Email`: List of potential participants' email addresses.
- `Tags`: Associated tags (e.g., affiliations) with the potential participant

![PotentialParticipantsDialog](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/df7b7aa2-bc50-4832-9dc9-75da752d4d6e)

#### Study Creation Form
Create study page presents a comprehensive form that captures all pertinent details of a study. It features fields for study names, codes, types, descriptions, anonymous status, project start and end dates, location details, and related links.
##### Key Features
- `Study Name`: The title of the study.
- `Study Code`: A unique code specified for the study.
- `Study Type`: The type of study (e.g., Experiment).
- `Study Anonymity`: Specifies whether the study is anonymous and records the anonymous participant's number.
- `Description`: A detailed study description offers insights into its objectives and methodologies.
- `Project Start Date` & `Close Date`: Open and Close dates are required and the platform provides the function of reminding when the study has passed the close date.
- `Location Details`: Add multiple study locations with our 'Add New Location' feature, which is especially convenient.
- `Expected Number of Participants`: Records the expected number of participants.
- `Related Survey` & `Drive Link`: Records related links of the study.
  
![Create-Study-Page](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/a1b16820-c0ef-487d-b01f-e9451281088c)

#### Study Report Details Page
A deep dive into individual studies, this page lists the involved researchers, the study's description, type, and details about its sessions and participants. It provides comprehensive details about a specific study, including its title, researcher, type, and more. 
It also provides tools for closing studies and exporting data in a JSON format.
##### Key Features
- `Researcher List`: The main researcher(s) involved in the study.
- `Description`: A brief overview of the study's objectives and goals.
- `Experiment Type`: The methodology or type of research being conducted.
- `Anonymous`: Specifies if the study ensures participant anonymity.
- `Project Dates`: The start and end dates of the study.
- `Location`: Where the study is primarily conducted.
- `Survey & Drive Links`: Direct links to external resources or surveys related to the study.
- `Session List`: A detailed list of all sessions related to the study, with options to view or manage them.
- `Participant List`: A list of participants involved in the study, with their contact details and status regarding gifts or reports.

![StudyReportPage](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/baabf077-b773-4760-a8e7-fa13d37ac31f)

#### Participants Management
This section allows users to manage the participants enrolled in a particular study. It provides an overview of the participants, their contact details, and their status in the study.
Users can add new participants in the upper right corner by typing the participant information or simply uploading the CSV file. Users can also click the "ACTIONS" button to conduct multiple functions of participant management: show gift list, show report participants, show mailing list, select rows by emails and even view the participants' table in fullscreen. 
##### Key Features
- `Serial No.`: Unique identification for each participant.
- `Name`: Name of the participant.
- `Email`: Email address of the participant.
- `Phone Number`: Contact number of the participant.
- `Status`: Current status of the participant within the study (e.g., processing).
- `Actions`: Allows for various actions, including viewing reports, mailing lists, and participant details.

![ParticipantsManagementPage](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/42748ac6-295e-46c6-b7df-710fa955fd4a)

#### Manage Researchers
This modal enables the management of researchers associated with a particular study. Researchers can be added based on their email addresses or by adding new entries.
##### Key Features
- Current Researcher for this Study: Display the name of the current researcher
- Add New Researcher to the Study by Searching Email Address: Search and add the existing researchers via emails, and the existing researcher emails will automatically show in the search bar.  
- `Add New Researcher`: Option to add new researchers either by searching through existing email addresses or by adding a new researcher entry with first name, last name, and email address to the system. After adding a new researcher to the system, the newly created researcher will be automatically added to the existing study. 

![ResearcherManagementDialog](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/fbcd73c2-07e3-4a26-8cfa-6bb7fd719365)

#### Session Management
This section provides an overview of different sessions within a specific research study, facilitating seamless management and organization. The session management page provides multiple functionalities, such as creating a new session and showing all sessions that have been archived. In the Action button of each session in the table, users can edit session details, view participants in the session and archive the session if it is no longer used. 
##### Key Features
- `Session Code`: Each session is assigned a unique code.
- `Date`: The specific date on which the session will occur.
- `Time`: The exact time of the session.
- `Location`: Where the session will be held, which can be a physical room or an online platform.
- `Participant Number`: The total count of participants enrolled in that session.
- `Actions`: Options to edit the session details, view participants, or archive the session.

![SessionManagementPage](https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/29923471-669c-4427-acb4-4d8d87d9c0f2)

#### Researcher Profile
This section provides an interface for researchers to view and update their personal information and security details, such as resetting passwords.
##### Key Features
- `First Name`: The first name of the researcher.
- `Last Name`: The last name of the researcher.
- `Email`: The researcher's contact email.
- `Security`: Options to reset or update the account password.

<img width="1440" alt="UserProfilePage" src="https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/80761505/359056a4-60be-457c-9f14-8fcadd945103">

[:top:](#home)

## <a name="ch3">Data Structure
<details>
<summary><b>Database UML</b></summary>

<img src="https://github.com/UOA-MINFOTECH-INTERNSHIPS/human-participant-study-support-system/assets/93987431/b43541ac-499b-4149-90dd-961cb93483cd" width="500" height="800"/><br/>
</details>
  
ResearchFusion has six object categories in the database: Researcher, Study, Session, StudyParticipant, Participant, and Tag.
#### Researcher
 - Researchers are the users of the ResearchFusion platform.
 - Every researcher has a `username` and `password` to log in to the system and a study list that the researcher creates or participates in.
 - The `email` and `username` are unique in the database.
 - The `studyList` objectId can refer to the Study object.  
#### Study
- The Study object contains the general information of the study, such as date, time, description, etc.
- The `studyCode` is unique in the database.
- The `creator` and `researcherList` can refer to the Researcher object in the Study object.
- If there is an anonymous study, user can set up the `isAnonymous` and `anonymousParticipantNum`.
- The `isClosed` records whether the study has been closed.
- The `isCleard` records whether the study's sessions and participants have been cleared.
#### Session
- The Session object has general information, including date, time, location, and participants list.
- The `studyId` objectId can refer to the Study object. 
- The `participantList` objectId can refer to the Participant object.
- The `isArchive` records whether the session has been archived.
#### StudyParticipant
 - Since participants can join more than one study, we designed a StudyParticipant object to manage the relationship between the study and the participant.
 - The `studyId` objectId can refer to the Study object.
 - The `participantList` objectId can refer to the Participant object.
 - The `isActive` records whether the participant has been removed from the study.
 - The `isComplete` records whether the participant has completed the study
 - The `isGift` records whether the participant wins a gift, and `isSentGift` records whether the gift has already been sent.
 - The `isWillReceiveReport` records whether the participant is willing to receive the report, and `isSentReport` to records whether the report has been sent. 
#### Participant
- Participant object contains the basic information of a participant, such as name, email, and phone number.
- The `email` is unique in the database.
- Each participant has several tags that can categorize participants with certain characteristics, such as occupation, age, specialities, etc. The `tag` objectId can refer to the Tag object.
- The `isWillContact` records whether the participant is willing to participate in future studies.
#### Tag
-  Tag object records the characteristics of participants, which is useful for users to pre-screen or filter the participants.
-  The `tagName` is unique in the database.
  
[:top:](#home)
## <a name="ch4">Code Structure
### Backend
<details>
<summary><b>Backend Code Structure Image</b></summary>
  
```txt
─backend
  │  .gitignore
  │  babel.config.js
  │  package.json
  │  yarn.lock 
  ├─public
  ├─dbExport 
  └─src
      │  enum.js
      │  server.js 
      ├─config    
      ├─database
      │  ├─participant
      │  │  ├─dao      
      │  │  ├─domain      
      │  │  └─__test__        
      │  ├─researcher
      │  │  ├─dao     
      │  │  ├─domain     
      │  │  └─__test__        
      │  ├─session
      │  │  ├─dao     
      │  │  ├─domain      
      │  │  └─__test__
      │  ├─study
      │  │  ├─dao     
      │  │  ├─domain     
      │  │  └─__tests__       
      │  ├─studyParticipant
      │  │  ├─dao   
      │  │  ├─domain    
      │  │  └─__test__        
      │  └─tag
      │      ├─dao     
      │      ├─domain     
      │      └─__test__            
      ├─middlewares    
      ├─routes
      │  └─__test__        
      └─utils
```
</details>

<details>
<summary><b>Backend Code Structure Descriptions</b></summary>
  
**/dbExport** <br/>
   This folder contains exported database data for backup and DB initialization.
   
**/src** <br/>
  This is the main folder containing our project's source code.
   - **enum.js**: A file for defining enumerations or constants used in the project.
   - **server.js**: The main server entry file for the project, containing server setup, middleware and route handling logic.

 **/config** <br/>
   This is a folder used for configuration files.
   - **log4jsConfig.js**: A file used for configuring logging.
   - **swaggerConfig.js**: Likely used for configuring Swagger documentation generation.
   
 **/database** <br/>
   This folder contains code related to the database.
   - **participant**, **researcher**, **session**, **study**, **studyParticipant**, **tag**: <br/>
     These subfolders correspond to different data entities or tables, including participants, researchers, sessions, studies, study participants, and tags.
     - **dao**: Contains Data Access Objects (DAOs) for interacting with the database.
     - **domain**: Contains domain objects, typically representing entities in database tables.
     - **__test__**: Contain test files related to the respective data entities.

**/middlewares** <br/>
  This folder is used for Express middlewares.
   - **authenticateToken.js**: This is a middleware file used for authentication.

 **/routes** <br/>
   This folder contains Express route files.

 **/utils** <br/>
   This folder typically contains utility functions or helper files in our project.

   - **log4js.js**: Used for logging.
   - **parseData.js**: Contain utility functions for data parsing or manipulation.

**.gitignore** <br/>
   This is a file used by Git to specify which files and directories should be ignored and not included in version control.

**babel.config.js** <br/>
   This is the configuration file for Babel, used for configuring JavaScript code translation and compilation.

**package.json** <br/>
   This is the package configuration file for our Node.js project, containing metadata, dependencies, and scripts.

**yarn.lock** <br/>
   This is a lock file generated by the Yarn package manager to ensure consistency in project dependencies.
</details>

### Frontend
<details>
<summary><b>Frontend Code Structure Image</b></summary>
  
```txt
─frontend
    │  .gitignore
    │  babel.config.js
    │  package.json
    │  README.md
    ├─public   
    ├─src
    │  │  App.jsx
    │  │  index.js
    │  │  reportWebVitals.js
    │  │  setupTests.js 
    │  ├─assets    
    │  ├─components
    │  │  ├─Button
    │  │  │  └─__test__        
    │  │  ├─Common
    │  │  │  └─__test__        
    │  │  ├─DataGrid
    │  │  │  └─__test__         
    │  │  ├─Participant
    │  │  │  └─__test__         
    │  │  ├─Popup
    │  │  │  └─__test__         
    │  │  ├─Researcher
    │  │  │  └─__test__         
    │  │  ├─Session
    │  │  │  └─__test__        
    │  │  └─Study
    │  │      └─__test__            
    │  ├─hooks    
    │  ├─pages    
    │  ├─providers
    │  │  └─__test__      
    │  ├─services     
    │  ├─styles   
    │  └─utils
    │      └─__test__            
    └─__mocks__
```
</details>
<details>
<summary><b>Frontend Code Structure Descriptions</b></summary>
  
 **/public** <br/>
  This folder contains public assets and files that are served directly to the client.
  
 **/src** <br/>
   This folder is the main source code folder for our frontend application.
   - **App.jsx**: The main component of our application.
   - **index.js**: The entry point for our application.
   - **reportWebVitals.js**: A script for reporting web vitals.
   - **setupTests.js**: Setup file for testing.

  **/assets** <br/>
   This folder typically contains static assets like images and other resources used in the application.

  **/components** <br/>
   This folder contains reusable UI components used throughout the application.

  **/hooks** <br/>
   Custom React hooks used in your application for managing state and behaviour.

  **/pages** <br/>
   These are React components representing different pages or views in your application.

  **/providers** <br/> 
   React context providers are used for state management and data sharing.

  **/services** <br/>
   JavaScript modules for providing specific services, such as authentication and token management.

  **/styles** <br/> 
   CSS files and styles used in your application.

  **/utils** <br/>
   Utility functions and helper files used in your application. This folder may contain validation functions, data parsing, and more.

  **/mocks**  <br/> 
   This folder contains mock files used in testing, such as "fileMock.js" and "styleMock.js."

**.gitignore** <br/>
  This file specifies which files and directories should be ignored by Git when tracking changes and commits.

**babel.config.js** <br/>
  This is the configuration file for Babel, used to configure JavaScript code translation and compilation.

**package.json** <br/>
  The package configuration file for your frontend application, contains metadata, dependencies, and scripts.
</details>

[:top:](#home)

## <a name="ch5">Used Technologies
This web application is based on the MERN (MongoDB, Express.js, React, Node.js) stack. The MERN stack is a popular choice for building full-stack web applications, and it comprises MongoDB as the database, Express.js as the back-end framework, React as the front-end library, and Node.js as the server runtime. This combination allows for a seamless and efficient development process, making it suitable for creating modern, scalable, and feature-rich web applications.

### Backend

[Node.js](https://nodejs.org/en)

Our team utilizes Node.js as the back-end framework. Node.js is a server-side runtime environment that enables building scalable and efficient web applications. It's known for its non-blocking, event-driven architecture, making it suitable for handling real-time, data-intensive tasks, and APIs.

### Frontend

[React](https://www.react.dev/)

We developed our web application using React, and for managing asynchronous API requests, we employed Axios. Our web app follows a Single-Page Application (SPA) architecture, which means it loads only once in a web browser, and we implemented page navigation using React Router along with NavLink for seamless transitions between different sections or pages. To ensure security, all our pages are wrapped within the <AuthenticationRedirect> component. This approach guarantees that all information presented is relevant to the current user, and we have implemented token-based authentication for added security and user verification. 
```jsx
const MainLayout = ({children}) => {
    return(
      <AuthenticationRedirect>
        <CurrentUserContextProvider>
          {children}
        </CurrentUserContextProvider>
      </AuthenticationRedirect>
    )
  }
```

[MUI](https://mui.com/)

Our team relies on Material-UI (MUI) for our frontend page design, with a primary focus on using the `Data Grid` component and other components, including `Dialog`, `Button`, `AppBar`, etc. Material-UI is a popular React UI framework that offers a wide range of pre-designed components and styles, making it easier to create visually appealing and responsive user interfaces. The `Data Grid` component, in particular, is an essential part of our design toolkit. It enables us to display and manipulate tabular data efficiently, providing features like sorting, filtering, and pagination for a seamless user experience. By using MUI and the Data Grid component, our team can deliver user-friendly and feature-rich web applications with a modern and consistent design aesthetic.
<details>
<summary>Data Grid code example</summary>
  
```jsx
 <StyledDataGrid
                sx={{
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '1px' },
                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '8px' },
                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '15px' },
                }} 

                rows={reorderRowsBasedOnSelection(studyParticipants, selectedRows)}

                columns={columns}
                loading={loading}

                // adjust row height by num of tags in each row
                getRowHeight={(params) => {
                  const dpr = window.devicePixelRatio || 1; // get pixel ratio of client
                  const tagsCount = params.model.participantInfo.tagsInfo.length;
                  const baseHeight = 40;
                  const extraHeightPerThreeTags = 20;
                  let ratio;
              
                  // set how many tags contained in base height
                  if (dpr <= 1) { // pixel ratio below 100%
                      ratio = 3;
                  } else { // pixel ratio over than 100%
                      ratio = 2;
                  }

                  if(tagsCount <= ratio) return baseHeight;
                  return baseHeight + Math.ceil(tagsCount / ratio - 1) * extraHeightPerThreeTags;
                }}
            
                getRowId={(row) => row._id}
                paginationModel={pageModel}
                density="compact"
                columnVisibilityModel={columnVisibility}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                          // Hide columns status and traderName, the other columns will remain visible
                          note: false,
                          delete: false
                        },
                      },
                    pagination: { 
                        paginationModel:  
                        { pageSize: 100 } 
                    },
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setSelectedRows(newRowSelectionModel);
                }}
                rowSelectionModel={selectedRows}
                pagination
                slots={{
                    pagination: CustomPagination,
                    noRowsOverlay: CustomNoRowsOverlay,
                    toolbar: GridToolbar
                }}
                pageSizeOptions={[25, 50, 100]}
                checkboxSelection={true}

                onSortModelChange={(newModel) => {
                  setSortModel(newModel);
                }}
                sortModel={sortModel}
                onFilterModelChange={(newModel) => {
                    setFilterModel(newModel);
                }}
                filterModel={filterModel}

                onPaginationModelChange={(newModel) => {
                  setPageModel(newModel);
                }}
                onColumnVisibilityModelChange={(newModel) => {
                    setColumnVisibility(newModel);
                }}
            
                disableRowSelectionOnClick

            />
```
</details>


### Database

[MongoDB](https://www.mongodb.com/)

Our team leverages MongoDB as our database solution, hosted in the cloud. MongoDB is a NoSQL database known for its flexibility, scalability, and real-time data processing capabilities. By hosting our database in the cloud, we gain the advantage of high availability, data redundancy, and the ability to easily scale our infrastructure as our application's data requirements grow. This cloud-based MongoDB setup empowers us to efficiently manage and access our data, ensuring optimal performance and reliability for our applications.

### Test

[Swagger](https://swagger.io/)
Our team utilizes Swagger and Postman as essential tools for conducting backend testing.

Swagger is employed for documenting and testing our RESTful APIs. It allows us to create clear, interactive API documentation, making it easy for team members and external stakeholders to understand and interact with our APIs. This documentation also serves as a valuable reference point for testing API endpoints, ensuring that they function as intended.

Postman, on the other hand, is a versatile platform for testing APIs and automating various testing scenarios. Our team leverages Postman's capabilities to run automated tests on API endpoints, simulate different HTTP requests, and assess how our backend services respond. This approach allows us to identify and address issues, such as incorrect responses or unexpected behaviours, early in the development process.

The combination of Swagger and Postman enables our team to maintain the quality, reliability, and consistency of our backend services, ultimately leading to a smoother and more efficient development process.
<details>
<summary>Swagger documentation example</summary>
  
```javascript
/**
 * @swagger
 * /api/info/{researcherId}:
 *   get:
 *     summary: Get researcher information by ID
 *     description: Retrieve researcher information by their unique ID.
 *     tags:
 *      - Researcher
 *     parameters:
 *       - in: path
 *         name: researcherId
 *         required: true
 *         description: The ID of the researcher to retrieve information for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful retrieval of researcher information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResearcherInfo'
 *             examples:
 *               example1:
 *                 value:
 *                   message: User Info
 *                   result:
 *                     firstName: John
 *                     lastName: Doe
 *                     email: john.doe@example.com
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */
router.get('/info/:researcherId', async (req, res) => {

    const { researcherId } = req.params;
    try{
        const user = await ResearcherDao.getResearcherById(researcherId);

        log4js.info(`Researcher.router.get./info/:researcherId. ResearcherId: ${researcherId} info retrieved`)
        return res.status(HTTP_SUCCESS).json({ message: 'User Info',
            result: { firstName: user.firstName, lastName: user.lastName, email: user.email, studyList: user.studyList}
        });
    } catch (error) {
        log4js.error(`Researcher.router.get./info/:researcherId. Internal server error: ${error}`);
        return res.status(HTTP_SERVER_ERROR).json({ message: 'Server error'})
    }
})
```
</details>

[Jest](https://jestjs.io/)

You can run the frontend testing by the following command: <br/>
- **Backend Server**: Change the directory to the root folder of the backend and execute the command `yarn test`
- **Frontend Server**: Change the directory to the root folder of the frontend and execute the command `yarn test`
The jest will go through 30 test suites,  116 test cases in frontend and  18 test suites,  112 test cases in backend.

```bash
// Frontend
Test Suites: 30 passed, 30 total
Tests:       116 passed, 116 total
Snapshots:   0 total
Time:        20.068 s
```

```bash
// Backend
Test Suites: 18 passed, 18 total
Tests:       112 passed, 112 total
Snapshots:   0 total
Time:        8.619 s
```

Our development team has implemented a comprehensive testing strategy using Jest, a well-established JavaScript testing framework.

We've leveraged Jest to create a suite of unit tests that rigorously evaluate our code's functionality and robustness. These tests encompass a wide array of scenarios, covering both synchronous and asynchronous code execution. We've also performed manual testing to ensure the code behaves as expected in real-world use cases.

Furthermore, we've harnessed Jest's mocking capabilities to isolate specific components or modules within our codebase for testing in isolation. This helps us verify the correctness of individual parts of our software. Additionally, we've employed mocking to simulate external dependencies, like APIs, guaranteeing that our tests are consistent and reliable.

Testing isn't an afterthought for us; it's an integral part of our development workflow. We've seamlessly integrated testing into our continuous integration and deployment (CI/CD) pipeline. This proactive approach allows us to detect issues early in the development process, maintaining a high standard of code quality and reliability.

[Log4js](https://www.npmjs.com/package/log4js) <br/>
Log4js is a highly effective Node.js logging module we've integrated into our backend services. Within our backend system, I've organized our log messages into four distinct categories: debug, info, warning, and error. Each category is handled differently, and the logs are not only printed but also exported to a log file. The configuration of this logging mechanism is managed through the use of the config module, providing us with control and flexibility over our logging system.

### Deployment

[Vercel](https://vercel.com/)

Our team uses Vercel for efficient frontend deployment. It integrates with Git for automated deployments, ensuring our applications are always up-to-date. Vercel's CDN provides fast loading times worldwide. Preview deployments help us test changes before merging. Vercel streamlines deployment, improves collaboration, and enhances the user experience. 

[Heroku](https://www.heroku.com/)

Our team relies on Heroku for seamless backend deployment. Heroku simplifies the deployment process, allowing us to focus on development. It provides a scalable platform, automatic scaling, and support for various programming languages. With Heroku, we ensure our backend services are accessible, reliable, and easily maintained.

[:top:](#home)

## <a name="ch6">Future Work

Due to the time constraint, there are several features that we recommend adding in the future to optimize the application and improve user experience.
#### Study Management
- Study creation templates to allow researchers to save and reuse previous study settings.
#### Participant Management
- **As a researcher role**
  - Email templates to allow researchers to send/communicate with participants more easily.
  - Storage of participant's experiment data and consent forms.
  - Participant ethics application template sample generation.
  - Allows researchers to provide feedback on participant engagement and quality.
- **As a participant role** <br/>
  Allow participants to have access to ResearchFusion and have the following functionalities:
  -  Viewing available studies and registering to participate in the studies they are interested
  -  Event calendar to show available/booked time slots for studies
  -  Allows participants to view and rate studies they have participated in before
#### Session Management
- Event calendar to show all the booking/time slots of sessions.
#### University's administrator role
- Viewing ongoing/completed studies for compliance monitoring
- Access to participants' consent form for verification
#### System Operation
- User guidance support
- Responsive UI design for different devices.
- Third-party application integration, such as Qualtircs.
- Integrate OpenAI to assist ethics application form sample generation.
- Central storage and management of ethics application files.
- Message board to allow communication with researcher and participants on the platform without using email
#### Code Improvement
- Complete Swagger documentation
- Complete all the frontend unit tests. Currently, only the `component` part has been tested.


[:top:](#home)


