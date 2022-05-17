import {Component, OnInit} from '@angular/core';
import {ShowTime} from '../../../entity/ShowTime';
import {Movie} from '../../../entity/Movie';
import {BookTicketsService} from '../../../service/booking/book-tickets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieManagementService} from '../../../service/admin/movie-management.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Component({
  selector: 'app-movie-selected',
  templateUrl: './movie-selected.component.html',
  styleUrls: ['./movie-selected.component.css']
})
export class MovieSelectedComponent implements OnInit {
  listDateTime: string[] = [];
  listShowtime: ShowTime[] = [];
  listMovie: Movie[] = [];
  movie: Movie;
  activeId: number;

  date = '';
  showTimeId: number;
  startDate: Date;
  endDate: Date;
  diff: number;

  constructor(private bookTicketsService: BookTicketsService,
              private activatedRoute: ActivatedRoute,
              private movieManagementService: MovieManagementService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activeId = this.activatedRoute.snapshot.params.id;
    console.log('ID : ' + this.activeId);

    this.bookTicketsService.getAllMovie().subscribe(data => {
      this.listMovie = data;
      console.log(this.listMovie);
      this.getDateTimeList(this.activeId);
    }, error => {
      console.log('get ' + error + ' at getAllMovie() on MovieSelectionComponent');
    });

  }

  getDateTimeList(movieId: number) {
    this.listDateTime = [];
    this.activeId = movieId;
    if (this.listMovie != null) {
      for (const movie of this.listMovie) {
        if (movie.movieId === movieId) {
          this.movie = movie;
          break;
        }
      }
    }
    this.startDate = (new Date(this.movie.startDate) > new Date()) ? new Date(this.movie.startDate) : new Date();
    this.endDate = new Date(this.movie.endDate);

    if (this.endDate > this.startDate) {
      this.diff = this.endDate.getDate() - this.startDate.getDate();
      for (let i = 0; i <= this.diff; i++) {
        this.listDateTime.push(this.startDate.toISOString().slice(0, 10));
        this.startDate.setDate(this.startDate.getDate() + 1);
      }
    }
  }

  getShowTimeList(date: string) {
    this.date = date;
    this.listShowtime = [];
    this.bookTicketsService.getAllShowTime(date, this.movie.movieId).subscribe(data => {
      this.listShowtime = data;
      console.log(this.listShowtime);
    }, error => {
      console.log('get ' + error + ' at getAllShowTime() on MovieSelectionComponent');
    });
  }

  getMovieTicket() {
    this.bookTicketsService.getMovieTicket(this.movie.movieId, this.date, this.showTimeId).subscribe(data => {
      this.bookTicketsService.movieTicket = data;
      this.router.navigate(['booking/seat'], {
          queryParams: {
            movieTicketId: data.movieTicketId
          }
        }
      ).then();
    }, error => {
      console.log('get ' + error + ' at getMovieTicket() on MovieSelectionComponent');
    });
  }
}

