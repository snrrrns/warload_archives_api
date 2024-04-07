import { Hono } from 'hono';
import { Bindings } from '../types/db';
import figureDetail from './figures/getFigureDetail';
import figuresList from './figures/getFiguresList';

const app = new Hono<{ Bindings: Bindings }>();
app.route('/figures', figuresList);
app.route('/figures', figureDetail);

export default app;
