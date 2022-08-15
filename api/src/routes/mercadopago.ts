import { Router } from 'express'
// const { Country, Activity, cache } = require('../db');

import mp from 'mercadopago'
const mercadopagoRoute = Router()

mp.configure({ // cuenta produccion acces token test 1 (TETE8284659    qatest1769)
  access_token: 'APP_USR-6913287203050942-081213-9ae4b41c5f23db785ed7c59bdbb34d5e-1178359030' // PROD_ACCESS_TOKEN
})

mercadopagoRoute.post('/checkout', (req: any, res: any) => {
  const preference = {
    items: [ // pueden ser varios items
      {
        title: req.body.title,
        unit_price: parseInt(req.body.price), // le llega como string
        quantity: 1
      }
    ]
  }
  mp.preferences
    .create(preference)
    .then(function (response) { // espacio para trabajar con la respuesta de MP por la compra del producto
      return res.redirect(response.body.init_point)
    })
    .catch(function (error) {
      console.log(error)
    })
})

export default mercadopagoRoute
