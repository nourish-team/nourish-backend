import request from 'supertest';
import express, { Application } from 'express';
import router from '../src/routes';
import signupModel from '../src/model/signup.model';
import prismaMock from '../singleton';

const app: Application = express();

app.use(express.json());
app.use(router);

const japanTime = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Tokyo',
});

interface User {
  id: number;
  username: string;
  email: string;
  uid: string;
  created_at: string;
  updated_at: string;
}
// Unit tests
describe('createUser', () => {
  it('Should create a new user', async () => {
    const user: User = {
      id: 1,
      username: 'frogman',
      email: 'frogman@test.com',
      uid: 'slkhjg352gh3l3l6j5ou657xfmgn',
      created_at: japanTime,
      updated_at: japanTime,
    };

    prismaMock.users.create.mockResolvedValueOnce(user);

    const newUser = await signupModel.createUser(
      'frogman',
      'frogman@test.com',
      'slkhjg352gh3l3l6j5ou657xfmgn',
    );

    expect(newUser).toEqual(user);
  });

  it('Should throw on duplicated UID', () => {
    const user2 = async () => {
      try {
        await signupModel.createUser(
          'batman',
          'batman@thebatcave.com',
          'slkhjg352gh3l3l6j5ou657xfmgn',
        );
        fail('Expected createUser to throw an error');
      } catch (error) {
        throw new Error('Unable to create new user');
      }
    };
    expect(user2).rejects.toThrow('Unable to create new user');
  });

  it('Should throw on duplicated username', () => {
    const user2 = async () => {
      try {
        await signupModel.createUser(
          'frogman',
          'isafrog@thepond.com',
          'slkhjg352j5ou657xfmgnjdi30ms',
        );
        fail('Expected createUser to throw an error');
      } catch (error) {
        throw new Error('Unable to create new user');
      }
    };
    expect(user2).rejects.toThrow('Unable to create new user');
  });

  it('Should throw on duplicated email', () => {
    const user2 = async () => {
      try {
        await signupModel.createUser(
          'froggy',
          'frogman@test.com',
          '73jd9g352j5ou657xfmgnjdi30ms',
        );
        fail('Expected createUser to throw an error');
      } catch (error) {
        throw new Error('Unable to create new user');
      }
    };
    expect(user2).rejects.toThrow('Unable to create new user');
  });
});

// Integration tests
describe('POST /signup', () => {
  it('should return 201 status code', async () => {
    const response = await request(app).post('/signup').send({
      username: 'mothman',
      email: 'mothman@test.com',
      uid: '73jd9g352j5ou657xfmhj38430ms',
    });
    expect(response.statusCode).toEqual(201);
  });

  it('should return a username and id', async () => {
    const user: User = {
      id: 1,
      username: 'bigcat',
      email: 'bigcat@test.com',
      uid: 'kfe36506hmda47h9d4n0v57sbl4s',
      created_at: japanTime,
      updated_at: japanTime,
    };

    prismaMock.users.create.mockResolvedValueOnce(user);

    const response = await request(app).post('/signup').send({
      username: 'bigcat',
      email: 'bigcat@test.com',
      uid: 'kfe36506hmda47h9d4n0v57sbl4s',
    });
    expect(prismaMock.users.create).toHaveBeenCalled();
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('username', 'bigcat');
  });

  it('should throw on invalid username', async () => {
    const response = await request(app).post('/signup').send({
      username: 'me',
      email: 'mymail@test.com',
      uid: 'kfe36506hmhkdw79d4n0v57sbl4s',
    });
    expect(response.statusCode).toEqual(400);
  });
});
