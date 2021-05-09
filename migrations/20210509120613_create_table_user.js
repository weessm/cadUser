exports.up = function (knex) {
    return knex.schema.createTable('user', (t) => {
        t.increments('id').primary()
        t.string('nome').notNullable()
        t.string('email').unique().notNullable()
        t.string('senha').notNullable()
        t.integer('role').notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('user')
}
