
exports.seed = function(knex, Promise) {
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'WEB EU1'},
        {name: 'WEB 19'},
        {name: 'IOS 2'},
        {name: 'UX PT 1'},
        {name: 'WEB 13'},
        {name: 'IOS 4'},
      ]);
    });
};
