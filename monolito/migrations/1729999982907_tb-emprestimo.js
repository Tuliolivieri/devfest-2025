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
  pgm.createTable('tb_emprestimos', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: false,
    },
    cliente_id: {
      type: 'int',
      notNull: false,
    },
    limite: {
      type: 'decimal',
      notNull: false,
    },
    status: {
      type: 'varchar',
      notNull: false,
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
