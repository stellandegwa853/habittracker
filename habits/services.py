from datetime import timedelta


def calculate_streak(completions):
    """
    completions: QuerySet of HabitCompletion ordered by completed_date
    """

    dates = sorted([c.completed_date for c in completions])

    if not dates:
        return 0, 0

    longest = 1
    current = 1

    for i in range(1, len(dates)):
        if dates[i] == dates[i - 1] + timedelta(days=1):
            current += 1
            longest = max(longest, current)
        else:
            current = 1

    return current, longest