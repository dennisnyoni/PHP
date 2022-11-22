import {Component, Inject} from '@angular/core';
import {Movie, MoviesService} from "../movies.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent {

  form!:FormGroup;
  movie: Movie = new Movie();
  submitted = false;
  message!:string;
  //data!:Movie;
  constructor(private movieService:MoviesService, public dialogRef:MatDialogRef<CreateMovieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {

  }
  ngOnInit(){
    this.form = new FormGroup<any>({

    })

  }

  newMovie(){
    this.submitted = false;
    this.movie = new Movie();
  }

  save():void{
    this.movie.artists=[];
    console.log("movie: ",this.movie)
    this.movieService.createMovie(this.movie)
      .subscribe({
        next:()=> this.message = "successfully saved!",
        error:() => this.message = "error"

      });
    console.log("movie: ",this.movie)
  }
  onSubmit(): void{
    this.submitted = true;
    this.save();
  }

  onClose(): void{
    this.dialogRef.close();
  }

  gotoList(): void{
    this.router.navigate(['/movies']);
  }
}
