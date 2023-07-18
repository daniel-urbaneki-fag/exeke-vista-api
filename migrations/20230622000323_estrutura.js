/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('estrutura', table => {
        table.increments('id').primary()
        table.integer('id_estrutura_metalica').unsigned().references('id').inTable('estrutura_metalica');
        table.integer('id_estrutura_madeira').unsigned().references('id').inTable('estrutura_madeira');
        table.integer('id_estrutura_concreto').unsigned().references('id').inTable('estrutura_concreto');
        table.float('area_cobertura').notNull()
        table.integer('numero_modulos').notNull()
        table.string('tipo_telha').notNull()
        table.integer('idade_aparente').notNull()
        table.float('dis_ter').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
