import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl:string = "http://localhost:3535/api/movies";
  constructor(private http:HttpClient) { }

  getMovies():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getMovie(id: Number):Observable<Movie>{
    return this.http.get<Movie>(this.baseUrl+"/"+id);
  }

  createMovie(movie: any): Observable<Movie>{
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
  const result:Observable<Movie> =  this.http.post<Movie>(this.baseUrl,movie,{headers:headers});
    console.log("movie: ",movie)
    return result;
  }

  updateMovie(id:number,Value:any):Observable<object>{
    return this.http.post(this.baseUrl+"/"+id,Value)
  }

  deleteMovie(id:number):Observable<any>{
    return this.http.delete(this.baseUrl+"/"+id, {responseType:'json'});
  }
}

export class Movie{
  #id!:string
  #title!:string;
  #year!:number;
  #marshalArt!:string;
  #artists!:Artist[];

  get id(){
    return this.#id;
  }
  set title(title:string){
    this.#title =title;
  }

  get title(){
   return this.#title;
  }

  set year(year:number){
    this.#year =year;
  }

  get year(){
    return this.#year;
  }
  set marshalArt(marshalArt:string){
    this.#marshalArt =marshalArt;
  }
  get marshalArt(){
   return this.#marshalArt;
  }

  set artists(artists:Artist[]){
    this.#artists = artists;
  }

  get artists(){
    return this.#artists;
  }
}

export  class Artist{
  #name!:string;
  #yearStartedActing!:number;

  set name(name:string){
    this.#name = name;
  }

  get name(){
    return this.#name
  }

  set yearStartedActing(year: number){
    this.#yearStartedActing = year;
  }

  get yearStartedActing(){
     return this.#yearStartedActing;
  }
}
