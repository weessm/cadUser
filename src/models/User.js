const knex = require('../../config/database')

class User {

    async findAll() {
        try {
            const result = await knex('user').select('id', 'nome', 'email', 'role')
            return result
        } catch (err) {
            console.log(err)
            return []
        }
    }

    async findById(id) {
        try {
            const result = await knex('user').select('id', 'nome', 'email', 'role').where({ id }).first()
            return result
        } catch (err) {
            console.log(err)
            return undefined
        }
    }

    async findByEmail(email) {
        try {
            const result = await knex('user').select('id', 'nome', 'email', 'role').where({ email }).first()
            return result
        } catch (err) {
            console.log(err)
            return undefined
        }
    }

    async findByToken(token) {
        try {
            const result = await knex('user').select('usedToken', 'expiresToken').where({ token }).first()
            return result
        } catch (err) {
            console.log(err)
            return undefined
        }
    }

    async add(nome, email, senha) {
        try {
            await knex('user').insert({ nome, email, senha, role: 0 })
        } catch (err) {
            console.log(err)
        }
    }

    async findEmail(email) {
        try {
            const result = await knex('user').select().where({ email })
            if (result.length > 0) return true
            else return false
        } catch (err) {
            console.log(err)
            return false
        }
    }

    async update(id, data) {
        try {
            const updated = await knex('user').update(data).where({ id })
            return updated
        } catch (err) {
            console.log(err)
        }
    }

    async del(id) {
        try {
            const result = await knex('user').delete().where({ id })
            return result
        } catch (err) {
            console.log(err)
        }
    }

    async createPasswordToken(email, data) {
        try {
            const createdToken = await knex('user').update(data).where({ email })
            return createdToken
        } catch (err) {
            console.log(err)
        }
    }

    async updatePassword(senha, token) {
        try {
            const updated = await knex('user').update({ senha: senha, usedToken: 1 }).where({ token })
            return updated
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports = new User()