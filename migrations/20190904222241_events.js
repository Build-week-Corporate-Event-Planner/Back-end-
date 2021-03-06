
exports.up = function(knex ) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments('id')
    tbl
      .string('username', 255)
      .notNullable()
      .unique()
    tbl.string('password', 255).notNullable()
    tbl.string("company", 255)
    tbl.string("role", 255)
    tbl.string("email", 255);
   
  })

  .createTable('events', tbl => {
    tbl.increments('id')
    tbl.integer("events_id")
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('events')
    .onUpdate("CASCADE")
    .onDelete("CASCADE")
    tbl.string("description").notNullable()
    tbl.integer('budget').notNullable();
})


  .createTable("vendors", tbl => {
    tbl.increments("id")
    tbl.string('name').notNullable()
    tbl.string('email')
    tbl.string('phone number').notNullable();
    

  })
  
  .createTable("todo list", tbl => {
    tbl.increments('id')
    tbl.string("ToDO item").notNullable()
    tbl.boolean("completed").notNullable().defaultTo("false")
    .unsigned()
    tbl.integer('events_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('events')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
   })


  .createTable("user_event", tbl => {
    tbl.increments()
    tbl
    .integer("user_id")
    .notNullable()
    .unsigned()
    .references("id")
    .inTable("users");
    tbl
    .integer("events_id")
    .notNullable()
    .unsigned()
    .references("id")
    .inTable("events");
 
  })

  .createTable("event_vendors", tbl => {
    tbl.increments()
    tbl
    .integer("events_id")
    .notNullable()
    .unsigned()
    .references("id")
    .inTable("events");
    tbl
    .integer("vendors_id")
    .notNullable()
    .unsigned()
    .references("id")
    .inTable("vendors");
  })

};

exports.down = function(knex ) {
  return knex.schema
  .dropTableIfExists('event_vendors')
  .dropTableIfExists('user_event')
  .dropTableIfExists('todo list')
  .dropTableIfExists('vendors')
  .dropTableIfExists('events')
  .dropTableIfExists('users')   // Reverse order of which it was implemented to fall off correctly. 
};
