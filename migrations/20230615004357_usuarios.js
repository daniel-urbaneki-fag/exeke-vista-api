/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary()
        table.integer('id_pessoa').unsigned().references('id').inTable('pessoas').notNullable();    
        table.string('usuario').notNull()
        table.string('senha').notNull()
        table.string('funcao').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('usuarios')
};
