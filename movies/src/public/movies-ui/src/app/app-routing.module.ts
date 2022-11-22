import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MoviesComponent} from "./movies/movies.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {CreateMovieComponent} from "./create-movie/create-movie.component";

const routes: Routes = [
  {
    path:'',
    component:MoviesComponent
  },{
    path:'movie_details',
    component:MovieDetailsComponent
  },{
    path:'create_movie',
    component:CreateMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
