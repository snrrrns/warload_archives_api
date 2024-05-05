import { Hono } from 'hono';
import {
  figureDetails,
  figures,
  figureWeapons,
  weapons,
  abilities,
  series,
  figureMilitaries,
  countries,
  militaries,
} from '../../drizzle/schema';
import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { Bindings } from '../../bindings';

type Ability = {
  leadership: number | null;
  power: number;
  intellect: number;
  political: number | null;
  charisma: number | null;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/:id', async (c) => {
  try {
    const paramId = parseInt(c.req.param('id'));
    const db = drizzle(c.env.DB);
    const figure = (await selectFigures(db, paramId)).at(0);

    if (!figure) return c.json({ message: 'Figure not found.' }, 404);

    const abilities = await selectAbilities(db, figure.id);
    const figureMilitaries = await selectFigureMilitaries(db, figure.id);
    const figureWeapons = await selectFigureWeapons(db, figure.id);

    const medianAbility = computeMedianAbility(
      abilities.map(({ seriesName: _, ...ability }) => ability)
    );

    return c.json({
      figure: {
        ...figure,
        abilities,
        medianAbility,
        militaries: figureMilitaries,
        weapons: figureWeapons,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error({ message: 'Error', errorMessage: e.message });
      return c.body('', 500);
    }
    console.error({ message: 'Unknown error' });
    return c.body('', 500);
  }
});

const selectFigures = async (db: DrizzleD1Database, paramId: number) => {
  return db
    .select({
      id: figures.id,
      lastName: figures.lastName,
      firstName: figures.firstName,
      courtesyName: figures.courtesyName,
      lastNameKana: figures.lastNameKana,
      firstNameKana: figures.firstNameKana,
      courtesyNameKana: figures.courtesyNameKana,
      bornEra: figureDetails.bornEra,
      bornYear: figureDetails.bornYear,
      isBornContain: figureDetails.isBornCertain,
      diedEra: figureDetails.diedEra,
      diedYear: figureDetails.diedYear,
      isDiedContain: figureDetails.isDiedCertain,
      country: countries.name,
      portrait: figureDetails.portrait,
      episode: figureDetails.episode,
    })
    .from(figures)
    .innerJoin(figureDetails, eq(figures.id, figureDetails.figureId))
    .innerJoin(countries, eq(figures.countryId, countries.id))
    .where(eq(figures.id, paramId));
};

const selectFigureWeapons = async (db: DrizzleD1Database, figureId: number) => {
  return db
    .select({
      name: figureWeapons.uniqueName,
      type: weapons.type,
    })
    .from(figureWeapons)
    .innerJoin(weapons, eq(figureWeapons.weaponId, weapons.id))
    .where(eq(figureWeapons.figureId, figureId));
};

const selectAbilities = async (db: DrizzleD1Database, figureId: number) => {
  return db
    .select({
      seriesName: series.name,
      leadership: abilities.leadership,
      power: abilities.power,
      intellect: abilities.intellect,
      political: abilities.political,
      charisma: abilities.charisma,
    })
    .from(abilities)
    .innerJoin(series, eq(abilities.seriesId, series.id))
    .where(eq(abilities.figureId, figureId));
};

const selectFigureMilitaries = async (db: DrizzleD1Database, figureId: number) => {
  return db
    .select({
      name: militaries.name,
      joinedOrder: figureMilitaries.joinedOrder,
    })
    .from(figureMilitaries)
    .innerJoin(militaries, eq(figureMilitaries.militaryId, militaries.id))
    .where(eq(figureMilitaries.figureId, figureId));
};

const computeMedianAbility = (abilities: Ability[]): Ability => {
  const attributes: (keyof Ability)[] = [
    'leadership',
    'power',
    'intellect',
    'political',
    'charisma',
  ];

  const [leadership, power, intellect, political, charisma] = attributes.map((attr) =>
    median(abilities.map((ability) => ability[attr]))
  );

  return { leadership, power, intellect, political, charisma };
};

const median = (values: (number | null)[]) => {
  const filteredValues = values.filter((value) => value !== null);
  const sortedValues = filteredValues.slice().sort((a, b) => a - b);
  const midIndex = Math.floor(sortedValues.length / 2);

  return sortedValues.length % 2 === 0
    ? Math.round((sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2)
    : Math.round(sortedValues[midIndex]);
};

export default app;
