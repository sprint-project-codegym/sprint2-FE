import {MovieCategory} from "../entity/MovieCategory";

export class MovieCreateDTO {
  movieName:string;
  startDate:string;
  endDate:string;
  actor:string;
  movieLength:number;
  movieStudio:string;
  director:string;
  trailer:string;
  description:string;
  poster:string;
}
