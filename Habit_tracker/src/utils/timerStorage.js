const TIMER_STORAGE_PREFIX = 'vibecheck_timer_'

export function getHabitTimerStorageKey(habitId) {
  return `${TIMER_STORAGE_PREFIX}${habitId}`
}
