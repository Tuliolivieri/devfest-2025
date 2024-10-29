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
  pgm.createTable('tb_movimentacoes', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: true,
    },
    conta_corrente_id: {
      type: 'int',
      notNull: true,
      references: 'tb_contas_correntes',
    },
    tipo_movimentacao_id: {
      type: 'int',
      notNull: true,
      references: 'tb_tipo_movimentacao',
    },
    valor: {
      type: 'decimal(18, 3)',
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
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('tb_movimentacoes')
};
