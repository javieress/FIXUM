const location = require('../models/Location')
const auth = require('../middlewares/authJwt')



function validationLocationName(req, res) {
    if (req.body['new-location-name'].length <= 50 && req.body['new-location-name'].length >= 0) {
        return true
    }
    return false
}


module.exports = {
    index: function (req, res) {
        res.render('./register/location-register.ejs', { title: ' | Ubicaciones', message: '' })
    },
    list: async function () {
        return await location.list()
    },
    post: async function (req, res) {
        try {
            let message = ''
            if (validationLocationName(req, res)) {
                if (location.post(req, res)) {
                    message += 'La ubicación se guardó con éxito'
                }
                else {
                    message += 'Ocurrio un error'
                }

            } else {
                message += "Maximo de caracteres superado"
            }
            res.render('./register/location-register.ejs', { title: ' | Registro de Ubicación', message: message ,navBar: await auth.navigationBar(req)})
        } catch (error) {
            console.log(error)
            res.redirect('/error')
        }

    },
    update: async function (req, res) {
        let message= ''
        try {
            if (validationLocationName(req, res)) {
                const updated = await location.update(req, res)
                if (updated) {
                    message = 'La ubicación se actualizó con éxito'
                    res.render('./register/location-edit.ejs',{title: ' | Editar Ubicación', location: await location.get(req,res),message: message, navBar: await auth.navigationBar(req)})
                }
                else {
                    const locationUpdated =
                        [
                            {
                                dataValues:
                                {
                                    id: req.body['new-location-id'],
                                    locations: ''
                                }
                            }]
                    res.render('./register/location-edit.ejs', { title: ' | Editar Ubicación', location: locationUpdated, message: 'Error no se pudo hacer la modificacion' ,navBar: await auth.navigationBar(req)})

                }
            }
            else {
                const locationUpdated = [{
                    dataValues: {
                        id: req.body['new-location-id'],
                        locations: ''
                    }
                }]
                res.render('./register/location-edit.ejs', { title: ' | Editar Ubicación', location: locationUpdated, message: 'Texto ingresado supera el máximo de caracteres' ,navBar: await auth.navigationBar(req)})
            }
        } catch (error) {
            console.log(error)
            res.redirect('/error')
        }

    },
    delete: async function (req, res) {
        try {
            const deleted = await location.delete(req, res)
            if (deleted) {
                res.redirect('/edit/location')
            } else {
                res.redirect('/edit/location')

            }
        } catch (error) {
            console.log(error)
            res.redirect('/error')

        }


    },
    get: async function (req, res) {
        try {
            return await location.get(req, res)

        } catch (error) {
            console.log(error)
            res.redirect('/error')

        }
    }
}