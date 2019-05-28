import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subir-archivo/subir-archivos.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {

  totalHospitales:  number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivosService,
    public _usuarioService: UsuarioService
  ) {
    this._usuarioService.cargarStorage();
  }


  cargarHospital() {

    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
                    .map ((resp: any) => {
                      this.totalHospitales = resp.total;
                      return resp.hospitales;
                    });

  }

  obtenerHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .map((resp: any) => resp.hospital);

  }

  borrarHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .map(resp => {
        swal(
          'Hospital Borrado!',
          'el hospital fue eliminado correctamente',
          'success'
        );
      });

  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre})
      .map((resp: any) => resp.hospital);

  }

  buscarHospital(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.hospital);

  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;

    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
      .map((resp: any) => resp.hospital );

      // {

      //   if (hospital._id === hospital._id) {
      //     let hospitalDB: Hospital = resp.hospital;

      //   }


      //   swal('hospital Actualizado!', hospital.nombre, 'success');

      //   return true;
      // });
  }
}
