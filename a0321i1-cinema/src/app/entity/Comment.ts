import {User} from './User';
import {Movie} from './Movie';

export interface Comment {
  commentId: number;
  content: string;
  img: string;
  date: string;
  rating: number;
  user: User;
  movie:Movie;
}
