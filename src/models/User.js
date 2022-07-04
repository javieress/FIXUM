let userList = [
    {
        'username': 'Javier',
        'name': 'Javier',
        'lastName': 'Rojas',
        'position': 'admin',
        'userType': 'admin',
        'password': 'password'
    },
    {
        'username': 'Alexi',
        'name': 'Alexi',
        'lastName': 'Diaz',
        'position': 'admin',
        'userType': 'admin',
        'password': 'password'
    },
]

module.exports = {
    list: function () {
        return userList
    },
    post: function (req, res) {
        let username = req.body['new-user-username']

        let name = req.body['new-user-name'].toLowerCase()
        name = name.charAt(0).toUpperCase() + name.slice(1)

        let lastName = req.body['new-user-lastName'].toLowerCase()
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)

        let position = req.body['new-user-position']

        let userType = req.body['new-user-userType']

        let password = req.body['new-user-password']

        userList.push(
            {
                'username': username,
                'name': name,
                'lastName': lastName,
                'position': position,
                'userType': userType,
                'password': password
            }
        )
        console.log(userList)
        return true

    },
    get: function(username) {
        const userList = user.list()
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].username == username) {
                return userList[i]
            }           
        }
        return null
    },
    update: function (req, res) {

    },
    delete: function (req, res) {
        // const name = req.body['user-name']
        // const exist = userList.includes(name)
        // if(exist){
        //     userList = userList.filter((item) =>item !== name)
        // }
        // return exist
    }
}