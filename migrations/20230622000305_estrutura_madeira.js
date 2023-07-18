/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('estrutura_madeira', table => {
        table.increments('id').primary() 
        table.string('tipo_corte_tes').notNull()
        table.float('diametro_tronco_tes').notNull()
        table.float('larg_corte_tes').notNull()
        table.float('alt_corte_tes').notNull()
        table.float('alt_tes').notNull()
        table.float('vao_livre_tes').notNull()
        table.string('forma_chumbamento').notNull()
        table.float('dis_pilares').notNull()
        table.float('larg_corte_ter').notNull()
        table.float('alt_corte_ter').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
