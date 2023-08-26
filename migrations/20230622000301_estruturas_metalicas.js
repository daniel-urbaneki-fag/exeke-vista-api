/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('estruturas_metalicas', table => {
        table.increments('id').primary() 
        table.string('tipo_perfil_tes').notNull()
        table.float('espess_perf_tes').notNull()
        table.float('larg_perf_tes').notNull()
        table.float('alt_perf_tes').notNull()
        table.float('alt_tes').notNull()
        table.float('vao_livre_tes').notNull()
        table.boolean('contra_aventamento').notNull()
        table.boolean('agulhamento').notNull()
        table.float('dis_pilares').notNull()
        table.float('perf_enrijecido_ter').notNull()
        table.float('larg_perf_ter').notNull()
        table.float('alt_perf_ter').notNull()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
