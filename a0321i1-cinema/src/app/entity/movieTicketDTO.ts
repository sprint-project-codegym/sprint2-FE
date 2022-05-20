export class MovieTicketDTO {
  private _movieId: number
  private _showTimeId: number
  private _showDate: string
  private _roomId: number
  private _projectionTypeId: number

  constructor(movieId: number, showTimeId: number, showDate: string, roomId: number, projectionTypeId: number) {
    this._movieId = movieId;
    this._showTimeId = showTimeId;
    this._showDate = showDate;
    this._roomId = roomId;
    this._projectionTypeId = projectionTypeId;
  }

  get movieId(): number {
    return this._movieId;
  }

  set movieId(value: number) {
    this._movieId = value;
  }

  get showTimeId(): number {
    return this._showTimeId;
  }

  set showTimeId(value: number) {
    this._showTimeId = value;
  }

  get showDate(): string {
    return this._showDate;
  }

  set showDate(value: string) {
    this._showDate = value;
  }

  get roomId(): number {
    return this._roomId;
  }

  set roomId(value: number) {
    this._roomId = value;
  }

  get projectionTypeId(): number {
    return this._projectionTypeId;
  }

  set projectionTypeId(value: number) {
    this._projectionTypeId = value;
  }
}
