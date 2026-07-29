# VibeCheck Demo Script

This script gives the group a simple order to follow during the final presentation. It focuses on features that are actually implemented.

| Step | What to click/do | What to explain | Rubric support | Screenshot to capture |
| --- | --- | --- | --- | --- |
| 1 | Open `/` in the browser. | This is the VibeCheck landing page. It introduces the habit tracker and guides users to log in or register. | Project brief, UI | Landing page screenshot needed. |
| 2 | Open `/register`. | The system lets a new user create an account. | Functional requirements, demo | Register page screenshot needed. |
| 3 | Open `/login`. | The system lets an existing user log in with email and password. Show the password visibility toggle if useful. | Functional requirements, security | Login page screenshot needed. |
| 4 | Log in with a test user. | After login, protected pages become available. The frontend stores JWT tokens and uses them for API requests. | Demo, backend connection | Optional auth flow screenshot. |
| 5 | Show `/dashboard`. | The dashboard summarizes today's habits, completed habits, streaks, and progress. | Demo, UI, functional requirements | Existing: `docs/screenshots/presentation/01_dashboard.png`. |
| 6 | Click Habits. | The habits page lists saved habits from the Django backend and lets users search/filter. | Demo, frontend-backend connection | Existing screenshot is cropped; capture a full habit card. |
| 7 | Click Add Habit. | The create form lets users enter habit details and choose a goal type. | Habit CRUD, UI | Create habit screenshot needed. |
| 8 | Create a simple habit. | A simple habit is one the user only needs to mark as complete. | Functional requirements | Screenshot after save. |
| 9 | Create or edit a time-based habit. | A time-based habit has a target duration and can enable a timer. | Timer feature | Time-based form screenshot needed. |
| 10 | Start a timer. | The timer runs in the frontend and uses local storage so it can continue after refresh. | Demo, timer | Timer running screenshot needed. |
| 11 | Mark the habit complete. | Completion is saved in the backend using the habit completion endpoint. | Backend/API, demo | Habit completed screenshot needed. |
| 12 | Open Habit Details. | Details show description, streaks, goal type, target, timer status, and activity. | Functional requirements | Habit details screenshot needed. |
| 13 | Open Calendar. | Calendar shows completion history based on backend habit completion dates. | Demo, history | Existing: `docs/screenshots/presentation/03_calendar.png`. |
| 14 | Open Statistics. | Statistics use saved habit and completion data to calculate progress. | Demo, progress | Existing: `docs/screenshots/presentation/04_statistics.png`. |
| 15 | Open Achievements. | Achievements show progress and badge-style motivation. | Demo, UI | Achievements screenshot needed. |
| 16 | Open Profile. | Profile lets the user view and update personal details. | Functional requirements | Profile screenshot needed. |
| 17 | Open Settings. | Settings show reminder, theme, account, and data options. | Functional requirements | Settings screenshot needed. |
| 18 | Show GitHub repository. | Explain version control, commits, branches, and contributors. | Version control/teamwork | Existing: `docs/screenshots/presentation/05_git_history.png`; add contributors/branches screenshots if possible. |
| 19 | Show documentation and diagrams. | Open `docs/SWE3040XA_FINAL_PROJECT_DOCUMENTATION.md` and the diagram files. | Diagrams, design principles, SOLID | Diagram screenshots or rendered Mermaid images needed. |
| 20 | Show terminal checks. | Run or show evidence for lint, build, Django check, and Django tests. | Testing | Existing: `docs/screenshots/presentation/08_build_quality_testing.png`; update if needed. |

## Short Speaking Flow

1. "VibeCheck is a habit tracker that helps users build better routines by creating habits, completing them daily, and viewing progress."
2. "The frontend is built with React, Vite, Tailwind CSS, and React Router."
3. "The backend is built with Django, Django REST Framework, JWT authentication, and SQLite for local development."
4. "A user can register, log in, create habits, complete them, use the timer for time-based habits, and view progress on dashboard, calendar, and statistics pages."
5. "The project is organized with reusable React components, an API service layer, Django models, serializers, views, and migrations."
6. "The backend tests are organized into unit, integration, system, and acceptance folders. Django tests, Django system check, frontend lint, and frontend build all pass."
7. "Future improvements include deployment, more automated tests, stronger CI/CD evidence, and backend timer session history."

## Demo Notes

- Use a test account and prepare at least one simple habit and one time-based habit before presenting.
- Keep the demo short. Focus on the main user journey: login, dashboard, create habit, complete habit, timer, calendar, statistics.
- If the internet is slow, use screenshots as backup evidence.
