import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentPageComponent} from './content-page/content-page.component';
import {SearchComponent} from './search/search.component';
import {DetailMovieComponent} from './detail-movie/detail-movie.component';
import {ContentComponent} from './content/content.component';
import {CommentComponent} from './comment/comment.component';


const routes: Routes = [
  {
    path: '',
    component: ContentPageComponent,
    children: [
      {
        path: '',
        component: ContentComponent
      },
      {
        path: 'detail-movie/:id',
        component: DetailMovieComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
