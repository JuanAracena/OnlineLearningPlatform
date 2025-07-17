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
