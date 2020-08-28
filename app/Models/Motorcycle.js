'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Motorcycle extends Model {

    //Creted relation "1-1", a motorcyle to an user
    user() {
        return this.belongsTo('App/Models/User')
    }

    //Creted relation n-1, many images to a motorcycle
    images() {
        return this.hasMany('App/Models/Image')
    }

}

module.exports = Motorcycle
