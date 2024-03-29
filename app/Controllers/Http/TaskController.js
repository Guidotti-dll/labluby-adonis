'use strict'

const Task = use('App/Models/Task')
/** s
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   */
  async index ({ params }) {
    const tasks = await Task
      .query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()
    return tasks
  }

  /**
   * Create/save a new task.
   * POST tasks
   */
  async store ({ request, params }) {
    const data = request.only(['user_id', 'title', 'description', 'due_date', 'file_id'])

    const task = Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  /**
   * Display a single task.
   * GET tasks/:id
   */
  async show ({ params }) {
    const task = await Task.findOrFail(params.id)

    return task
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   */
  async update ({ params, request }) {
    const task = await Task.findOrFail(params.id)
    const data = request.only(['user_id', 'title', 'description', 'due_date', 'file_id'])

    task.merge(data)
    await task.save()
    return task
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   */
  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
  }
}

module.exports = TaskController
