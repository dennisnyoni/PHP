import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistComponent } from './artist/artist.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UserComponent } from './user/user.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { DeleteArtistComponent } from './delete-artist/delete-artist.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    ArtistsComponent,
    ArtistComponent,
    MovieDetailsComponent,
    ArtistDetailsComponent,
    CreateMovieComponent,
    EditMovieComponent,
    UserComponent,
    EditArtistComponent,
    CreateArtistComponent,
    DeleteArtistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ],
  providers: [
    HttpClient,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MatDialog, useValue:{}},
    {provide:MatDialogRef, useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
