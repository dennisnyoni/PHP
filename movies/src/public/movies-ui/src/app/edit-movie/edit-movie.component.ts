import { Component, Inject } from '@angular/core';
import {Movie, MoviesService} from "../movies.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent {
  id!: number;
  movie: Movie = new Movie();
  submitted = false;
  constructor(private userService: MoviesService,
              public dialogRef: MatDialogRef<EditMovieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) { }

  ngOnInit() {
    this.movie = new Movie();
    this.id = this.data.id;// this.route.snapshot.params['id'];
    this.userService.getMovie(this.id)
      .subscribe(data => {
        console.log(data);

        this.movie = data;
      }, error => console.log(error));
  }


  newMovie() {
    this.submitted = false;
    this.movie = new Movie();
  }

  save() {
    this.userService.updateMovie(this.id, this.movie)
      .subscribe(data => alert('Successfully updated!'), error => alert('Data post error! Record could not be '+
        'saved.'));
    this.movie = new Movie();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    this.onClose();
  }

  onClose(){
    this.dialogRef.close();
  }

  gotoList() {
    this.router.navigate(['/movies']);
  }
}
