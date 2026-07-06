export const userProfile = {
  firstName: 'William',
  lastName: 'Gathii',
  username: 'williamg',
  email: 'william@example.com',
  joinedDate: 'March 12, 2026',
  initials: 'WG',
  bestStreak: 21,
  totalCompletions: 148,
  weeklyConsistency: 82,
}

export const categories = [
  'All',
  'Health',
  'Study',
  'Fitness',
  'Mind',
  'Productivity',
  'Personal',
]

export const moodOptions = ['Focused', 'Tired', 'Motivated', 'Calm', 'Reset']

export const habits = [
  {
    id: 1,
    title: 'Morning Walk',
    description: 'A quiet walk before the day starts. No pressure, just motion.',
    category: 'Health',
    frequency: 'Daily',
    currentStreak: 8,
    bestStreak: 18,
    completedToday: true,
    completionRate: 86,
    moodTag: 'Calm',
    timeOfDay: 'Morning',
    goal: '20 minutes',
    reminderTime: '7:00 AM',
    startDate: '2026-06-01',
    color: 'sage',
  },
  {
    id: 2,
    title: 'Study Session',
    description: 'Review SWE notes and write one small summary.',
    category: 'Study',
    frequency: 'Weekdays',
    currentStreak: 5,
    bestStreak: 12,
    completedToday: false,
    completionRate: 74,
    moodTag: 'Focused',
    timeOfDay: 'Afternoon',
    goal: '45 minutes',
    reminderTime: '3:30 PM',
    startDate: '2026-06-10',
    color: 'coffee',
  },
  {
    id: 3,
    title: 'Stretch Reset',
    description: 'Stretch your back, neck, and wrists after long screen time.',
    category: 'Fitness',
    frequency: 'Daily',
    currentStreak: 11,
    bestStreak: 21,
    completedToday: true,
    completionRate: 91,
    moodTag: 'Reset',
    timeOfDay: 'Evening',
    goal: '10 minutes',
    reminderTime: '8:15 PM',
    startDate: '2026-05-20',
    color: 'amber',
  },
  {
    id: 4,
    title: 'Read Before Sleep',
    description: 'A few pages, soft light, phone away.',
    category: 'Mind',
    frequency: 'Daily',
    currentStreak: 3,
    bestStreak: 9,
    completedToday: false,
    completionRate: 62,
    moodTag: 'Calm',
    timeOfDay: 'Night',
    goal: '12 pages',
    reminderTime: '9:45 PM',
    startDate: '2026-06-18',
    color: 'sand',
  },
  {
    id: 5,
    title: 'Plan Tomorrow',
    description: 'Pick three priorities and leave the day with less noise.',
    category: 'Productivity',
    frequency: 'Daily',
    currentStreak: 6,
    bestStreak: 15,
    completedToday: true,
    completionRate: 79,
    moodTag: 'Productive',
    timeOfDay: 'Evening',
    goal: '3 priorities',
    reminderTime: '6:30 PM',
    startDate: '2026-06-05',
    color: 'clay',
  },
  {
    id: 6,
    title: 'Call Home',
    description: 'Check in, listen properly, stay connected.',
    category: 'Personal',
    frequency: 'Twice weekly',
    currentStreak: 2,
    bestStreak: 7,
    completedToday: false,
    completionRate: 68,
    moodTag: 'Warm',
    timeOfDay: 'Weekend',
    goal: '15 minutes',
    reminderTime: '5:00 PM',
    startDate: '2026-06-22',
    color: 'rose',
  },
]

export const weeklyProgress = [
  { day: 'Mon', completed: 5, total: 6, active: true },
  { day: 'Tue', completed: 4, total: 6, active: true },
  { day: 'Wed', completed: 6, total: 6, active: true },
  { day: 'Thu', completed: 3, total: 6, active: true },
  { day: 'Fri', completed: 5, total: 6, active: true },
  { day: 'Sat', completed: 2, total: 4, active: false },
  { day: 'Sun', completed: 0, total: 4, active: false },
]

export const categoryBreakdown = [
  { category: 'Health', value: 86 },
  { category: 'Study', value: 74 },
  { category: 'Fitness', value: 91 },
  { category: 'Mind', value: 62 },
  { category: 'Productivity', value: 79 },
  { category: 'Personal', value: 68 },
]

export const achievements = [
  {
    id: 1,
    title: 'First Step',
    description: 'Created your first habit.',
    icon: '✦',
    earned: true,
  },
  {
    id: 2,
    title: '7 Day Flow',
    description: 'Kept a habit alive for one full week.',
    icon: '7',
    earned: true,
  },
  {
    id: 3,
    title: 'Morning Starter',
    description: 'Completed five morning habits.',
    icon: '☼',
    earned: true,
  },
  {
    id: 4,
    title: 'Comeback Day',
    description: 'Returned after missing a day.',
    icon: '↺',
    earned: false,
  },
  {
    id: 5,
    title: 'Consistency King',
    description: 'Reach a 30-day streak.',
    icon: '♛',
    earned: false,
  },
  {
    id: 6,
    title: 'Quiet Discipline',
    description: 'Complete 100 habits without breaking rhythm.',
    icon: '◇',
    earned: false,
  },
]

export const calendarDays = Array.from({ length: 35 }, (_, index) => {
  const day = index + 1
  const completed = [1, 2, 4, 5, 7, 8, 9, 11, 12, 15, 16, 18, 21, 22, 23, 25].includes(day)
  const missed = [3, 10, 17, 24].includes(day)
  const today = day === 6

  return {
    day,
    completed,
    missed,
    today,
    habits: completed
      ? habits.filter((habit) => (habit.id + day) % 2 === 0).slice(0, 3)
      : [],
  }
})

export const dashboardSummary = {
  habitsToday: 6,
  completed: habits.filter((habit) => habit.completedToday).length,
  currentStreak: 11,
  weeklyConsistency: 82,
  todaysVibe: 'Calm',
}
