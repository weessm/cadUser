const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const User = require('../models/User')
const { existsOrError } = require('./ValidatorController')

class PasswordController {

    async forgotPassword(req, res) {
        const email = req.body.email

        try {
            const user = await User.findByEmail(email)
            if (existsOrError(user)) return res.status(400).json({ msg: 'não foi possível encontrar um usuário com esse email' })

            let editData = {}

            editData.token = uuidv4()
            editData.expiresToken = new Date()
            editData.expiresToken.setHours(editData.expiresToken.getHours() + 1)
            editData.usedToken = 0
            editData.updatedAt = new Date()

            const createdToken = await User.createPasswordToken(email, editData)
            return res.status(200).json({ msg: 'novo token criado válido por 1 (uma) hora', createdToken })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
        }
    }

    async changePassword(req, res) {
        let { senha, confirmaSenha } = req.body
        const token = req.params.token

        if (existsOrError(token)) return res.status(400).json({ msg: 'utilize um token válido' })

        try {
            const user = await User.findByToken(token)
            if (existsOrError(user)) return res.status(400).json({ msg: 'usuário não encontrado' })

            if(user.usedToken) return res.status(400).json({msg: 'este token já foi utilizado, para redefinir sua senha novamente refaça o processo de recuperação'})
            if (user.expiresToken < new Date()) return res.status(400).json({ msg: 'seu token expirou' })

            if (existsOrError(senha) || senha.length < 4) return res.status(400).json({ msg: 'senha deve ter 4 ou mais caracteres' })
            if (existsOrError(confirmaSenha) || confirmaSenha.length < 4) return res.status(400).json({ msg: 'confirmação de senha deve ter 4 ou mais caracteres' })
            if (senha != confirmaSenha) return res.status(400).json({ msg: 'senhas não conferem' })

            senha = bcrypt.hashSync(senha, bcrypt.genSaltSync(12))

            const updatedPassword = await User.updatePassword(senha, token)
            return res.status(200).json({ msg: 'senha redefinida', updatedPassword })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
        }
    }

}

module.exports = new PasswordController()