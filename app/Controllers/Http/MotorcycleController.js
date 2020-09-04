'use strict'
// Istantiate the object motorcycle to use in CRUD
const Motorcycle = use('App/Models/Motorcycle')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with motorcycles
 */
class MotorcycleController {
  /**
   * Show a list of all motorcycles.
   * GET motorcycles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    //This scope is find the motorcycles next of 10 km
    const { latitude, longitude } = request.all()

    const motorcycles = Motorcycle.query()
      .nearBy(latitude, longitude, 10)
      .fetch()

    return motorcycles
  }



  /**
   * Create/save a new motorcycle.
   * POST motorcycles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'model',
      'plate',
      'characteristic',
      'description_theft',
      'location_theft',
      'reward',
      'latitude',
      'longitude',
    ])

    const motorcycle = await Motorcycle.create({ ...data, user_id: id })

    return motorcycle
  }

  /**
   * Display a single motorcycle.
   * GET motorcycles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {

    const motorcycle = await Motorcycle.findOrFail(params.id)

    await motorcycle.load('images')

    return motorcycle
  }


  /**
   * Update motorcycle details.
   * PUT or PATCH motorcycles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a motorcycle with id.
   * DELETE motorcycles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const motorcycle = await Motorcycle.findOfFail(params.id)

    if (motorcycle.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorizes' })
    }

    await motorcycle.delete()

  }
}

module.exports = MotorcycleController
