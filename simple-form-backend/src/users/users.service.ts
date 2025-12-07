import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  private readonly filePath = path.join(__dirname, 'users.json');

  saveUser(user: any) {
    let users: any[] = [];
    if (fs.existsSync(this.filePath)) {
      users = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    }

    users.push(user);
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));

    return { message: 'Saved to JSON!', user };
  }
}
