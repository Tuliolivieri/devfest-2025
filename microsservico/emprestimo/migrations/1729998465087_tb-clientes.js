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
  pgm.createTable('tb_clientes', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: false,
    },
    email: {
      type: 'varchar',
      notNull: false,
    },
    documento: {
      type: 'varchar',
      notNull: false,
      unique: true,
    },
    external_id: {
      type: 'int',
      notNull: false,
      unique: true,
    }
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
