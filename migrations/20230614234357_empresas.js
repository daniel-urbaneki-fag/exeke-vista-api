/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('empresas', table => {
        table.increments('id').primary()
        table.integer('id_endereco').unsigned().references('id').inTable('enderecos').notNullable();  
        table.string('nome_fantasia').notNullable();  
        table.string('razao_social').notNullable();   
        table.string('telefone').notNullable();
        table.string('email').notNullable(); 
        table.string('cnpj').notNullable(); 
        table.string('tipo').notNullable(); 
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('empresas')
};
