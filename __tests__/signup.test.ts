import signupModel from '../src/model/signup.model';
import prismaMock from '../singleton';

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

  it('Should throw on duplicated UID', () => {
    const user2 = async () => {
      try {
        await signupModel.createUser(
          'batman',
          'batman@thebatcave.com',
          'ba927d96-3b2d-11ee-be56-0242ac120002x',
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
          'ba916d96-3b2d-12ee-be256-0242ac188242x',
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
          'ba987d96-37dd-14ee-be256-0922ac188362x',
        );
        fail('Expected createUser to throw an error');
      } catch (error) {
        throw new Error('Unable to create new user');
      }
    };
    expect(user2).rejects.toThrow('Unable to create new user');
  });
});
