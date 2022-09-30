const { getAllEvents } = require('../services/MarvelApis')

async function events(req, res) {
    let allEvents = await getAllEvents()
    let response
    if (allEvents.status === 200) {
        response = {
            mensaje: "Operación exitosa",
            resultado: allEvents.data
        }
        res.send(response)
    } else {
        response = {
            mensaje: "Error al obtener dato de la API de Marvel.",
            marvelApiCode: allEvents.response.status,
            marvelApiDetalles: allEvents.response.data
        }
        res.status(allEvents.response.status).send(response)
    }



}

module.exports = { events }