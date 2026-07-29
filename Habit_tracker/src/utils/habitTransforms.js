export function toHabitView(habit) {
  if (!habit) {
    return null
  }

  const goalType = habit.goal_type || habit.goalType || 'simple'
  const targetDurationSeconds = Number(
    habit.target_duration_seconds ?? habit.targetDurationSeconds ?? 0,
  )

  return {
    id: habit.id,
    title: habit.title || '',
    description: habit.description || '',
    category: habit.category || 'Personal',
    frequency: habit.frequency || 'Daily',
    currentStreak: habit.current_streak ?? habit.currentStreak ?? 0,
    bestStreak: habit.best_streak ?? habit.bestStreak ?? 0,
    completedToday: Boolean(habit.completed_today ?? habit.completedToday),
    completionRate: Math.round(
      Number(habit.completion_rate ?? habit.completionRate ?? 0),
    ),
    completionCount: habit.completion_count ?? habit.completionCount ?? 0,
    completionDates: habit.completion_dates || habit.completionDates || [],
    moodTag: habit.mood_tag || habit.moodTag || 'Calm',
    timeOfDay: habit.time_of_day || habit.timeOfDay || 'Morning',
    goal: habit.goal || '',
    goalType,
    targetDurationSeconds,
    timerEnabled: Boolean(habit.timer_enabled ?? habit.timerEnabled),
    reminderTime: normalizeTime(habit.reminder_time || habit.reminderTime),
    startDate: habit.start_date || habit.startDate || '',
    color: habit.color || 'coffee',
    targetDays: habit.target_days ?? habit.targetDays ?? 30,
    createdAt: habit.created_at || habit.createdAt,
    updatedAt: habit.updated_at || habit.updatedAt,
  }
}

export function toHabitViews(habits = []) {
  return habits.map(toHabitView).filter(Boolean)
}

export function toHabitPayload(form) {
  const goalType = form.goalType === 'time' ? 'time' : 'simple'
  const targetDurationSeconds =
    goalType === 'time'
      ? durationToSeconds(form.targetDurationValue, form.targetDurationUnit)
      : null

  const payload = {
    title: form.title,
    description: form.description || '',
    category: form.category || 'Personal',
    frequency: form.frequency || 'Daily',
    time_of_day: form.timeOfDay || 'Morning',
    goal: form.goal || '',
    goal_type: goalType,
    target_duration_seconds: targetDurationSeconds,
    timer_enabled: goalType === 'time' ? Boolean(form.timerEnabled) : false,
    reminder_time: form.reminderTime || null,
    start_date: form.startDate || null,
    mood_tag: form.moodTag || 'Calm',
    color: form.color || 'coffee',
  }

  if (form.targetDays !== '' && form.targetDays !== null && form.targetDays !== undefined) {
    payload.target_days = Number(form.targetDays)
  }

  return payload
}

export function toHabitFormValues(habit) {
  const view = toHabitView(habit)

  if (!view) {
    return {}
  }

  const durationInput = secondsToDurationInput(view.targetDurationSeconds)

  return {
    title: view.title,
    description: view.description,
    category: view.category,
    frequency: view.frequency,
    timeOfDay: view.timeOfDay,
    goal: view.goal,
    goalType: view.goalType,
    targetDurationValue: durationInput.value,
    targetDurationUnit: durationInput.unit,
    timerEnabled: view.timerEnabled,
    reminderTime: view.reminderTime,
    startDate: view.startDate,
    moodTag: view.moodTag,
    color: view.color,
    targetDays: view.targetDays,
  }
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10)
}

export function normalizeTime(value) {
  if (!value) {
    return ''
  }

  return value.slice(0, 5)
}

export function durationToSeconds(value, unit = 'minutes') {
  const amount = Number(value)

  if (!Number.isFinite(amount) || amount <= 0) {
    return null
  }

  return Math.round(amount * (unit === 'hours' ? 3600 : 60))
}

export function secondsToDurationInput(seconds = 0) {
  const totalSeconds = Number(seconds) || 0

  if (totalSeconds <= 0) {
    return {
      value: '',
      unit: 'minutes',
    }
  }

  if (totalSeconds % 3600 === 0) {
    return {
      value: String(totalSeconds / 3600),
      unit: 'hours',
    }
  }

  return {
    value: String(Math.max(1, Math.round(totalSeconds / 60))),
    unit: 'minutes',
  }
}

export function formatDuration(seconds = 0) {
  const totalSeconds = Number(seconds) || 0

  if (totalSeconds <= 0) {
    return 'No duration'
  }

  if (totalSeconds < 60) {
    return `${totalSeconds}s`
  }

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (!hours) {
    return `${minutes} min`
  }

  if (!minutes) {
    return `${hours} hr${hours === 1 ? '' : 's'}`
  }

  return `${hours} hr ${minutes} min`
}

export function formatTimerSeconds(seconds = 0) {
  const totalSeconds = Math.max(0, Number(seconds) || 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const remainingSeconds = totalSeconds % 60
  const pad = (value) => String(value).padStart(2, '0')

  if (hours) {
    return `${hours}:${pad(minutes)}:${pad(remainingSeconds)}`
  }

  return `${minutes}:${pad(remainingSeconds)}`
}

export function getGoalTypeLabel(goalType) {
  return goalType === 'time' ? 'Time-based' : 'Simple'
}

export function buildWeeklyProgress(habits = []) {
  const today = new Date()

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - index))
    const isoDate = date.toISOString().slice(0, 10)
    const completed = habits.filter((habit) =>
      habit.completionDates?.includes(isoDate),
    ).length

    return {
      date: isoDate,
      day: new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date),
      completed,
      total: habits.length,
      active: completed > 0,
    }
  })
}

export function buildCalendarDays(habits = [], monthDate = new Date()) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const mondayOffset = firstDay === 0 ? 6 : firstDay - 1
  const todayIso = getTodayDate()
  const cells = []

  for (let index = 0; index < mondayOffset; index += 1) {
    cells.push({ day: '', empty: true, habits: [] })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const isoDate = new Date(year, month, day).toISOString().slice(0, 10)
    const completedHabits = habits.filter((habit) =>
      habit.completionDates?.includes(isoDate),
    )
    const totalHabits = habits.length
    const completedCount = completedHabits.length
    const isFuture = isoDate > todayIso

    cells.push({
      day,
      date: isoDate,
      completed: totalHabits > 0 && completedCount === totalHabits,
      completionRate: totalHabits
        ? Math.round((completedCount / totalHabits) * 100)
        : 0,
      future: isFuture,
      missed: totalHabits > 0 && isoDate < todayIso && completedCount === 0,
      partial:
        totalHabits > 0 &&
        completedCount > 0 &&
        completedCount < totalHabits,
      today: isoDate === todayIso,
      habits: completedHabits,
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: '', empty: true, habits: [] })
  }

  return cells
}
