# VibeCheck Presentation Notes

These notes use simple wording and real examples from our Habit Tracker project.

## Screenshot Key

- S1 Dashboard: `presentation_screenshots/01_dashboard.png`
- S2 Habits page: `presentation_screenshots/02_habits.png`
- S3 Calendar page: `presentation_screenshots/03_calendar.png`
- S4 Statistics page: `presentation_screenshots/04_statistics.png`
- S5 Git history: `presentation_screenshots/05_git_history.png`
- S6 Frontend and backend connection code: `presentation_screenshots/06_frontend_backend_connection.png`
- S7 Backend structure and configuration: `presentation_screenshots/07_backend_structure.png`
- S8 Build, lint, and testing evidence: `presentation_screenshots/08_build_quality_testing.png`

## 1. Version Control Systems: Git and GitHub/GitLab

Simple definition: Version control is a way to save the history of our code, so we can see what changed and go back if something breaks.

How we used it: We used Git commits for the VibeCheck project, and the project is connected to a GitHub repository. The history shows work like the landing page, frontend design, backend, and frontend-backend connection.

Screenshot: S5.

## 2. Branching and Merging Strategies

Simple definition: Branching means working on a separate copy of the code. Merging means bringing that work back into the main project.

How we used it: The Git history shows a merge from the GitHub main branch. This is how group changes can be combined instead of everyone editing one copy at the same time.

Screenshot: S5.

## 3. Pull Requests and Code Reviews

Simple definition: A pull request is when someone asks the team to check their code before it joins the main project. Code review means looking through the code for mistakes or improvements.

How we used it: The local project does not show any GitHub pull requests yet. For our group, this would be useful when someone finishes a feature like login, dashboard, or backend APIs. Others can check it before merging.

Screenshot: S5 shows the GitHub repo history, but there are currently 0 pull requests.

## 4. Collaborative Software Development

Simple definition: Collaborative development means several people building the same project together.

How we used it: Our project has separate areas that different group members could work on, such as React pages, Django backend, routing, models, and styling.

Screenshots: S1, S2, S6, S7.

## 5. Best Practices for Version Control

Simple definition: These are good habits for using Git, like making small commits, writing clear commit messages, and not mixing unrelated work.

How we used it: The commit history has clear stages, such as "Landing Page", "Main FrontEnd Design", and "Connected frontend to backend". That makes it easier to understand the project progress.

Screenshot: S5.

## 6. Continuous Integration and Continuous Deployment: CI/CD

Simple definition: CI/CD is a system that checks, builds, and sometimes deploys the project automatically when code is pushed.

How we used it: We do not have a full CI/CD workflow file in the repo yet. What we do have is local build and lint commands, which are the kind of checks that would go inside CI later.

Screenshot: S8.

## 7. CI/CD Pipelines

Simple definition: A pipeline is the list of automatic steps that run, like install, lint, test, build, and deploy.

How we used it: Our project can already run steps like `npm run lint` and `npm run build`. A future pipeline could run these on GitHub every time the group pushes code.

Screenshot: S8.

## 8. Build Automation

Simple definition: Build automation means using commands to prepare the app instead of doing everything by hand.

How we used it: The React app uses Vite. We can run `npm run build` to create the final frontend build.

Screenshot: S8.

## 9. Automated Testing

Simple definition: Automated tests are checks that run by themselves to see if the code still works.

How we used it: The Django apps already have test files, but real tests still need to be written. This is an area we can improve next.

Screenshot: S8.

## 10. Deployment Strategies

Simple definition: A deployment strategy is the plan for putting the app online safely.

How we used it: The project is not deployed yet. A simple strategy would be to deploy the React frontend separately and the Django backend with its database, then connect them using the API URL.

Screenshots: S6, S7, S8.

## 11. Popular CI/CD Tools

Simple definition: These are tools that can run build and test steps automatically. Examples include GitHub Actions, GitLab CI, Jenkins, CircleCI, and Travis CI.

How we used it: We have not added one of these tools yet. Since the repo is on GitHub, GitHub Actions would probably be the easiest choice.

Screenshot: S5 shows the GitHub repository connection.

## 12. Software Configuration Management: SCM

Simple definition: SCM means keeping control of code, settings, versions, and releases so the project stays organized.

How we used it: We manage code through Git, frontend settings through `package.json`, and backend settings through Django settings and migrations.

Screenshots: S5, S7, S8.

## 13. Configuration Identification

Simple definition: This means knowing which files and settings are important to the system.

How we used it: Important configuration files include `Habit_tracker/settings.py`, `Habit_tracker/package.json`, `requirements.txt`, and migration files.

Screenshots: S7, S8.

## 14. Change Management

Simple definition: Change management is how we handle updates without losing control of the project.

How we used it: We used commits to track changes like frontend pages, backend APIs, and route fixes. This helps the team know what changed and why.

Screenshot: S5.

## 15. Release Management

Simple definition: Release management is preparing a stable version of the app to share or deploy.

How we used it: We are not doing formal releases yet. For this project, a release could be made after login, dashboard, habits, calendar, and statistics are working together.

Screenshots: S1, S2, S3, S4.

## 16. Build Management

Simple definition: Build management is making sure the project can be built correctly every time.

How we used it: We checked the React app with `npm run build`, and the build completed successfully.

Screenshot: S8.

## 17. Configuration Audits

Simple definition: A configuration audit means checking that the project settings and files match what the app needs.

How we used it: We checked settings like Django REST Framework, JWT authentication, CORS, frontend routes, and API paths.

Screenshots: S6, S7.

## 18. Agile Software Development Practices

Simple definition: Agile means building the project in small steps and improving it as we go.

How we used it: The project grew in stages: landing page, login/register, dashboard, backend, frontend-backend connection, and then fixing page issues.

Screenshots: S1, S2, S5.

## 19. Scrum Roles and Ceremonies

Simple definition: Scrum gives people simple roles and meetings. Examples are product owner, scrum master, developers, sprint planning, daily standup, review, and retrospective.

How we used it: Even if we did not formally name Scrum roles, our group can explain roles by splitting work: one person handles frontend, one backend, one testing, and one presentation/documentation.

Screenshot: S5 shows the different project work over time.

## 20. Kanban Boards

Simple definition: A Kanban board is a visual board with columns like To Do, In Progress, and Done.

How we used it: I cannot see a Kanban board in this local repo. For our project, we could use one to track tasks like "Create login page", "Connect API", "Fix habits page", and "Add tests".

Screenshot: No project screenshot available yet unless the group has a board elsewhere.

## 21. User Stories and Backlogs

Simple definition: A user story is a short sentence about what a user wants. A backlog is the list of work still to do.

How we used it: A user story for VibeCheck could be: "As a user, I want to create habits so I can track my daily routine." The README also lists planned features, which works like a simple backlog.

Screenshots: S1, S2.

## 22. Sprint Planning and Retrospectives

Simple definition: Sprint planning is choosing what to work on next. A retrospective is talking about what went well and what to improve.

How we used it: We can explain our work in sprint-like chunks: first UI pages, then backend, then connection, then bug fixing. A retrospective point would be that tests and CI should be added earlier next time.

Screenshots: S5, S8.

## 23. Agile vs. Traditional Development

Simple definition: Agile builds the project in small pieces and changes as needed. Traditional development plans most things before building.

How we used it: Our project was more Agile because we kept adding and improving parts step by step instead of finishing a full plan first.

Screenshot: S5.

## 24. Software Testing and Code Quality

Simple definition: Testing and code quality are about making sure the app works and the code is clean enough to maintain.

How we used it: We ran linting and build checks. The app also has Django test files started, but more real tests are still needed.

Screenshot: S8.

## 25. Unit, Integration, System, and Acceptance Testing

Simple definition: Unit tests check small pieces. Integration tests check pieces working together. System tests check the whole app. Acceptance tests check if the app does what the user needs.

How we used it: We have not fully written these tests yet. Examples for VibeCheck would be:

- Unit test: check streak calculation.
- Integration test: check React can fetch habits from Django.
- System test: log in, create a habit, mark it done.
- Acceptance test: confirm a user can track daily habits successfully.

Screenshots: S1, S2, S6, S8.

## 26. Test Automation

Simple definition: Test automation means tests run with a command instead of someone checking everything manually.

How we used it: The project is ready for automation through npm and Django commands, but the real automated test suite still needs to be added.

Screenshot: S8.

## 27. Code Reviews

Simple definition: A code review is when another teammate checks your code before it becomes part of the main project.

How we used it: We can use code review for pages like `Dashboard.jsx`, `Habits.jsx`, and backend files like `habits/views.py`. The current repo does not show GitHub PR reviews yet.

Screenshots: S5, S6, S7.

## 28. Static Code Analysis

Simple definition: Static code analysis checks the code without running the full app.

How we used it: ESLint checks the React code for common mistakes. We ran `npm run lint` and it passed.

Screenshot: S8.

## 29. Test-driven Development: TDD

Simple definition: TDD means writing the test first, then writing the code until the test passes.

How we used it: We did not fully use TDD in this project. A good future example would be writing a test for "mark habit complete" before coding the complete-habit API.

Screenshot: S8 shows the current test files where TDD could start.

