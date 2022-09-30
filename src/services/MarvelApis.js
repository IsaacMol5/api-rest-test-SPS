const axios = require("axios")
const crypto = require("crypto")
const { marvelConfigs } = require("../config/MarvelCredentials")

async function search(publicKey, searchType) {
    // Obtenemos el HASH MD5 del timestap y las llaves de seguridad para pder acceder a la API de Marvel
    const ts = 5000
    const keysTs = ts + marvelConfigs.keys.privateKey + publicKey
    const hashMd5 =  crypto.createHash('md5').update(keysTs).digest("hex")

    // Se configura en la variable "options" con los parametros necesarios para realizar el reques, por ejemplo, headers, body, url, etc
    const options = {
        method: 'get',
        url: `https://gateway.marvel.com/v1/public/${searchType}?apikey=${marvelConfigs.keys.publicKey}&ts=${ts}&hash=${hashMd5}`,
        headrs: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    let responseService
    //Se ealiza petición en AXIOS
    await axios
        .request(options)
        .then((response) => {
            console.log('Petición a API Marvel exitosa')
            responseService = response
        })
        .catch((error) => {
            console.warn('Error en petición a API Marvel')
            responseService = error
        })

    return responseService
}

async function getAllEvents() {
    // Obtenemos el HASH MD5 del timestap y las llaves de seguridad para pder acceder a la API de Marvel
    const ts = 5000
    const keysTs = ts + marvelConfigs.keys.privateKey + marvelConfigs.keys.publicKey
    const hashMd5 = crypto.createHash('md5').update(keysTs).digest("hex")

    // Se configura en la variable "options" con los parametros necesarios para realizar el reques, por ejemplo, headers, body, url, etc
    const options = {
        method: 'get',
        url: `https://gateway.marvel.com/v1/public/events?apikey=${marvelConfigs.keys.publicKey}&ts=${ts}&hash=${hashMd5}`,
        headrs: {
            'Content-Type': 'application/json',
        }
    }

    let responseService
    //Se realiza petición en AXIOS
    await axios
        .request(options)
        .then((response) => {
            console.log('Petición a API Marvel exitosa')
            responseService = response
        })
        .catch((error) => {
            console.warn('Error en petición a API Marvel')
            responseService = error
        })

    return responseService
}

module.exports = { getAllEvents, search }