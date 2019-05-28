import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

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
      .subscribe(resp => this.cargarHospital());
  }

  mostarModal(id: string) {

    this._modalUploadService.mostrarModal('usuarios', id);

  }

  cargarHospital() {
    this._hospitalService.cargarHospital()
        .subscribe(hospitales => this.hospitales = hospitales);
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

  }

  borrarHospital(hospital: Hospital) {
   }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  
}
