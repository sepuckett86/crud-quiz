require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const JamSession = require('../lib/models/JamSession');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let jamSession = null;
  beforeEach(async() => {
    jamSession = await JamSession.create({
      where: 'Jesuit High School',
      when: new Date('July 30, 2019'),
      who: ['Allision', 'Brady', 'Chris']
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a jam session', () => {
    return request(app)
      .post('/api/v1/jam-sessions')
      .send({
        where: 'Jesuit High School',
        when: new Date('July 30, 2019'),
        who: ['Allision', 'Brady', 'Chris']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          where: 'Jesuit High School',
          when: new Date('July 30, 2019').toISOString(),
          who: ['Allision', 'Brady', 'Chris'],
          __v: 0
        });
      });
  });

  it('gets all jam sessions', () => {
    return request(app)
      .get('/api/v1/jam-sessions')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          where: 'Jesuit High School',
          when: new Date('July 30, 2019').toISOString(),
          who: ['Allision', 'Brady', 'Chris'],
        }]);
      });
  });

  it('gets jam session by id', () => {
    return request(app)
      .get(`/api/v1/jam-sessions/${jamSession._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: jamSession._id.toString(),
          where: 'Jesuit High School',
          when: new Date('July 30, 2019').toISOString(),
          who: ['Allision', 'Brady', 'Chris'],
        });
      });
  });
});
