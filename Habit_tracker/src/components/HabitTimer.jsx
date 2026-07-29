import { useEffect, useMemo, useState } from 'react'
import {
  FiCheckCircle,
  FiFlag,
  FiPause,
  FiPlay,
  FiRotateCcw,
} from 'react-icons/fi'
import { formatDuration, formatTimerSeconds } from '../utils/habitTransforms'
import { getHabitTimerStorageKey } from '../utils/timerStorage'

function getBaseTimer(targetDurationSeconds = 0) {
  return {
    lastUpdatedAt: null,
    remainingSeconds: Number(targetDurationSeconds) || 0,
    status: 'idle',
    targetDurationSeconds: Number(targetDurationSeconds) || 0,
  }
}

function restoreTimer(habit) {
  const targetDurationSeconds = Number(habit?.targetDurationSeconds) || 0
  const baseTimer = getBaseTimer(targetDurationSeconds)

  if (!habit?.id || habit.completedToday || !targetDurationSeconds) {
    return baseTimer
  }

  try {
    const savedTimer = JSON.parse(
      localStorage.getItem(getHabitTimerStorageKey(habit.id)),
    )

    if (
      !savedTimer ||
      Number(savedTimer.targetDurationSeconds) !== targetDurationSeconds
    ) {
      return baseTimer
    }

    let remainingSeconds = Number(savedTimer.remainingSeconds) || 0
    let status = savedTimer.status || 'idle'

    if (status === 'running' && savedTimer.lastUpdatedAt) {
      const elapsedSeconds = Math.floor(
        (Date.now() - Number(savedTimer.lastUpdatedAt)) / 1000,
      )
      remainingSeconds = Math.max(0, remainingSeconds - elapsedSeconds)

      if (remainingSeconds <= 0) {
        status = 'finished'
      }
    }

    return {
      lastUpdatedAt: status === 'running' ? Date.now() : null,
      remainingSeconds,
      status,
      targetDurationSeconds,
    }
  } catch {
    return baseTimer
  }
}

function HabitTimer({ compact = false, habit, onComplete, onNotice }) {
  const [timer, setTimer] = useState(() => restoreTimer(habit))
  const [isCompleting, setIsCompleting] = useState(false)
  const [error, setError] = useState('')
  const targetDurationSeconds = Number(habit?.targetDurationSeconds) || 0

  useEffect(() => {
    if (!habit?.id) {
      return
    }

    const storageKey = getHabitTimerStorageKey(habit.id)

    if (
      habit.completedToday ||
      (timer.status === 'idle' &&
        timer.remainingSeconds === timer.targetDurationSeconds)
    ) {
      localStorage.removeItem(storageKey)
      return
    }

    localStorage.setItem(storageKey, JSON.stringify(timer))
  }, [habit?.completedToday, habit?.id, timer])

  useEffect(() => {
    if (timer.status !== 'running') {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setTimer((currentTimer) => {
        if (currentTimer.status !== 'running') {
          return currentTimer
        }

        const elapsedSeconds = Math.max(
          1,
          Math.floor(
            (Date.now() - Number(currentTimer.lastUpdatedAt || Date.now())) /
              1000,
          ),
        )
        const remainingSeconds = Math.max(
          0,
          currentTimer.remainingSeconds - elapsedSeconds,
        )

        return {
          ...currentTimer,
          lastUpdatedAt: Date.now(),
          remainingSeconds,
          status: remainingSeconds <= 0 ? 'finished' : 'running',
        }
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [timer.status])

  const progress = useMemo(() => {
    if (!timer.targetDurationSeconds) {
      return 0
    }

    return Math.min(
      100,
      Math.round(
        ((timer.targetDurationSeconds - timer.remainingSeconds) /
          timer.targetDurationSeconds) *
          100,
      ),
    )
  }, [timer.remainingSeconds, timer.targetDurationSeconds])

  if (!habit || !targetDurationSeconds) {
    return null
  }

  if (habit.completedToday) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
        <FiCheckCircle />
        Completed Today
      </div>
    )
  }

  function startTimer() {
    setError('')
    setTimer({
      ...getBaseTimer(targetDurationSeconds),
      lastUpdatedAt: Date.now(),
      status: 'running',
    })
    onNotice?.(`${habit.title} timer started.`)
  }

  function pauseTimer() {
    setTimer((currentTimer) => ({
      ...currentTimer,
      lastUpdatedAt: null,
      status: 'paused',
    }))
  }

  function resumeTimer() {
    setError('')
    setTimer((currentTimer) => ({
      ...currentTimer,
      lastUpdatedAt: Date.now(),
      status: 'running',
    }))
  }

  function resetTimer() {
    setError('')
    localStorage.removeItem(getHabitTimerStorageKey(habit.id))
    setTimer(getBaseTimer(targetDurationSeconds))
  }

  function finishTimer() {
    setTimer((currentTimer) => ({
      ...currentTimer,
      lastUpdatedAt: null,
      remainingSeconds: 0,
      status: 'finished',
    }))
  }

  async function markCompleted() {
    if (!onComplete) {
      return
    }

    setIsCompleting(true)
    setError('')

    try {
      await onComplete(habit.id)
      localStorage.removeItem(getHabitTimerStorageKey(habit.id))
      setTimer(getBaseTimer(targetDurationSeconds))
      onNotice?.(`${habit.title} completed for today.`)
    } catch {
      setError('Could not mark this habit complete yet.')
    } finally {
      setIsCompleting(false)
    }
  }

  const timeLabel =
    timer.status === 'idle'
      ? formatDuration(targetDurationSeconds)
      : formatTimerSeconds(timer.remainingSeconds)
  const helperLabel =
    {
      idle: 'ready to start',
      running: 'remaining',
      paused: 'paused',
      finished: 'timer finished',
    }[timer.status] || 'ready'

  return (
    <div
      className={`rounded-[1rem] border border-stone-200/70 bg-white/70 ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
            Timer
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-2xl font-semibold tabular-nums text-stone-950">
              {timeLabel}
            </p>
            <span className="text-sm text-stone-500">{helperLabel}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {timer.status === 'idle' ? (
            <TimerButton icon={FiPlay} label="Start Timer" onClick={startTimer} />
          ) : null}

          {timer.status === 'running' ? (
            <>
              <TimerButton icon={FiPause} label="Pause" onClick={pauseTimer} />
              <TimerButton icon={FiFlag} label="Finish" onClick={finishTimer} />
              <TimerButton
                icon={FiRotateCcw}
                label="Reset"
                onClick={resetTimer}
                tone="quiet"
              />
            </>
          ) : null}

          {timer.status === 'paused' ? (
            <>
              <TimerButton icon={FiPlay} label="Resume" onClick={resumeTimer} />
              <TimerButton icon={FiFlag} label="Finish" onClick={finishTimer} />
              <TimerButton
                icon={FiRotateCcw}
                label="Reset"
                onClick={resetTimer}
                tone="quiet"
              />
            </>
          ) : null}

          {timer.status === 'finished' ? (
            <>
              <TimerButton
                disabled={isCompleting}
                icon={FiCheckCircle}
                label={isCompleting ? 'Saving...' : 'Mark Completed'}
                onClick={markCompleted}
              />
              <TimerButton
                icon={FiRotateCcw}
                label="Reset"
                onClick={resetTimer}
                tone="quiet"
              />
            </>
          ) : null}
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            timer.status === 'finished' ? 'bg-emerald-500' : 'bg-[#8a5637]'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {error ? (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function TimerButton({ disabled = false, icon: Icon, label, onClick, tone }) {
  const className =
    tone === 'quiet'
      ? 'border border-stone-200/80 bg-white/75 text-stone-700 hover:border-stone-300 hover:bg-white'
      : 'bg-[#8a5637] text-white shadow-sm shadow-[#8a5637]/20 hover:bg-[#744326]'

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#8a5637]/25 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500 disabled:shadow-none ${className}`}
    >
      <Icon />
      {label}
    </button>
  )
}

export default HabitTimer
