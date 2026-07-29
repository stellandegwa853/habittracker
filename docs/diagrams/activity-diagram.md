# Activity Diagram

```mermaid
flowchart TD
    start([Start])
    openApp["Open VibeCheck"]
    authChoice{"Has account?"}
    register["Register account"]
    login["Log in"]
    dashboard["View dashboard"]
    chooseAction{"Next action?"}
    createHabit["Create habit"]
    chooseGoal{"Goal type"}
    simpleGoal["Simple completion habit"]
    timeGoal["Time-based habit with duration"]
    saveHabit["Save habit"]
    habitList["View habits page"]
    completionChoice{"Complete now?"}
    markComplete["Mark habit completed"]
    timerFlow["Start timer"]
    pauseResume["Pause / resume / reset if needed"]
    finishTimer["Finish timer"]
    markTimedComplete["Mark timed habit completed"]
    updateProgress["Backend saves completion and updates progress"]
    review["View dashboard, calendar, and statistics"]
    logout["Logout"]
    end([End])

    start --> openApp
    openApp --> authChoice
    authChoice -- "No" --> register --> login
    authChoice -- "Yes" --> login
    login --> dashboard
    dashboard --> chooseAction
    chooseAction -- "Create habit" --> createHabit
    createHabit --> chooseGoal
    chooseGoal -- "Simple" --> simpleGoal --> saveHabit
    chooseGoal -- "Time-based" --> timeGoal --> saveHabit
    saveHabit --> habitList
    chooseAction -- "Use existing habit" --> habitList
    habitList --> completionChoice
    completionChoice -- "Simple habit" --> markComplete --> updateProgress
    completionChoice -- "Time-based habit" --> timerFlow --> pauseResume --> finishTimer --> markTimedComplete --> updateProgress
    updateProgress --> review
    review --> logout
    logout --> end
```

## Explanation

The activity diagram shows the main user journey. A user registers or logs in, views the dashboard, creates a simple or time-based habit, completes it, and then checks progress on the dashboard, calendar, or statistics page.
