import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const series = sqliteTable('series', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const countries = sqliteTable('countries', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const weapons = sqliteTable('weapons', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const militaries = sqliteTable('militaries', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  countryId: integer('country_id')
    .references(() => countries.id)
    .notNull(),
  name: text('name').notNull().unique(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const figures = sqliteTable('figures', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  countryId: integer('country_id')
    .references(() => countries.id)
    .notNull(),
  lastName: text('last_name'),
  firstName: text('first_name').notNull(),
  courtesyName: text('courtesy_name'),
  lastNameKana: text('last_name_kana'),
  firstNameKana: text('first_name_kana').notNull(),
  courtesyNameKana: text('courtesy_name_kana'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const abilities = sqliteTable('abilities', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  figureId: integer('figure_id')
    .references(() => figures.id)
    .notNull(),
  seriesId: integer('series_id')
    .references(() => series.id)
    .notNull(),
  leadership: integer('leadership'),
  power: integer('power').notNull(),
  intellect: integer('intellect').notNull(),
  political: integer('political'),
  charisma: integer('charisma'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const figureDetails = sqliteTable('figure_details', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  figureId: integer('figure_id')
    .references(() => figures.id)
    .notNull(),
  bornEra: text('born_era', { enum: ['BC', 'AD'] }).default('AD'),
  bornYear: integer('born_year'),
  isBornCertain: integer('is_born_certain', { mode: 'boolean' }).notNull().default(true),
  diedEra: text('died_era', { enum: ['BC', 'AD'] }).default('AD'),
  diedYear: integer('died_year'),
  isDiedCertain: integer('is_died_certain', { mode: 'boolean' }).notNull().default(true),
  portrait: text('portrait'),
  episode: text('episode').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const figureWeapons = sqliteTable('figure_weapons', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  figureId: integer('figure_id')
    .references(() => figures.id)
    .notNull(),
  weaponId: integer('weapon_id').references(() => weapons.id),
  uniqueName: text('unique_name'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const figureMilitaries = sqliteTable('figure_militaries', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  figureId: integer('figure_id')
    .references(() => figures.id)
    .notNull(),
  militaryId: integer('military_id').references(() => militaries.id),
  joinedOrder: integer('joined_order').notNull().default(1),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
