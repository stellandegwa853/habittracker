# Use Case Diagram

```mermaid
flowchart LR
    user["User"]
    system["VibeCheck System"]
    api["Django Backend / API"]

    subgraph app["VibeCheck Habit Tracker"]
        register["Register"]
        login["Login"]
        logout["Logout"]
        dashboard["View Dashboard"]
        createHabit["Create Habit"]
        viewHabits["View Habits"]
        editHabit["Edit Habit"]
        deleteHabit["Delete Habit"]
        completeHabit["Complete Habit"]
        startTimer["Start Timer"]
        calendar["View Calendar"]
        statistics["View Statistics"]
        achievements["View Achievements"]
        profile["Manage Profile"]
        settings["Manage Settings"]
    end

    user --> register
    user --> login
    user --> logout
    user --> dashboard
    user --> createHabit
    user --> viewHabits
    user --> editHabit
    user --> deleteHabit
    user --> completeHabit
    user --> startTimer
    user --> calendar
    user --> statistics
    user --> achievements
    user --> profile
    user --> settings

    register --> system
    login --> system
    logout --> system
    dashboard --> system
    createHabit --> system
    viewHabits --> system
    editHabit --> system
    deleteHabit --> system
    completeHabit --> system
    startTimer --> system
    calendar --> system
    statistics --> system
    achievements --> system
    profile --> system
    settings --> system

    system --> api
```

## Explanation

The main actor is the user. The user can register, log in, manage habits, complete habits, use the timer for time-based habits, and view progress pages. The React frontend communicates with the Django backend/API for saved user, habit, completion, profile, and settings data. The timer runs in the frontend and uses the normal completion endpoint when the user marks the habit complete.
