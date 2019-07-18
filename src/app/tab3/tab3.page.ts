import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre, Pelicula } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor( private dataLocal: DataLocalService,
               private moviesService: MoviesService ) {}

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    //  this.favoritoGenero = this.pelisPorGenero(this.generos, this.peliculas);
    this.pelisPorGenero(this.generos, this.peliculas);
  }





  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[]) {
    /*let pares: any[] = []; // tendra genero y array de peliculas
    let pelis: PeliculaDetalle[] = []; // contendra peliculas por genero
    let peliculaPorGenero: any[] = [];

    console.log("Obteniendo Generos");
    generos.forEach(element => {
      console.log(element);
      pares['genero'] = element.name;
      peliculas.forEach(element2 => {
        element2.genres.forEach(element3 => {
          if (element.id === element3.id) {
            pelis.push(element2);
          }
        });
      });
      pares['pelis'] = pelis;
      peliculaPorGenero.push(pares);
      pares = [];
      pelis = [];
    });
    console.log("Peliculas por Genero");
    console.log(peliculaPorGenero);
    return peliculaPorGenero;*/
    this.favoritoGenero = [];

    generos.forEach( genero =>{
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id ); 
        })
      });
    });
  }

}
