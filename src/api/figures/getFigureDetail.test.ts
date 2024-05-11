import app from './getFigureDetail';
import { getPlatformProxy, unstable_dev, type UnstableDevWorker } from 'wrangler';

const { env } = await getPlatformProxy();

describe('GET /api/figures/:id', () => {
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

  describe('存在するIDである', async () => {
    const res = await app.request('/1', {}, env);

    it('存在するIDのため200となり取得可能', async () => {
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        figure: {
          id: 1,
          lastName: '夏侯',
          firstName: '惇',
          courtesyName: '元譲',
          lastNameKana: 'カコウ',
          firstNameKana: 'トン',
          courtesyNameKana: 'ゲンジョウ',
          bornEra: null,
          bornYear: null,
          isBornContain: false,
          diedEra: 'AD',
          diedYear: 221,
          isDiedContain: true,
          country: '中国',
          portrait: 'XiahouDun.jpg',
          episode:
            '曹操の重臣。前漢の夏侯嬰［カコウエイ］の末裔。\n' +
            '【演義】曹操の挙兵以来、常に従軍。董卓追撃戦では、徐栄に敗れた曹操を救出し、徐栄を突き殺す。呂布との戦いでは、曹性の矢を左目に受けながらも曹性を討った。劉備が諸葛亮を登用すると新野に侵攻するが、諸葛亮の火攻めに遭って大敗。許都で耿紀と韋晃が曹操に反乱を起こした時は鎮圧に当たった。劉備軍との漢中攻防戦で、曹操が漏らした「鶏肋」という言葉の意を楊脩に尋ね、撤退を指揮。曹操が死ぬと後を追うように病死した。\n' +
            '【正史】左目を失い盲夏侯と呼ばれる。曹丕の代に大将軍。',
          abilities: [
            {
              seriesName: '三國志',
              leadership: null,
              power: 82,
              intellect: 64,
              political: null,
              charisma: 79,
            },
            {
              seriesName: '三國志2',
              leadership: null,
              power: 93,
              intellect: 59,
              political: null,
              charisma: 71,
            },
            {
              seriesName: '三國志3',
              leadership: null,
              power: 95,
              intellect: 60,
              political: 54,
              charisma: 75,
            },
            {
              seriesName: '三國志4',
              leadership: 94,
              power: 96,
              intellect: 62,
              political: 56,
              charisma: 78,
            },
            {
              seriesName: '三國志5',
              leadership: null,
              power: 94,
              intellect: 70,
              political: 81,
              charisma: 87,
            },
            {
              seriesName: '三國志6',
              leadership: 88,
              power: 92,
              intellect: 71,
              political: 84,
              charisma: 82,
            },
            {
              seriesName: '三國志7',
              leadership: null,
              power: 91,
              intellect: 72,
              political: 74,
              charisma: 83,
            },
            {
              seriesName: '三國志8',
              leadership: null,
              power: 92,
              intellect: 63,
              political: 68,
              charisma: 84,
            },
            {
              seriesName: '三國志9',
              leadership: 90,
              power: 92,
              intellect: 64,
              political: 76,
              charisma: null,
            },
            {
              seriesName: '三國志10',
              leadership: 87,
              power: 89,
              intellect: 61,
              political: 76,
              charisma: 87,
            },
            {
              seriesName: '三國志11',
              leadership: 89,
              power: 90,
              intellect: 58,
              political: 70,
              charisma: 81,
            },
            {
              seriesName: '三國志12',
              leadership: 92,
              power: 90,
              intellect: 63,
              political: 70,
              charisma: null,
            },
            {
              seriesName: '三國志13',
              leadership: 89,
              power: 91,
              intellect: 62,
              political: 72,
              charisma: null,
            },
            {
              seriesName: '三國志14',
              leadership: 89,
              power: 90,
              intellect: 60,
              political: 74,
              charisma: 88,
            },
          ],
          medianAbility: {
            leadership: 89,
            power: 92,
            intellect: 63,
            political: 73,
            charisma: 82,
          },
          militaries: [
            { name: '曹操軍（魏）', joinedOrder: 1 },
            { name: '魏', joinedOrder: 2 },
          ],
          weapons: [],
        },
      });
    });
  });

  describe('存在しないIDである', async () => {
    const res = await app.request('/0', {}, env);

    it('存在しないIDのため404となり取得不可能', async () => {
      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ message: 'Figure not found.' });
    });
  });
});
