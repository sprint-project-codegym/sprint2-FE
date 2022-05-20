import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MovieManagementService} from '../../../../service/admin/movie-management.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit {

  @Input()
  deleteId: string;
  @Input()
  deleteName: string;
  @Input()
  deleteStartDate: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();
  constructor(
    public movieService: MovieManagementService,
    public router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    console.log('Delete work!');
  }

  deleteMovie() {
    this.movieService.deleteMovieById(this.deleteId).subscribe(
      data => {
        document.getElementById('closeModal').click();
        this.toastrService.success('Xóa thành công', 'Thông báo');
        this.deleteComplete.emit(true);
      }, error => {
        this.toastrService.error('Đã xảy ra lỗi', 'Vui lòng thử lại');
        this.deleteComplete.emit(true);
      }
    );
  }

}
