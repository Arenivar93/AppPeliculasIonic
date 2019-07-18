import { Component, OnInit, Input } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };
  estrella = 'star-outline';

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private dataLocal: DataLocalService) { }

  async ngOnInit() {
    // console.log("ID", this.id);

    this.dataLocal.existePelicula( this .id )
      .then( existe => this.estrella = (existe) ? 'star' : 'star-outline');


    this.moviesService.getPeliculaDetalle( this.id )
      .subscribe( resp => {
        console.log( resp );
        this.pelicula = resp;
      });
    this.moviesService.getActoresPelicula( this.id )
      .subscribe( resp => {
        console.log( resp );
        this.actores = resp.cast;
      });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.pelicula );

    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
