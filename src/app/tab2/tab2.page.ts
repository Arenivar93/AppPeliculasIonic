import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avenger', 'El Señor de los anillos', 'Jonh Wick'];
  peliculas: Pelicula[] = [];
  banderaSpiner = false;


  constructor( private movieService: MoviesService,
               private modalCtrl: ModalController) {}

  buscar( event ) {
    this.banderaSpiner = true;
    console.log(event);
    const valor = event.detail.value;
    if (valor === '') {
      console.log('vacio');
      this.peliculas = [];
      this.banderaSpiner = false;
      this.textoBuscar = '';
      return;
    }
    this.movieService.getPeliculaByName(valor)
      .subscribe( resp => {
        console.log('Resp', resp);
        // tslint:disable-next-line: no-string-literal
        this.peliculas = resp['results'];
        this.banderaSpiner = false;
      } );
  }

  async verDetalle( id: string ) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
