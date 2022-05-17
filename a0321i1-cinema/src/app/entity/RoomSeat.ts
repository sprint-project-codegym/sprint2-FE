// @ts-ignore
import {Room} from './Room';
import {Seat} from './Seat';
import {SeatStatus} from './SeatStatus';

export interface RoomSeat {
  roomSeatId: number;
  room: Room;
  seat: Seat;
  seatStatus: SeatStatus;
}
