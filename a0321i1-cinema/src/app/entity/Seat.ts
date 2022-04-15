import {Row} from './Row';
import {Column} from './Column';

export interface Seat {
  seatId: number;
  row: Row;
  column: Column;
  seatType: string;
}
