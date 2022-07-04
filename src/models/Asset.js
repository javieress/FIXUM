let assetList = [
    {
        'id': 'A1',
        'name': 'Computador Lenovo',
        'assetType': 'Electrónico',
        'location': '40',
        'userInCharge': 'Javier',
        'description': 'Computador Lenovo xyz, comprado el 2020'
    },
    {
        'id': 'A2',
        'name': 'Escritorio verde',
        'assetType': 'Mobiliario',
        'location': 'Sala 41',
        'userInCharge': 'Javier',
        'description': 'Escritorio con la pata coja'
    },
    {
        'id': 'A3',
        'name': 'Don Quijote de la Mancha',
        'assetType': 'Libro',
        'location': 'Sala 42',
        'userInCharge': 'Alexi',
        'description': 'Libro fabricado el año 1900, le faltan 3 hojas'
    }]

let id = 4

module.exports = {
    list: function () {
        return assetList
    },
    post: function (req, res) {
        const name = req.body['new-asset-name']
        const assetType = req.body['new-asset-assetType']
        const location = req.body['new-asset-location']
        const userInCharge = req.body['new-asset-userInCharge']
        const description = req.body['new-asset-description']

        assetList.push({
            'id': 'A'+ id,
            'name': name,
            'assetType': assetType,
            'location': location,
            'userInCharge': userInCharge,
            'description': description
        })
        id++
        console.log(assetList)

    },
    update: function (req, res) {

    },
    delete: function (req, res) {
        const name = req.body['asset-name']
        const exist = assetList.includes(name)
        if (exist) {
            assetList = assetList.filter((item) => item !== name)
        }
        return exist
    },
    last10Added: function(){
        if (assetList.length > 10){
            return assetList.slice(-10,assetList.length)
        }
        else {
            return assetList
        }
    },
    get: function(req,res){
        const {id} = req.params
        console.log(id)
        for (let i = 0; i < assetList.length; i++) {
            if(assetList[i].id == id){
                return assetList[i]
            }
        }
        return null
    }
}