/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('imagens_estruturas', table => {
        table.increments('id').primary()
        table.integer('id_estrutura').unsigned().references('id').inTable('estruturas').notNullable();     
        table.integer('id_imagem').unsigned().references('id').inTable('imagens').notNullable(); 
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
