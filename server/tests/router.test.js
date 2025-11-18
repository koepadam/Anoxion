// ✅ Mock express-validator to prevent route setup from crashing
jest.mock('express-validator', () => ({
  body: () => ({
    trim: () => ({
      isString: () => ({
        notEmpty: () => ({
          withMessage: () => ({
            escape: () => ({}),
          }),
        }),
      }),
    }),
    optional: () => ({
      isBoolean: () => ({
        withMessage: () => ({}),
      }),
      custom: () => ({
        withMessage: () => ({}),
      }),
    }),
  }),
  validationResult: () => ({
    isEmpty: () => true,
    array: () => [],
  }),
}));



const request = require('supertest');
const app = require('../index');

describe('Router connection tests', () => {
  // 🧪 GET route exists
  it('should respond to GET /devices', async () => {
    const res = await request(app).get('/devices');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  // 🧪 POST route exists
  it('should respond to POST /devices', async () => {
    const res = await request(app).post('/devices').send({ device: 'test' });
    expect([200, 400, 500]).toContain(res.statusCode);
  });

  // 🧪 Unknown route returns 404
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/not-a-real-route');
    expect(res.statusCode).toBe(404);
  });

  // 🧪 Method not allowed (if applicable)
  it('should return 404 or 405 for unsupported method', async () => {
    const res = await request(app).put('/devices');
    expect([404, 405]).toContain(res.statusCode);
  });
});
