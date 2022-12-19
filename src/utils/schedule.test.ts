import type { ScheduleItem } from '../types/order'
import { tasks, calculateTime, formatSeconds, createSchedule } from './schedule'

describe('createSchedule', () => {
  it('always adds a break at the end', () => {
    const schedule = createSchedule([])
    expect(schedule).not.toBeUndefined()
    expect(schedule.length).toBe(1)
    expect(schedule[0]?.task).toBe('Take a break')
  })
})

describe('calculateTime', () => {
  it('calculates the time to complete a task based on the previous task', () => {
    const scheduleItem: ScheduleItem = { time: 150, task: 'Make sandwich' }
    expect(calculateTime(scheduleItem)).toBe(150 + tasks[scheduleItem.task])
  })

  it('returns 0 if no previous task is provided', () => {
    expect(calculateTime()).toBe(0)
  })
})

describe('formatSeconds', () => {
  test.each([
    { seconds: 0, expected: '00:00' },
    { seconds: 61, expected: '01:01' },
    { seconds: 150, expected: '02:30' },
    { seconds: 720, expected: '12:00' },
  ])('formats seconds into the mm:ss format', ({ seconds, expected }) => {
    expect(formatSeconds(seconds)).toBe(expected)
  })

  test.each([
    { seconds: 0, expected: '00:00' },
    { seconds: 61, expected: '01:01' },
    { seconds: 150, expected: '02:30' },
    { seconds: 720, expected: '12:00' },
  ])('formats seconds into the mm:ss format', ({ seconds, expected }) => {
    expect(formatSeconds(seconds)).toBe(expected)
  })
})
