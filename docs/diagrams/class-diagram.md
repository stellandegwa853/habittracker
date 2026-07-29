# Class Diagram

```mermaid
classDiagram
    class User {
        +int id
        +string first_name
        +string last_name
        +string username
        +string email
        +datetime date_joined
    }

    class UserPreference {
        +bool reminder_enabled
        +time daily_notification_time
        +bool dark_mode
    }

    class Habit {
        +int id
        +string title
        +text description
        +string category
        +string frequency
        +string time_of_day
        +string goal
        +string goal_type
        +int target_duration_seconds
        +bool timer_enabled
        +time reminder_time
        +date start_date
        +string mood_tag
        +int target_days
    }

    class HabitCompletion {
        +int id
        +date completed_date
    }

    class RegisterSerializer {
        +validate_email()
        +create()
    }

    class EmailLoginSerializer {
        +validate()
    }

    class HabitSerializer {
        +validate_title()
        +validate_target_days()
        +validate()
        +get_completed_today()
        +get_completion_rate()
        +get_current_streak()
        +get_best_streak()
    }

    class HabitListCreateView {
        +get_queryset()
        +perform_create()
    }

    class CompleteHabitView {
        +post()
    }

    class AppDataProvider {
        +refresh()
        +createHabitRecord()
        +updateHabitRecord()
        +deleteHabitRecord()
        +completeHabitRecord()
    }

    class ApiService {
        +registerUser()
        +loginUser()
        +fetchHabits()
        +createHabit()
        +updateHabit()
        +completeHabit()
        +deleteHabit()
        +fetchDashboard()
    }

    User "1" --> "0..*" Habit
    User "1" --> "1" UserPreference
    Habit "1" --> "0..*" HabitCompletion
    HabitSerializer --> Habit
    RegisterSerializer --> User
    EmailLoginSerializer --> User
    HabitListCreateView --> HabitSerializer
    CompleteHabitView --> HabitCompletion
    AppDataProvider --> ApiService
    ApiService --> HabitListCreateView
```

## Explanation

This diagram focuses on the real backend models and the main frontend data layer. The backend stores users, preferences, habits, and habit completions. The serializers validate and shape API data. The frontend uses `AppDataProvider` and `api.js` service functions instead of calling the backend directly from every page. There is no backend `TimerSession` model yet; timed habit countdown state is currently stored in frontend local storage.
