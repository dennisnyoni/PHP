import {Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

import {Movie, MoviesService} from "../movies.service";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {CreateMovieComponent} from "../create-movie/create-movie.component";
import {MovieDetailsComponent} from "../movie-details/movie-details.component";
import {EditMovieComponent} from "../edit-movie/edit-movie.component";
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  movie!: Movie;
  movies:Movie[]=[];
  movieList: object =[];
  listData!: MatTableDataSource<any>;

  displayedColumns: string[]= ['title','year','marshalArt','Actions'];
  @ViewChild(MatSort,{static:false})
  sort!:MatSort;
  @ViewChild(MatPaginator,{static:false})paginator!: MatPaginator;
  searchKey!:string;

  constructor(private movieService:MoviesService,public dialog:MatDialog,private router:Router) {
  }

  ngOnInit(): void{

    this.reloadData();

    this.movieService.getMovies().subscribe(list=>this.movieList=list);
    //this.movies= this.movieService.getMovies();
    console.log("my movie list: ",this.listData);
  }

  reloadData():void{
    //this.movies=this.movieService.getMovies();
    this.movieService.getMovies().subscribe(
      list=>{
        const array = list.map((item:any) =>{

          return {
            $id: item.$id,
            ...item
          };
        });
        this.listData = new MatTableDataSource<any>(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log("list data ", this.listData);
      });
  }

  onSearchClear():void{
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(): void{
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(): void{
    let dialogRef = this.dialog.open(CreateMovieComponent,{
      height:'350px',
      width:'400px',

    });

  }

  movieDetails(id:number):void{
    let dialogRef = this.dialog.open(MovieDetailsComponent,{
      height:'100px',
      data:{
        id:id,
      }
    });
  }

  onEdit(id:number):void{
    let dialogRef = this.dialog.open(EditMovieComponent,{
      height:'500px',
      data:{
        id:id,
      }
    })
  }

  deleteMovie(id:number){
    this.movieService.deleteMovie(id)
      .subscribe(
        data =>{
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
