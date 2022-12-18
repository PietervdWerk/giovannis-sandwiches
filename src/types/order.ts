/**
 * An order at the online store.
 * @property {string} recipient - The Name of the recipient.
 * @property {string} createdAt - The date and time the order was created.
 */
export type Order = {
  recipient: string
  createdAt: string
}

export type Task = 'Make sandwich' | 'Serve sandwich' | 'Take a break'

/**
 * TaskExecution is an object that has keys that has all the tasks as keys
 * and a number representing the time to complete the task.
 * @property {number} [: number] - The time in seconds to complete the task.
 */
export type TaskExecution = {
  [key in Task]: number
}

/**
 * All information on a specific task on the schedule.
 * @property {number} time - The time in seconds to complete the task.
 * @property {string} recipient - The name of the recipient of the order.
 * @property {Task} task - The task to be completed.
 */
export type ScheduleItem = {
  time: number
  recipient?: string
  task: Task
}
