const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecretKey = process.env.JWT_SECRET_KEY

const generatePasswordHash = async (password, saltRounds) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const generateUserToken = (userData) => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60

    const payload = {
        userData, 
        exp : exp
    }

    const jwt_key = jwtSecretKey
    const token = jwt.sign(payload, jwt_key)
    return token
}

const validatePW = async (password, hashedPassword) => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
}

module.exports = {
    generatePasswordHash,
    generateUserToken, 
    validatePW
}