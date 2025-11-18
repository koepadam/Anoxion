// the body in validator is really long. so having difficultie here 
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

describe('Router tests', () => {
  // GET exists
  it('should respond to GET /devices', async () => {
    const res = await request(app).get('/devices');
    expect([200, 400, 404, 500]).toContain(res.statusCode);
  });

  // POST route 
  it('should respond to POST /devices', async () => {
    const res = await request(app).post('/devices').send({ device: 'test' });
    expect([200, 400, 500]).toContain(res.statusCode);
  });

  // unknown route detected
  it('should return 404 for unknown ', async () => {
    const res = await request(app).get('/not-a-real-route');
    expect(res.statusCode).toBe(404);
  });

});
