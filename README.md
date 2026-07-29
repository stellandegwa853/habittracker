# VibeCheck

VibeCheck is a habit tracker web application built for the SWE3040XA Software Engineering Processes group project. It helps users create habits, track daily progress, keep streaks, view completion history, and manage a personal routine in a calm and simple interface.

## Project Description

Many people want to build better habits, but they lose track of what they planned to do each day. VibeCheck solves this by giving users one place to create habits, mark them as complete, check their progress, and review their history.

The system is designed for students or everyday users who want a light habit tracker instead of a complicated productivity tool. It is useful because it gives quick feedback through the dashboard, calendar, statistics, streaks, and achievement pages.

## How The System Works

1. A user opens the landing page and can register or log in.
2. After logging in, the React frontend stores authentication tokens and loads user data from the Django backend.
3. The user can create, view, edit, delete, and complete habits.
4. Habit completions are saved in the backend and used for the dashboard, calendar, statistics, and streak calculations.
5. Time-based habits can use a frontend countdown timer. When the user marks the timed habit complete, the normal backend completion endpoint is used.

## Target Users

- Students building study, fitness, wellness, or productivity routines.
- People who want a simple daily habit tracker.
- Users who prefer a clean dashboard instead of a busy task management app.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- React Icons
- Axios

### Backend

- Django
- Django REST Framework
- Simple JWT authentication
- SQLite for local development
- Django migrations

## Main Frontend Features

- Landing page
- Login and registration pages
- Protected app routes
- Dashboard summary
- Habit list and filtering
- Create habit form
- Edit habit form
- Habit details page
- Completion and streak display
- Time-based habit timer
- Calendar/history page
- Statistics/progress page
- Achievements page
- Profile page
- Settings page
- Responsive sidebar/mobile navigation
- Loading, error, and empty states

## Main Backend Features

- User registration
- Email-based login using JWT tokens
- Token refresh support
- User profile endpoint
- User preference endpoint
- Password change endpoint
- Habit CRUD endpoints
- Habit completion endpoint
- Habit completion history endpoint
- Dashboard summary endpoint
- Streak and completion-rate calculations
- Structured habit goal fields for simple and time-based habits

## Project Structure

```text
habittracker/
├── Habit_tracker/              # React frontend and Django project settings
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── settings.py
├── habits/                     # Django habit app
├── users/                      # Django user/profile app
├── docs/                       # Rubric documentation and diagrams
├── presentation_screenshots/   # Existing presentation screenshots
├── manage.py
├── package.json                # Root helper scripts
└── requirements.txt
```

## Setup Instructions

### 1. Clone The Repository

```bash
git clone https://github.com/stellandegwa853/habittracker.git
cd habittracker
```

### 2. Backend Setup

Create and activate a Python virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py migrate
```

Run the Django backend:

```bash
python manage.py runserver 8000
```

### 3. Frontend Setup

Install frontend dependencies:

```bash
npm run install:frontend
```

Run the React frontend:

```bash
npm run dev
```

The frontend normally runs on `http://localhost:5174` or another available Vite port. The backend runs on `http://127.0.0.1:8000`.

## Available Commands

### Root Commands

```bash
npm run
npm run dev
npm run frontend
npm run build
npm run lint
npm run install:frontend
npm run backend
```

### Frontend Checks

```bash
npm run lint
npm run build
```

There is currently no frontend `npm run test` script.

### Backend Checks

```bash
.venv/bin/python manage.py check
.venv/bin/python manage.py test
```

Current evidence from local checks:

- Django system check passes.
- Django test command passes 2 tests.
- Frontend lint passes.
- Frontend build passes.

## Current Project Status

Implemented:

- React frontend pages and routing.
- Django backend APIs.
- JWT authentication.
- Frontend/backend API connection.
- Habit CRUD and completion tracking.
- Dashboard, calendar, statistics, achievements, profile, and settings pages.
- Structured habit goal types and a frontend timer for time-based habits.
- Rubric documentation, Mermaid diagrams, demo script, screenshot checklist, project management board, and a CI workflow example.

Not fully implemented yet:

- Deployment to a live hosting service.
- Full frontend automated test suite.
- Larger backend test coverage.
- Backend storage for timer session history.
- Formal pull request review evidence.

## Future Improvements

- Add more backend unit and integration tests.
- Add frontend tests for main user flows.
- Store timed habit sessions in the backend for better statistics.
- Add deployment for frontend and backend.
- Add the CI workflow example to `.github/workflows/ci.yml` and verify it on GitHub.
- Add more detailed analytics and export options.
- Capture updated screenshots for the full demo flow.

## Group Members

- William Gathii 669986
- Kassim Mohamed 674210
- Dennis Mutonga 669574
- Stella Ndegwa 669749

## References

- React documentation: https://react.dev/
- Vite documentation: https://vite.dev/
- Django documentation: https://docs.djangoproject.com/
- Django REST Framework documentation: https://www.django-rest-framework.org/
- GitHub documentation: https://docs.github.com/
- Mermaid documentation: https://mermaid.js.org/
