import signupModel from '../src/model/signup.model';
import { prismaMock } from '../singleton';

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

describe('createUser', () => {
  it('Should throw an error for invalid username', async () => {
    await expect(
      signupModel.createUser(
        '',
        'frogman@test.com',
        'ba927d96-3b2d-11ee-be256-0242ac120002x',
      ),
    ).rejects.toThrowError('Invalid username');
  });

  it('Should throw an error for empty email', async () => {
    await expect(
      signupModel.createUser(
        'frogman',
        '',
        'ba927d96-3b2d-11ee-be256-0242ac120002x',
      ),
    ).rejects.toThrowError('Invalid email');
  });
  it('Should throw an error for invalid email', async () => {
    await expect(
      signupModel.createUser(
        'frogman',
        'frogmanAtTestDotCom',
        'ba927d96-3b2d-11ee-be256-0242ac120002x',
      ),
    ).rejects.toThrowError('Invalid email');
  });
  it('Should throw an error for invalid UID', async () => {
    await expect(
      signupModel.createUser('frogman', 'frogman@test.com', 'inv@l*%-uid'),
    ).rejects.toThrowError('Invalid UID');
  });
  it('Should throw an error for duplicate email', async () => {
    prismaMock.users.findUnique.mockResolvedValue({
      id: 1,
      username: 'existinguser',
      email: 'frogman@test.com',
      uid: 'ba927d96-3b2d-11ee-be56-0242ac120002x',
      created_at: japanTime,
      updated_at: japanTime,
    });

    await expect(
      signupModel.createUser(
        'frogman',
        'frogman@test.com',
        'ba927d96-3b2d-11ee-be256-0242ac120002x',
      ),
    ).rejects.toThrowError('Unable to create new user');
  });

  it('Should create a new user', async () => {
    const user: User = {
      id: 1,
      username: 'frogman',
      email: 'frogman@test.com',
      uid: 'ba927d96-3b2d-11ee-be56-0242ac120002x',
      created_at: japanTime,
      updated_at: japanTime,
    };

    prismaMock.users.create.mockResolvedValue(user);

    const newUser = await signupModel.createUser(
      'frogman',
      'frogman@test.com',
      'ba927d96-3b2d-11ee-be256-0242ac120002x',
    );

    expect(newUser).toEqual({
      id: 1,
      username: 'frogman',
      email: 'frogman@test.com',
      uid: 'ba927d96-3b2d-11ee-be56-0242ac120002x',
      created_at: japanTime,
      updated_at: japanTime,
    });
  });
});
