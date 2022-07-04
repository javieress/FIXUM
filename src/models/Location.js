let locationList = ['40','Sala 41','Sala 42']

module.exports = {
    list: function(){
        return locationList
    },
    post: function(req,res){
        let name = req.body['new-location-name'].toLowerCase()
        name = name.charAt(0).toUpperCase() + name.slice(1)
        const exist = locationList.includes(name)
        if (!exist){
            locationList.push(name)
        }
        return !exist
    },
    update: function(req,res){

    },
    delete: function(req,res){
        const name = req.body['asset-type-name']
        const exist = locationList.includes(name)
        if(exist){
            locationList = locationList.filter((item) =>item !== name)
        }
        return exist
    }
}