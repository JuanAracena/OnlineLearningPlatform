# OnlineLearningPlatform

## Description
This project is a web-based learning platform that allows users to create study tools like interactive flashcards, exams, and study games. The goal of the project is to provide users with a more accessible way of making learning tools to aide their education. A user has to create an account using an email to save their content in a database.

## Technology Used
### Backend
  - **Language**: Python (ver 3.13.0)
  - **Framework**: Django

### Frontend
  - **Language**: JavaScript, HTML
  - **Framework**: React.js
  - **Styling**: CSS

### Database
  - **Database**: PostgreSQL

### Tools and Software
  - **Version Control**: Git
  - **API Development Tool**: Postman
  - **State Management**: Redux
  - **Hosting Platforms**: Vercel, Supabase

## Features
**Flashcard Gallery**: The platform provides users with a list of flashcards they have created in the past using their account.

**Study Mode**: The platform displays interactive flashcards to help users memorize terms and definitions.

**Match Mode**: The platform randomizes the terms and definitions of a group of flashcards the user created and displays them in form of multiple-choice questions. Each question consists of one term and four definitions, with one of the definitions being the correct choice. At the end of the exercise, the platform calculates how many questions the user got right and gives a percentage score.

## How to Build and Run Locally
1. Open VS Code or your IDE of choice.

2. Clone the repository:
    ####
       git clone https://github.com/JuanAracena/OnlineLearningPlatform.git
   
3. Navigate to the project directory:
    ####
       cd OnlineLearningPlatform

4. Navigate to the backend folder:
    ####
       cd backend
   
5. Install pipenv:
    ####
       pip install pipenv
   
6. Create and start a vitual environment:
    ####
       pipenv shell
   
7. Install dependencies from the Pipfile:
    ####
       pipenv install
   
8. Open pgAdmin 4 and create a local database for the project. Make sure the name and password for the database matches the name and password shown in the settings.py file located in the onlinelearningplatform folder.

9. Go back to your IDE and apply the migrations to the postgresql database:
    ####
       python manage.py makemigrations

10. Run the backend server:
    ####
        python manage.py runserver

11. Open a new terminal alongside the one running the backend server and navigate to the frontend folder:
    ####
        cd frontend

12. Install react-scripts:
    ####
        npm install react-scripts

13. Run the frontend server:
    ####
        npm start

## Development Process

  1.  Designed the relational schema and entity-relationship diagram of the database and implemented it in PostgreSQL.
  
  2.  Drafted user interface layouts for small and medium screens, focusing on user accessibility and intuitiveness.
    
  3.  Used React, JavaScript, and CSS to render, stylize, and enforce functionality in the user interface layouts that make up the front end of the website.

  4.  Developed the back end of the website using Django to handle http requests from the frontend, featuring an authentication system to manage login and signup requests.

  5.  Used Postman to test http requests sent and received from the front end to the back end, ensuring that the correct data is displayed using session-based authentication.
  
  6.  Connected backend endpoints with the frontend by using API fetch calls and managed their states usign react-redux.
  
  7.  Used Vercel and Supabase to host the website and database to enable public access without a local server.


