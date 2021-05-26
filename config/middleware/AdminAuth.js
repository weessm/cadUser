const jwt = require('jsonwebtoken')
const { existsOrError } = require('../../src/controllers/ValidatorController')
require('dotenv').config()
const secret = process.env.SECRET

module.exports = (req, res, next) => {
    const authToken = req.headers['authorization']

    if (existsOrError(authToken)) return res.status(401).json({ msg: 'você não está autenticado' })
    const token = authToken.split(' ')[1]

    try {
        const decoded = jwt.verify(token, secret)
        if(decoded.role == 1){
            next()
        }else return res.status(403).json({msg: 'você não tem permissão para realizar esta ação'})
    } catch (err) {
        console.log(err)
        return res.status(401).json({msg: 'você não está autenticado'})
    }
}