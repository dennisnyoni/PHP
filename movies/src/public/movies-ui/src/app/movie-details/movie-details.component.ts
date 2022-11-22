import {Component, Inject} from '@angular/core';
import {Movie, MoviesService} from "../movies.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  id!: number;
  movie!: Movie;

  constructor(private route: ActivatedRoute, private router: Router,
              public dialogRef: MatDialogRef<MovieDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private movieService: MoviesService) { }

  ngOnInit() {
    this.movie = new Movie();
    //this.id = this.data.id;
    this.id= this.route.snapshot.params['id'];
    console.log("movie id: ",this.id);
    this.movieService.getMovie(this.id)
      .subscribe(data => {
        console.log(data);

        this.movie = data;
        console.log("movie details: ",this.movie)
      }, error => console.log(error));
  }

  list() {
    this.dialogRef.close();
     this.router.navigate(['movies']);
  }
}
