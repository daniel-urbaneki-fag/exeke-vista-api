/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('estruturas_concretos', table => {
        table.increments('id').primary() 
        table.float('vao_livre').notNull()
        table.boolean('tirante_central').notNull()
        table.boolean('agulhamento').notNull()
        table.float('contra_aventamento').notNull()
        table.string('tipo_ter').notNull()
        table.string('tipo_travamento').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
