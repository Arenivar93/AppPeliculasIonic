import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor( private http: HttpClient ) { }

  getFeature() {

    // tslint:disable-next-line: max-line-length
    return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-06-01&primary_release_date.lte=2019-06-30&api_key=d6565558687f1c80ba990dd9a2e43d54&language=es&include_image_language=es`);
  }
}
