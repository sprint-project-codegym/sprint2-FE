import {Room} from './Room';
import {Movie} from './movie';
import {ShowTime} from './showTime';
import {ProjectionType} from './projectionType';

export interface MovieTicket {
  movieTicketId: number;
  showDate: string;
  ticketPrice: number;
  room: Room;
  movie: Movie;
  showTime: ShowTime;
  projectionType: ProjectionType;
}
