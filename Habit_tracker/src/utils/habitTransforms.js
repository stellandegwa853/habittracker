export function toHabitView(habit) {
  if (!habit) {
    return null
  }

  return {
    id: habit.id,
    title: habit.title || '',
    description: habit.description || '',
    category: habit.category || 'Personal',
    frequency: habit.frequency || 'Daily',
    currentStreak: habit.current_streak ?? 0,
    bestStreak: habit.best_streak ?? 0,
    completedToday: Boolean(habit.completed_today),
    completionRate: Math.round(Number(habit.completion_rate || 0)),
    completionCount: habit.completion_count ?? 0,
    completionDates: habit.completion_dates || [],
    moodTag: habit.mood_tag || 'Calm',
    timeOfDay: habit.time_of_day || 'Morning',
    goal: habit.goal || '',
    reminderTime: normalizeTime(habit.reminder_time),
    startDate: habit.start_date || '',
    color: habit.color || 'coffee',
    targetDays: habit.target_days || 30,
    createdAt: habit.created_at,
    updatedAt: habit.updated_at,
  }
}

export function toHabitViews(habits = []) {
  return habits.map(toHabitView).filter(Boolean)
}

export function toHabitPayload(form) {
  return {
    title: form.title,
    description: form.description || '',
    category: form.category || 'Personal',
    frequency: form.frequency || 'Daily',
    time_of_day: form.timeOfDay || 'Morning',
    goal: form.goal || '',
    reminder_time: form.reminderTime || null,
    start_date: form.startDate || null,
    mood_tag: form.moodTag || 'Calm',
    color: form.color || 'coffee',
    target_days: Number(form.targetDays || 30),
  }
}

export function toHabitFormValues(habit) {
  const view = toHabitView(habit)

  if (!view) {
    return {}
  }

  return {
    title: view.title,
    description: view.description,
    category: view.category,
    frequency: view.frequency,
    timeOfDay: view.timeOfDay,
    goal: view.goal,
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

    cells.push({
      day,
      date: isoDate,
      completed: completedHabits.length > 0,
      missed: isoDate < todayIso && completedHabits.length === 0,
      today: isoDate === todayIso,
      habits: completedHabits,
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: '', empty: true, habits: [] })
  }

  return cells
}
