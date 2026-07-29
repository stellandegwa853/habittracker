# SWE3040XA Final Project Documentation

## Group Members

- William Gathii 669986
- Kassim Mohamed 674210
- Dennis Mutonga 669574
- Stella Ndegwa 669749

## 1. Project Brief Description

VibeCheck is a habit tracker system built for the SWE3040XA Software Engineering Processes group project. The system helps users create habits, track daily progress, maintain streaks, view progress, and manage their personal habit routine.

The problem being solved is that many users want to build better habits but forget what they planned, lose motivation, or cannot easily see their progress. VibeCheck gives them a simple dashboard where they can see what to complete today and how consistent they have been.

The target users are students and everyday users who want a simple routine tracker for study, fitness, wellness, productivity, or personal habits. The system is useful because it gives users a clear place to create habits, complete them, review history, and keep track of streaks.

At a high level, the React frontend handles the user interface and navigation. The Django backend handles user accounts, authentication, habit records, completions, dashboard data, profile data, and settings. The frontend talks to the backend through API service functions.

## 2. Functional Requirements

FR1: The system allows users to register an account.

FR2: The system allows users to log in using email and password.

FR3: The system allows users to log out by clearing their stored authentication tokens.

FR4: The system protects dashboard and habit pages from unauthenticated users.

FR5: The system shows a dashboard summary with today's habits, completed habits, streaks, and progress.

FR6: The system allows users to create a new habit.

FR7: The system allows users to view all saved habits.

FR8: The system allows users to view details for one habit.

FR9: The system allows users to edit an existing habit.

FR10: The system allows users to delete a habit.

FR11: The system allows users to mark a habit as completed for the current day.

FR12: The system prevents duplicate completion records for the same habit on the same day.

FR13: The system supports simple completion habits and time-based habits.

FR14: The system provides a frontend timer for time-based habits.

FR15: The system stores habit completion history in the backend.

FR16: The system shows a calendar/history view based on completed habit dates.

FR17: The system shows a statistics/progress page based on saved habits and completions.

FR18: The system includes an achievements page.

FR19: The system allows users to view and edit profile details.

FR20: The system allows users to update simple settings such as reminder preferences and theme preference.

FR21: The system allows users to change their password.

## 3. Non-Functional Requirements

NFR1: The interface should be simple and easy to understand.

NFR2: The interface should use readable text, clear labels, and clear buttons.

NFR3: The layout should be responsive on desktop, tablet, and mobile screens.

NFR4: The system should protect user data using authentication.

NFR5: The frontend should communicate with the backend through reusable API service functions.

NFR6: The system should give useful loading, empty, and error messages where possible.

NFR7: The system should be maintainable by keeping frontend pages, reusable components, backend models, serializers, and views separated.

NFR8: The system should perform basic checks through linting, build commands, and Django checks.

## 4. Design Diagrams

The four required diagrams are stored in `docs/diagrams/`.

Editable draw.io versions are stored in `docs/diagrams/drawio/`. The easiest file to open is `docs/diagrams/drawio/vibecheck-diagrams.drawio`, which contains all four diagrams as separate pages. PNG preview versions are stored in `docs/diagrams/rendered/`.

### 4.1 Use Case Diagram

File: [use-case-diagram.md](diagrams/use-case-diagram.md)

Draw.io file: `docs/diagrams/drawio/use-case-diagram.drawio`

This diagram shows the user interacting with registration, login, habit management, timer, dashboard, calendar, statistics, achievements, profile, and settings features.

### 4.2 Class Diagram

File: [class-diagram.md](diagrams/class-diagram.md)

Draw.io file: `docs/diagrams/drawio/class-diagram.drawio`

This diagram shows the main real project classes and data structures, including `User`, `Habit`, `HabitCompletion`, `UserPreference`, serializers, backend views, the React data context, and API service functions.

### 4.3 Activity Diagram

File: [activity-diagram.md](diagrams/activity-diagram.md)

Draw.io file: `docs/diagrams/drawio/activity-diagram.drawio`

This diagram shows the main user flow from opening the app, logging in or registering, creating a habit, choosing simple or time-based habit type, completing a habit, and viewing progress.

### 4.4 Sequence Diagram

File: [sequence-diagram.md](diagrams/sequence-diagram.md)

Draw.io file: `docs/diagrams/drawio/sequence-diagram.drawio`

This diagram shows the create-and-complete habit flow between the user, React frontend, app data context, API service, Django backend, and database.

## 5. Demo Checklist And Script

The detailed demo script is stored in [DEMO_SCRIPT.md](DEMO_SCRIPT.md).

Recommended demo order:

1. Open the landing page.
2. Show login and register pages.
3. Log in with a test user.
4. Show the dashboard summary.
5. Create a new habit.
6. Show the habit in the habits page.
7. Mark a simple habit complete.
8. Start a timer for a time-based habit and mark it complete.
9. Show the calendar page.
10. Show the statistics page.
11. Show the achievements page.
12. Show the profile page.
13. Show the settings page.
14. Show the GitHub repository, commits, branches, and contributors.
15. Show terminal evidence for lint, build, Django check, and Django tests.

## 6. User Interface Explanation

The VibeCheck interface is designed to feel clean and calm. The sidebar gives users clear navigation to Dashboard, Habits, Calendar, Statistics, Achievements, Profile, and Settings. The topbar shows the current page context, search input, date, and profile initials.

The app uses consistent cards, buttons, spacing, rounded corners, and neutral colors. Forms use labels and helper text so users understand what to enter. Habit cards show important information first, such as category, time of day, streak, completion status, and goal type.

The UI supports loading states, empty states, and error messages through reusable components such as `EmptyState`. The layout is responsive: the desktop view uses a sidebar, while the mobile view uses a bottom navigation bar. Accessibility is considered through readable contrast, clear button text, visible focus styles, and form labels.

The UI is not perfect yet. More screenshots should be captured for the full habit card, timer running state, landing page, login/register pages, profile, settings, and achievements.

## 7. Software Design Principles

### Modularity

The project is split into clear parts. React pages live in `Habit_tracker/src/pages`, reusable UI components live in `Habit_tracker/src/components`, routing lives in `Habit_tracker/src/routes`, and API calls live in `Habit_tracker/src/services/api.js`.

The backend is also modular. The `habits` app handles habit records, habit completions, serializers, views, URLs, and streak services. The `users` app handles registration, login, profile, preferences, and password changes.

### Reusability

Reusable components include `AppLayout`, `Sidebar`, `Topbar`, `HabitCard`, `HabitForm`, `HabitTimer`, `StatCard`, `ProgressRing`, `EmptyState`, `ConfirmModal`, and `CalendarGrid`. These make the UI more consistent and reduce repeated code.

### Maintainability

The frontend uses helper files such as `habitTransforms.js`, `timerStorage.js`, and `errorMessages.js` so data formatting and error handling are not repeated everywhere. The backend uses serializers to validate API data instead of putting all validation directly inside views.

### Separation Of Concerns

The frontend focuses on user interaction and presentation. The backend focuses on data, authentication, validation, and saved records. The API service file is the connection layer between them.

One future improvement is to reduce repeated form/button styling even further by creating shared button and input components.

## 8. SOLID Principles

### 1. Single Responsibility Principle

SRP is shown because many files have one main responsibility. For example, `HabitForm.jsx` handles habit form UI, `HabitCard.jsx` handles habit card display, `HabitTimer.jsx` handles timer controls, `api.js` handles API requests, and `HabitSerializer` handles habit validation and serialized data.

### 2. Open/Closed Principle

OCP is partly shown because new pages and components can be added without rewriting the whole app. For example, the timer feature was added through `HabitTimer.jsx`, structured habit fields, and transform helpers without rebuilding every page from scratch.

### 3. Liskov Substitution Principle

LSP is not strongly visible because this project does not use many inheritance structures in the frontend. Django class-based views do use framework inheritance, but the project does not create many custom subclasses that need substitution behavior. A future improvement would be to use shared base components or typed interfaces carefully if the app grows.

### 4. Interface Segregation Principle

ISP is partly shown by keeping API helper functions focused. For example, `createHabit`, `updateHabit`, `completeHabit`, `deleteHabit`, `fetchProfile`, and `updatePreferences` are separate service functions instead of one large function that every component must use.

### 5. Dependency Inversion Principle

DIP is partly shown because pages use `useAppData` and service functions instead of directly making raw Axios calls everywhere. It could improve further by adding more abstraction around storage, notifications, and API errors so components depend less on implementation details like localStorage.

## 9. Testing

The project has basic automated checks and local command evidence. It does not yet have a full frontend test suite.

| Test/check | Command | Result | Purpose |
| --- | --- | --- | --- |
| Available npm scripts | `npm run` | Passed | Shows available frontend helper scripts. |
| Frontend lint | `npm run lint` | Passed | Checks React code style and common mistakes with ESLint. |
| Frontend build | `npm run build` | Passed | Confirms the Vite frontend can build successfully. |
| Django system check | `.venv/bin/python manage.py check` | Passed | Checks Django configuration and project setup. |
| Django tests | `.venv/bin/python manage.py test` | Passed, 2 tests | Runs backend tests currently in the project. |

Current testing coverage:

- Backend tests exist for structured habit goal validation.
- Django system checks are passing.
- Frontend linting is passing.
- Frontend build is passing.
- Manual system testing can be shown through the demo flow.

Testing improvements needed:

- Add more backend unit tests for registration, login, habit CRUD, completion, dashboard, and preferences.
- Add frontend component tests.
- Add integration tests for React and Django API flows.
- Add acceptance testing checklist with expected results.
- Add end-to-end tests for login, create habit, complete habit, and timer completion.

## 10. Version Control / CI/CD / DevOps

The project uses Git and GitHub for version control. The remote repository is `https://github.com/stellandegwa853/habittracker.git`. The Git history shows commits for project setup, backend foundation, landing page, frontend design, frontend-backend connection, UI fixes, timer updates, and documentation.

Branches are used for feature work and fixes. The local history also shows contributors in Git, including William Gathii, Dennis Mutonga, and Stella Ndegwa. Kassim may not appear in Git history, so his contribution should be shown through planning, testing, documentation, and presentation work.

Existing evidence:

- `PROJECT_TIMELINE.md`
- `presentation_screenshots/05_git_history.png`
- Git branches and commit history
- Local lint/build/test commands

CI/CD status:

- No active GitHub Actions workflow is currently committed under `.github/workflows/`.
- A sample workflow has been added in `docs/CI_WORKFLOW_EXAMPLE.yml`.
- The sample workflow is intended to run frontend lint/build and backend Django check/tests if copied into `.github/workflows/ci.yml`.
- It should be treated as a CI/CD plan or example unless the group adds it to GitHub and shows a real successful run.
- Full deployment is not implemented yet.

DevOps practices shown:

- Version control with Git.
- Branch-based feature work.
- Repeatable local commands.
- Basic CI workflow planning.
- Future deployment planning.

## 11. Teamwork

Team members:

- William Gathii 669986
- Kassim Mohamed 674210
- Dennis Mutonga 669574
- Stella Ndegwa 669749

Suggested role explanation for presentation:

- William Gathii: frontend, UI/UX, documentation, integration support.
- Kassim Mohamed: project planning, research, testing, documentation support, presentation preparation.
- Dennis Mutonga: backend/API support and testing support.
- Stella Ndegwa: repository setup, version control support, frontend support.

The group can explain that collaboration happened through code commits, discussion, testing, documentation, and presentation preparation. Not every team member has to appear equally in Git commits because teamwork also includes planning, testing, reviewing, research, and preparing the final presentation.

Recommended communication tools to mention if they were used:

- WhatsApp or group chat for quick updates.
- In-person or online meetings for planning.
- GitHub for code sharing and version tracking.
- Shared documents for presentation notes.

## 12. Project Management

The project currently has `PROJECT_TIMELINE.md`, which records major milestones and can be used as project management evidence. A simple markdown board has also been added in [PROJECT_MANAGEMENT_BOARD.md](PROJECT_MANAGEMENT_BOARD.md).

No Trello, GitHub Projects, or Kanban screenshot was found in the repository. If the group used one outside the repo, a screenshot should be added. If not, the group can explain that the project timeline and markdown board were used as lightweight tracking tools.

## 13. References

- React documentation: https://react.dev/
- Vite documentation: https://vite.dev/
- Django documentation: https://docs.djangoproject.com/
- Django REST Framework documentation: https://www.django-rest-framework.org/
- Simple JWT documentation: https://django-rest-framework-simplejwt.readthedocs.io/
- Git documentation: https://git-scm.com/doc
- GitHub documentation: https://docs.github.com/
- GitHub Actions documentation: https://docs.github.com/actions
- Mermaid documentation: https://mermaid.js.org/

## 14. Reflections

The team learned how frontend and backend parts connect in a real web application. React was used for pages, navigation, forms, and reusable UI components. Django was used for the database models, API views, serializers, authentication, and backend validation.

One challenge was keeping the frontend and backend connected correctly, especially with routes, tokens, CORS, and API paths. Another challenge was making the interface look consistent while still keeping the project simple enough for a student group project.

Version control helped the team track changes and understand the project timeline. Testing showed that build, lint, Django configuration, and current backend tests are passing, but more automated tests should be added in the future.

Future improvements include deployment, stronger CI/CD evidence, more tests, more backend analytics, timer session history, and more complete screenshots for the final presentation.
