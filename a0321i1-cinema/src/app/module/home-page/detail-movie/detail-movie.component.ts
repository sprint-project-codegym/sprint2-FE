import {Component, OnInit} from '@angular/core';
import {CommentComponent} from '../comment/comment.component';
import {MatDialog} from '@angular/material/dialog';
import {DetailMovieService} from '../../../service/home-page/detail-movie.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Movie} from '../../../entity/Movie';
import {Category} from '../../../entity/Category';
import {Observable} from 'rxjs';
import {MovieCategory} from '../../../entity/MovieCategory';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.css']
})
export class DetailMovieComponent implements OnInit {
  movie: Movie;
  public id: number;
  categoryList: Category[];

  constructor(public dialog: MatDialog,
              public detailMovieService: DetailMovieService,
              public router: Router,
              public activeRoute: ActivatedRoute
  ) {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '1000px',
      data: {detail: 'tun'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
