'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Creating new users
Route.post('/users', 'UserController.create')

//Check session user
Route.post('/sessions', 'SessionController.create')

//All routes the motocycles
Route.resource('motorcycles', "MotorcycleController")
  .apiOnly()
  .middleware('auth')

//Add new image   
Route.post('motorcycles/:id/images', 'ImageController.store')
  .middleware('auth')


Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
}) 
