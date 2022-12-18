import type { Order, ScheduleItem, TaskExecution } from '../types/order'

/* Defining the tasks that can be performed and the time it takes to perform them. */
export const tasks: TaskExecution = {
  'Make sandwich': 150,
  'Serve sandwich': 60,
  'Take a break': 0,
}

/**
 * Create schedule items from a list of orders, by adding the tasks to complete
 * the order to the schedule.
 * @param {Order[]} orders - Order array.
 * @returns An array of scheduled items.
 */
export function createSchedule(orders: Order[]): ScheduleItem[] {
  const schedule = orders.reduce<ScheduleItem[]>((acc, order) => {
    const { recipient } = order

    acc.push({
      time: calculateTime(acc[acc.length - 1]),
      recipient,
      task: 'Make sandwich',
    })

    acc.push({
      time: calculateTime(acc[acc.length - 1]),
      recipient,
      task: 'Serve sandwich',
    })

    return acc
  }, [])

  schedule.push({
    time: calculateTime(schedule[schedule.length - 1]),
    task: 'Take a break',
  })

  return schedule
}

/**
 * It takes an array of schedule items, and returns the time of the last item in the array, plus the
 * time it takes to complete the task
 * @param {ScheduleItem} schedule - ScheduleItem array.
 * @returns The time it takes to complete the schedule
 */
function calculateTime(scheduleItem?: ScheduleItem) {
  if (!scheduleItem) {
    return 0
  }

  return scheduleItem.time + tasks[scheduleItem.task]
}

/**
 * Formats a number of seconds into the mm:ss format.
 * @param seconds - The number of seconds to format.
 * @returns A string in the mm:ss format.
 */
export function formatSeconds(seconds: number): string {
  // Calculate the number of minutes and seconds and format it with
  // padStart to ensure that it always has two digits.
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const formattedSeconds = (seconds % 60).toString().padStart(2, '0')

  return `${minutes}:${formattedSeconds}`
}
