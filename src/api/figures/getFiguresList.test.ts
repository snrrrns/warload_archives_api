import app from './getFiguresList';
import { getPlatformProxy, unstable_dev, type UnstableDevWorker } from 'wrangler';

const { env } = await getPlatformProxy();

describe('GET /api/figures', async () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev('./src/index.ts', {
      experimental: {
        disableExperimentalWarning: true,
      },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it('レスポンスの取得が可能', async () => {
    const res = await app.request('/', {}, env);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      figures: [
        {
          id: 1,
          lastName: '夏侯',
          firstName: '惇',
          courtesyName: '元譲',
          lastNameKana: 'カコウ',
          firstNameKana: 'トン',
          courtesyNameKana: 'ゲンジョウ',
          portrait: 'XiahouDun.jpg',
        },
        {
          id: 2,
          lastName: '周',
          firstName: '瑜',
          courtesyName: '公瑾',
          lastNameKana: 'シュウ',
          firstNameKana: 'ユ',
          courtesyNameKana: 'コウキン',
          portrait: 'ZhouYu.jpg',
        },
        {
          id: 3,
          lastName: '趙',
          firstName: '雲',
          courtesyName: '子龍',
          lastNameKana: 'チョウ',
          firstNameKana: 'ウン',
          courtesyNameKana: 'シリュウ',
          portrait: 'ZhaoYun.jpg',
        },
      ],
    });
  });
});
