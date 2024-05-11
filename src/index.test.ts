import app from '.';

describe('GET /', () => {
  it('テキストの取得が可能', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);
    expect(await res.text()).toEqual('Hello Hono!');
  });
});
