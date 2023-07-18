/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('solicitacoes', table => {
        table.increments('id').primary()
        table.integer('id_usuario').unsigned().references('id').inTable('usuarios').notNullable();  
        table.integer('id_estrutura').unsigned().references('id').inTable('estrutura').notNullable();   
        table.date('data_inicio').notNull()
        table.date('data_fim').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('solicitacoes')
};
