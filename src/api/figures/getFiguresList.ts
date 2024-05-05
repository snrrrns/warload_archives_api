import { Hono } from 'hono';
import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { Bindings } from '../../bindings';
import { figures, figureDetails } from '../../drizzle/schema';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const figures = await selectFigures(db);

    return c.json({ figures });
  } catch (e) {
    if (e instanceof Error) {
      console.error({ message: 'Error', errorMessage: e.message });
      return c.body('', 500);
    }
    console.error({ message: 'Unknown error' });
    return c.body('', 500);
  }
});

const selectFigures = async (db: DrizzleD1Database) => {
  return db
    .select({
      id: figures.id,
      lastName: figures.lastName,
      firstName: figures.firstName,
      courtesyName: figures.courtesyName,
      lastNameKana: figures.lastNameKana,
      firstNameKana: figures.firstNameKana,
      courtesyNameKana: figures.courtesyNameKana,
      portrait: figureDetails.portrait,
    })
    .from(figures)
    .innerJoin(figureDetails, eq(figures.id, figureDetails.figureId));
};

export default app;
