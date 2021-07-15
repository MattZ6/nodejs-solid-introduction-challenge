import { User } from '../../model/User';
import { IUsersRepository, ICreateUserDTO } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    const now = new Date();

    Object.assign<User, Omit<User, 'id'>>(user, {
      name,
      email,
      admin: false,
      created_at: now,
      updated_at: now,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin({ id }: User): User {
    const index = this.users.findIndex((user) => user.id === id);

    this.users[index].admin = true;
    this.users[index].updated_at = new Date();

    return this.users[index];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
