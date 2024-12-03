/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('solicitacoes', table => {
        table.increments('id').primary()
        table.integer('id_usuario').unsigned().references('id').inTable('usuarios').notNullable();  
        table.integer('id_estrutura').unsigned().references('id').inTable('estruturas').notNullable();
        table.integer('id_cliente').unsigned().references('id').inTable('pessoas').notNullable();
        table.date('data_inicio').notNull()
        table.date('data_fim')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('solicitacoes')
};
