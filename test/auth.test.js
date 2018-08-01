const expect = require('expect');
const request = require('supertest');

const app = require('../index');
const { User } = require('../models');

const { users, populateUsers } = require('./seed');

beforeEach(populateUsers);

describe('POST /signup', () => {
  it('should create a new user', (done) => {
    const user = {
      email: 'user3@test.com',
      password: 'password3'
    };

    request(app)
      .post('/signup')
      .send(user)
      .expect(200)
      .then(res => {
        // Look for user in database
        User.find({ email: user.email }).then(users => {
          // Should return one result
          expect(users.length).toBe(1);

          // Make sure the password is correctly hashed
          users[0].comparePassword(user.password, (err, isMatch) => {
            if (err) return done(err);
            expect(isMatch).toBeTruthy();
            done();
          });
        });
      }).catch(err => done(err));
  });
  
  it('should not create users with email already in use', (done) => {
      request(app)
        .post('/signup')
        .send(users[0])
        .expect(422, {
          error: 'Email is in use'
        })
        .end(done);
  });

  it('should return error if an email or password is not supplied', (done) => {
    const user = {
      email: 'user3@test.com'
    };
    
    request(app)
      .post('/signup')
      .send(user)
      .expect(422, {
        error: 'Email and password must be provided'
      })
      .end(done);
  });
});

describe('POST /signin', () => {
  it('should return a token when a valid email and password combo is sent', (done) => {
    request(app)
      .post('/signin')
      .send(users[0])
      .expect(200)
      .expect(res => {
        expect(res.body.token).toBeTruthy();
      })
      .end(done);
  });

  it('should return an error if user not found', (done) => {
    const user = {
      email: 'user3@test.com',
      password: 'password'
    }
    request(app)
      .post('/signin')
      .send(JSON.stringify(user))
      .expect(401)
      .end(done);
  });
});