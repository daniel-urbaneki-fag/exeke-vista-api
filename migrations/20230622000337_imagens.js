/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('imagens', table => {
        table.increments('id').primary()
        table.integer('id_solicitacao').unsigned().references('id').inTable('usuarios').notNullable();     
        table.string('nome_imagem').notNull()
        table.string('base64').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
