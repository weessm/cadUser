const bcrypt = require('bcrypt')
const User = require("../models/User")
const { existsOrError, validateEmail, validateID } = require("./ValidatorController")

class UserController {

    async index(req, res) {
        try {
            const users = await User.findAll()
            return res.status(200).json(users)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
        }
    }

    async findUserById(req, res) {
        const id = req.params.id
        if (validateID(id)) return res.status(400).json({ msg: 'este usuário não existe' })

        try {
            const user = await User.findById(id)
            if (existsOrError(user)) return res.status(400).json({ msg: 'usuário não encontrado' })

            return res.status(200).json(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
        }

    }

    async create(req, res) {
        let { nome, email, senha } = req.body

        if (validateEmail(email) == false) return res.status(400).json({ msg: 'digite um email válido' })
        if (existsOrError(nome) || nome.trim().length < 2) return res.status(400).json({ msg: 'nome deve ter 2 ou mais caracteres' })
        if (existsOrError(senha) || senha.length < 4) return res.status(400).json({ msg: 'senha deve ter 4 ou mais caracteres' })

        try {
            const emailExists = await User.findEmail(email)
            if (emailExists) return res.status(400).json({ msg: 'este email já está cadastrado' })

            senha = bcrypt.hashSync(senha, bcrypt.genSaltSync(12))
            await User.add(nome, email, senha)
            return res.status(200).json({ msg: 'novo usuário criado' })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
        }
    }

    async editUser(req, res) {
        let { nome, email, role } = req.body
        const id = req.params.id
        let editData = {}
        let flagEditEmail

        if (validateID(id)) return res.status(400).json({ msg: 'este usuário não existe' })

        if (nome != undefined) {
            if (existsOrError(nome) || nome.trim().length < 2) return res.status(400).json({ msg: 'nome deve ter 2 ou mais caracteres' })
            editData.nome = nome
        }

        if (email != undefined) {
            if (validateEmail(email) == false) return res.status(400).json({ msg: 'digite um email válido' })
            flagEditEmail = true
        } else flagEditEmail = false

        if (role != undefined) editData.role = role

        try {
            const user = await User.findById(id)
            if (existsOrError(user)) return res.status(400).json({ msg: 'usuário não encontrado' })

            if (flagEditEmail && email != user.email) {
                const emailExists = await User.findEmail(email)
                if (emailExists) return res.status(400).json({ msg: 'este email já está cadastrado' })
                editData.email = email
            }

            if (Object.values(editData).length === 0) return res.status(200).json({ msg: 'nenhuma alteração realizada' })

            const editedUser = await User.update(id, editData)
            return res.status(200).json({ msg: 'usuário editado', editedUser })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id
        if (validateID(id)) return res.status(400).json({ msg: 'este usuário não existe' })

        try {
            const user = await User.findById(id)
            if (existsOrError(user)) return res.status(400).json({ msg: 'usuário não encontrado' })

            const deletedUser = await User.del(id)
            return res.status(200).json({ msg: 'usuário deletado', deletedUser })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
        }
    }

}

module.exports = new UserController()