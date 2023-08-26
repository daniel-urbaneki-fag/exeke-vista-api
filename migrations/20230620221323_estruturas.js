/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('estruturas', table => {
        table.increments('id').primary()
        table.integer('id_estrutura').notNullable()
        table.string('tipo_estrutura').notNullable()
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
