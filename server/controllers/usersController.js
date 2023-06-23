const { generatePasswordHash } = require('../middleware/auth')
const User = require('../models/Users')

async function createUser(req, res) {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const userName = req.body.lastName
        const password = req.body.password

        const user = await User.find({userName : {$eq : userName}})

        if(user.length === 0){
            const saltRounds = 10
            const hashedPW = await generatePasswordHash(password, saltRounds)

            const newUser = new User({
                firstName,
                lastName,
                userName,
                isAdmin : true, 
                password : hashedPW
            })

            const savedData = await newUser.save()
            res.json({
                success : true,
                user : savedData
            })
        }

        res.json({
            success : false,
            message : 'User already exists!'
        })
    }
    catch (e) {
        console.log(e)
    }
}


module.exports = {
    createUser
}