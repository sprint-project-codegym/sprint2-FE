import {Room} from '../entity/Room';
import {Movie} from '../entity/Movie';
import {MovieTicket} from "../entity/MovieTicket";
import {User} from "../entity/User";
import {Seat} from "../entity/Seat";

export interface InformationTicketDTO {
  ticketId: number;
  timeCreate: string;
  seat: Seat;
  ticketStatus: string;
  room: Room;
  movie: Movie;
  user: User;
  movieTicket: MovieTicket;
}
