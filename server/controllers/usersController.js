const { generatePasswordHash, validatePW, generateUserToken } = require('../middleware/auth')
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

const login = async (req, res) => {
    try {

        const userName = req.body.userName;
        const password = req.body.password;
        const user = await User.findOne({userName : userName})

        if(!user){
            res.json({
                success : false,
                message : 'Could not find user'
            }).status(204)
        }

        const firstName = user.firstName
        const lastName = user.lastName

        const isPWValid = await validatePW(password, user.password)

        if (!isPWValid) {
            res
            .json({ success: false, message: "Password was incorrect." })
            .status(204);
            return;
        }

        const userData = {
            date : new Date(),
            userName : user.userName,
            userFirstName: firstName,
            userLastName: lastName
        }

        const token = generateUserToken(userData)
        res.json({
            success : true,
            token : token
        })


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser,
    login
}