
import { Subjects } from '@casl/prisma';
  
import {
  Post,
  User,
  Chatroom,
} from '@prisma/client';

export type PrismaSubjects = Subjects<{
  Post: Post;
  User: User;
  Chatroom:Chatroom;
}>;
