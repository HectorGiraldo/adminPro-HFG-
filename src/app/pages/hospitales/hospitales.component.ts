import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
=======

>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospital();

    this._modalUploadService.notificacion
<<<<<<< HEAD
<<<<<<< HEAD
      .subscribe(resp => this.cargarHospital());
  }

  mostarModal(id: string) {

    this._modalUploadService.mostrarModal('usuarios', id);

  }

  cargarHospital() {
    this._hospitalService.cargarHospital()
        .subscribe(hospitales => this.hospitales = hospitales);
=======
        .subscribe( resp => this.cargarHospital());
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
=======
        .subscribe( resp => this.cargarHospital());
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospital();

  }

  buscarHospital(termino: string) {

<<<<<<< HEAD
<<<<<<< HEAD
  }

  borrarHospital(hospital: Hospital) {
   }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
=======
=======
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
    if (termino.length <= 0) {
        this.cargarHospital();
        return;
    }

    this._hospitalService.buscarHospital(termino)
        .subscribe( hospitales => this.hospitales = hospitales );
  }

  cargarHospital() {
    this.cargando = true;
    this._hospitalService.cargarHospital(this.desde)
        .subscribe( (resp: any) => {
           this.hospitales = resp.hospitales;
           this.totalRegistros = resp.total;
           this.cargando = false;
          } );

  }

  crearHospital() {

    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear!'
    }).then(result => {
      if (!result.value || result.value.length === 0) {
        return;
      } else {
        swal(
          'Hospital Creado!',
          'Tu has creado un nuevo hospital.',
          'success'
        );
        this._hospitalService.crearHospital(result.value)
            .subscribe(() => this.cargarHospital());
      }
    });

  }

  actualizarHospital( hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
        .subscribe(() => this.cargarHospital());

  }

  borrarHospital ( hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id)
        .subscribe(() => this.cargarHospital());
  }

  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
<<<<<<< HEAD
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
=======
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
  }

  
}
