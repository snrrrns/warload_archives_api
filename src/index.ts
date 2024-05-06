import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { logger } from 'hono/logger';
import { Bindings } from './bindings';
import api from './api';

const app = new Hono<{ Bindings: Bindings }>();
app.use('*', prettyJSON());
app.use(logger());

app.route('/api', api);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;
