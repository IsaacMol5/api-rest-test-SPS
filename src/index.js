const express = require('express')
const morgan = require('morgan')
const { busqueda } = require('./logic/MarvelBusqueda')
const { events } = require('./logic/MarvelEvents')
const servidor = express()

// Settings 
servidor.set('json spaces', 2)

// Middleware
servidor.use(morgan('dev'))
servidor.use(express.json())

// Routes
servidor.get('/', (req, res) => {
    console.log(req)
    res.send({ "mensaje": "Hola mundo con NodeJS. API en línea." })
})

servidor.get('/api/marvel/events', (req, res) => {
     events(req, res)
})

servidor.post('/api/marvel/busqueda', (req, res) => {
    busqueda(req, res)
})

servidor.listen(3500, () => { console.log("Server disponible en puerto 3500") })