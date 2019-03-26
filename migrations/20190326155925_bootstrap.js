// What changes are applied
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    tbl
      .increments();

    tbl
      .string('name', 128)
      .notNullable();
  })
};

// How can I undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
