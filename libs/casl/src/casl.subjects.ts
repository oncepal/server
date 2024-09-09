
import { Subjects } from '@casl/prisma';
  
import {
  Post,
} from '@prisma/client';

export type PrismaSubjects = Subjects<{
  Post: Post;
}>;
