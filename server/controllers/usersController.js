const { generatePasswordHash, validatePW, generateUserToken } = require('../middleware/auth')
const User = require('../models/Users')

async function createUser(req, res) {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const userName = req.body.userName
        const password = req.body.password

        const user = await User.find({userName : {$eq : userName}})

        if(user.length === 0){
            const saltRounds = 10
            const hashedPW = await generatePasswordHash(password, saltRounds)

            const newUser = new User({
                firstName,
                lastName,
                userName,
                isAdmin : false, 
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

        const isPWValid = await validatePW(password, user.password)

        if (!isPWValid) {
            res
            .json({ success: false, message: "Password was incorrect." })
            .status(204);
            return;
        }

        const userData = {
            userName : user.userName,
        }

        const token = generateUserToken(userData)
        res.json({
            success : true,
            token,
            userName, 
            isAdmin : user.isAdmin,
            userID : user._id
        })
        return


    } catch (error) {
        console.log(error)
    }
}

const addToCart = async (req, res) => {
    try{
        const { name, category, size, quantity, price, userID } = req.body
        const user = await User.findOne({_id : userID})
        let updatedCart = []
        const product = {
            productName : name, 
            category, 
            size, 
            price,
            quantity
        }


        if(user){
            updatedCart = [...user.cart, product]
        }

        const updatedUser = await User.findByIdAndUpdate(userID,
            {
                cart : updatedCart
            })


        res.send({
            success : true, 
            user : updatedUser
        })

    }catch (e) {
        res.send({
            success : false,
            message: e.toString()
        })
    }
}

const singleUser = async (req, res) => {

    const userID = req.params.userID
    console.log(userID)

    
    try {
        const user = await User.findOne({_id : userID})


        const editedUser = {
            "id" : user._id,
            "firstName" : user.firstName,
            "lastName" : user.lastName,
            "isAdmin" : user.isAdmin,
            "subscriptionList" : user.subscriptionList,
            "cart" : user.cart
        }
        res.send({
            success : true,
            user : editedUser
        })
        


        
    } catch (error) {
        res.send({
            success : false,
            error : error.toString()
        })
    }

}

module.exports = {
    createUser,
    login, 
    addToCart, 
    singleUser
}