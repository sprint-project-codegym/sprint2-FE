import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {

  @Input()
  url: string = '';

  trailerUrl: any = '';

  @Output()
  closed = new EventEmitter<boolean>();

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.url += "?&autoplay=1";
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  closeTrailer() {
    this.closed.emit();
  }

}
