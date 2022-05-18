import {MovieCategory} from "../entity/MovieCategory";

export class Movie {
  posterMovie: string;
  movieName: string;
  startDate: string;
  endDate: string;
  movieStudio: string;
  actor: string;
  director: string;
  movieLength: number;
  trailer: string;
  banner: string;
  description: string;
  movieCategoryList;
  categories: string;
  movieType: string;


  constructor(posterMovie: string, movieName: string, startDate: string, endDate: string, movieStudio: string, actor: string, director: string, movieLength: number, trailer: string, banner: string, description: string, movieCategoryList: number[], categories: string, movieType: string) {
    this.posterMovie = posterMovie;
    this.movieName = movieName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.movieStudio = movieStudio;
    this.actor = actor;
    this.director = director;
    this.movieLength = movieLength;
    this.trailer = trailer;
    this.banner = banner;
    this.description = description;
    this.movieCategoryList = movieCategoryList;
    this.categories = categories;
    this.movieType = movieType;
  }
}
