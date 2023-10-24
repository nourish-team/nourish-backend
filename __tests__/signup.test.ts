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
  it('Schould create a new user', async () => {
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
      'ba927d96-3b2d-11ee-be256-0242ac120002x'
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
