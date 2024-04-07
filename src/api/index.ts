import { Hono } from 'hono';
import { Bindings } from '../types/db';
import figures from './figures/getFigureDetail';

const app = new Hono<{ Bindings: Bindings }>();
app.route('/figures', figures);

export default app;
