/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('tb_tipo_movimentacao', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: true,
    },
    nome: {
      type: 'varchar(50)',
      notNull: true,
      unique: true,
    },
    descricao: {
      type: 'varchar',
      notNull: true,
    },
    criado_em: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    deletado_em: {
      type: 'timestamp',
      notNull: false,
    },
  });

  pgm.sql(`
    INSERT INTO tb_tipo_movimentacao (nome, descricao)
    VALUES ('Depósito', 'Depósito realizado em conta'), ('Saque', 'Saque realizado via caixa eletrônico'), ('Transferência', 'Transferência realizada via TED, DOC ou Pix'), ('Pagamento', 'Pagamento realizado via site, app ou cartão de débito');
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('tb_tipo_movimentacao');
};
