import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artist} from "./movies.service";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  baseUrl:string = "http://localhost:3535/api/movies/:id/artists";
  constructor(private http:HttpClient) { }

  getArtistes():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getArtist(id: Number):Observable<Artist>{
    return this.http.get<Artist>(this.baseUrl+"/"+id);
  }

  createArtist(artist: any): Observable<Artist>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    const result:Observable<Artist> =  this.http.post<Artist>(this.baseUrl,artist,{headers:headers});
    console.log("movie: ",artist)
    return result;
  }

  updateArtist(id:number,Value:any):Observable<object>{
    return this.http.post(this.baseUrl+"/"+id,Value)
  }

  deleteArtist(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+id, {responseType:'json'});
  }
}
