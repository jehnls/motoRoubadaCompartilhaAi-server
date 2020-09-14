'use strict'

const Image = use('App/Models/Image')
const Motorcycle = use('App/Models/Motorcycle')
const Helpers = use('Helpers')

//Craete a new image motorcyle
class ImageController {

    async store({ params, request }) {
        const motorcycle = await Motorcycle.findOrFail(params.id)

        const images = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
            name: `${Date.now()}-${file.clientName}`
        }))

        if (!images.movedAll()) {
            return images.erros()
        }

        await Promise.all(
            images
                .movedList()
                .map(image => motorcycle.images().create({ path: image.fileName }))
        )
    }

}

module.exports = ImageController
