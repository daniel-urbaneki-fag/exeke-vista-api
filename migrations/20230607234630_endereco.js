/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('endereco', table => {
        table.increments('id').primary()
        table.string('logradouro').notNull()
        table.integer('numero').notNull()
        table.string('complemento').notNull()
        table.string('bairro').notNull()
        table.integer('cep').notNull()
        table.string('cidade').notNull()
        table.string('estado').notNull()
        
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('endereco')
};
