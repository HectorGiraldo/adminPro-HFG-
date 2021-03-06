import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivosService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivosService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImagen(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'el archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;


  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
        .then(resp => {

          this._modalUploadService.notificacion.emit(resp);
          this.cerrarModal();
        })
        .catch (err => {
          console.log('error en la carga...', err);
        });
  }

}
