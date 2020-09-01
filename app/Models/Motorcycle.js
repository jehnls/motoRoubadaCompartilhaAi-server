'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Motorcycle extends Model {

    //Creted for locate motorcyles next the User
    static scopeNearBY(query, latitude, longitude, distance) {

        //Sintax The Haversine for navegation, trasform the amount in kilometer
        const haversine = `(6371 * acos(cos(radians(${latitude}))
        * cos(radians(latitude))
        * cos(radians(longitude)
        - radians(${longitude}))
        + sin(radians(${latitude}))
        * sin(radians(latitude))))`

        return query
            .select('*', Database.raw(`${haversine} as distance`))
            .whereRaw(`${haversine} < ${distance}`)
    }

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
