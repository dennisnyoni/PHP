import {Component, ViewChild} from '@angular/core';
import {Artist, Movie, MoviesService} from "../movies.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {EditArtistComponent} from "../edit-artist/edit-artist.component";
import {CreateArtistComponent} from "../create-artist/create-artist.component";
import {ArtistsService} from "../artists.service";
import {ArtistDetailsComponent} from "../artist-details/artist-details.component";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {

  artist!: Artist;
  artists:Artist[]=[];
  artistList: object =[];
  listData!: MatTableDataSource<any>;

  displayedColumns: string[]= ['name','year','Actions'];
  @ViewChild(MatSort,{static:false})
  sort!:MatSort;
  @ViewChild(MatPaginator,{static:false})paginator!: MatPaginator;
  searchKey!:string;

  constructor(private artistService:ArtistsService,public dialog:MatDialog,private router:Router) {
  }

  ngOnInit(): void{

    this.reloadData();

    this.artistService.getArtistes().subscribe(list=>this.artistList=list);
    //this.movies= this.movieService.getMovies();
    console.log("my movie list: ",this.listData);
  }

  reloadData():void{
    //this.movies=this.movieService.getMovies();
    this.artistService.getArtistes().subscribe(
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
    let dialogRef = this.dialog.open(CreateArtistComponent,{
      height:'350px',
      width:'400px',

    });

  }

  artistDetails(id:number):void{
    let dialogRef = this.dialog.open(ArtistDetailsComponent,{
      height:'100px',
      data:{
        id:id,
      }
    });
  }

  onEdit(id:number):void{
    let dialogRef = this.dialog.open(EditArtistComponent,{
      height:'500px',
      data:{
        id:id,
      }
    })
  }

  deleteArtist(id:number){
    this.artistService.deleteArtist(id)
      .subscribe(
        data =>{
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
}
