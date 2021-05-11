exports.up = function (knex) {
    return knex.schema.createTable('user', (t) => {
        t.increments('id').primary()
        t.string('nome').notNullable()
        t.string('email').unique().notNullable()
        t.string('senha').notNullable()
        t.string('token').nullable()
        t.datetime('expiresToken').nullable()
        t.integer('usedToken').notNullable().defaultTo(1)
        t.integer('role').notNullable().defaultTo(0)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('user')
}
