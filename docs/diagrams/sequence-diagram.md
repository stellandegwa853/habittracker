# Sequence Diagram

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Context as AppDataProvider
    participant API as API Service
    participant Django as Django Backend
    participant DB as Database

    User->>React: Open create habit page
    React->>User: Show habit form
    User->>React: Enter habit details and choose goal type
    React->>Context: createHabitRecord(form)
    Context->>API: createHabit(payload)
    API->>Django: POST /api/habits/
    Django->>Django: Validate habit data
    Django->>DB: Save Habit
    DB-->>Django: Habit saved
    Django-->>API: Return created habit
    API-->>Context: Created habit data
    Context->>React: Refresh habit list and dashboard data
    React-->>User: Show habit in habits page

    alt Simple habit
        User->>React: Click Complete Today
        React->>Context: completeHabitRecord(habitId)
    else Time-based habit
        User->>React: Start timer
        React->>React: Countdown runs in localStorage
        User->>React: Mark Completed after timer
        React->>Context: completeHabitRecord(habitId)
    end

    Context->>API: completeHabit(habitId)
    API->>Django: POST /api/habits/{id}/complete/
    Django->>DB: Save HabitCompletion for today
    DB-->>Django: Completion saved
    Django-->>API: Return updated habit
    API-->>Context: Completion response
    Context->>React: Refresh dashboard, habits, calendar, stats
    React-->>User: Show updated completion status
```

## Explanation

This sequence shows the create-and-complete flow. The React form sends habit data through the shared context and API service. Django validates and saves the habit. Completion uses the same backend endpoint for simple and time-based habits. The timer itself is frontend state, but the final completion is saved in the database.
