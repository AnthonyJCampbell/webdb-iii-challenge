
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Alex E.'},
        {cohort_id: 1, name: 'Connor R.'},
        {cohort_id: 1, name: 'Anthony C.'},
        {cohort_id: 4, name: 'Maxime S,'},
        {cohort_id: 5, name: 'Delba d. O.'},
        {cohort_id: 5, name: 'Black F.'}
      ]);
    });
};
