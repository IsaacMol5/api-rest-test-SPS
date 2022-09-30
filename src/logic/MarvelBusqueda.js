const { search } = require("../services/MarvelApis")

async function busqueda(req, res) {
    const body = req.body
    let searchRes = await search(body.publicKey, body.tipo)
    let response
    if (searchRes.status === 200) {
        response = {
            mensaje: "Operación exitosa",
            resultado: searchRes.data
        }
        res.send(response)
    } else {
        response = {
            mensaje: "Error al obtener dato de la API de Marvel.",
            marvelApiCode: searchRes.response.status,
            marvelApiDetalles: searchRes.response.data
        }
        res.status(searchRes.response.status).send(response)
    }



}

module.exports = { busqueda }