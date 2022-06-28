let assetTypeList = ['Libro','Mobiliario','Electrónico']

module.exports = {
    list: function(){
        return assetTypeList
    },
    post: function(req,res){
        let name = req.body['new-asset-type-name'].toLowerCase()
        name = name.charAt(0).toUpperCase() + name.slice(1)
        const exist = assetTypeList.includes(name)
        if (!exist){
            assetTypeList.push(name)
        }
        return !exist
    },
    update: function(req,res){

    },
    delete: function(req,res){
        const name = req.body['asset-type-name']
        const exist = assetTypeList.includes(name)
        if(exist){
            assetTypeList = assetTypeList.filter((item) =>item !== name)
        }
        return exist
    }
}