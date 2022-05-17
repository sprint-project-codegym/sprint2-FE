import {Row} from './Row';
import {Column} from './Column';
import {SeatType} from "./SeatType";

export interface Seat {
  seatId: number;
  row: Row;
  column: Column;
  seatType: SeatType;
}
