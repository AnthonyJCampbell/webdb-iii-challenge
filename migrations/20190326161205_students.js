// What changes are applied
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    tbl
      .increments();

    tbl
      .string('name', 128)
      .notNullable();

    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
};

// How can I undo the changes
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
