/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('pessoa', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.integer('cpf').notNull()
        table.string('telefone').notNull()
        table.string('email').notNull()
        table.integer('id_endereco').unsigned().references('id').inTable('endereco').notNullable();    
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('pessoa')
};
