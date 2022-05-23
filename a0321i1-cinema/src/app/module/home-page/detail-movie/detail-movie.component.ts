import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DetailMovieService} from '../../../service/home-page/detail-movie.service';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {Movie} from '../../../entity/Movie';
import {Category} from '../../../entity/Category';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {
  movie: Movie;
  public id: number;
  categoryList: Category[];

  displayTrailer: boolean = false;
  trailer: string = "";

  constructor(public dialog: MatDialog,
              public detailMovieService: DetailMovieService,
              public router: Router,
              public activeRoute: ActivatedRoute
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    if (this.router.navigated) {
      window.scrollTo(0, 0);
    }
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      const id = param.get('id');
      this.detailMovieService.getDetailById(id).subscribe(data => {
        this.movie = data;
        console.log(data);
      });
    });
  }

  openTrailer(trailer: string) {
    this.trailer = trailer;
    this.displayTrailer = true;
  }

  closeTrailer() {
    this.displayTrailer = false;
  }
}
