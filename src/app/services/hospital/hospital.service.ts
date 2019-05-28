import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert2';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subir-archivo/subir-archivos.service';
=======
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {

<<<<<<< HEAD
  totalHospitales:  number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivosService,
=======
  // totalHospitales:  number = 0;


  constructor(
    public http: HttpClient,
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
    public _usuarioService: UsuarioService
  ) {
    this._usuarioService.cargarStorage();
  }


<<<<<<< HEAD
  cargarHospital() {

    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
                    .map ((resp: any) => {
                      this.totalHospitales = resp.total;
                      return resp.hospitales;
                    });
=======
  cargarHospital(desde: number = 0) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
                    // .map ((resp: any) => {
                    //   this.totalHospitales = resp.total;
                    //   return resp.hospitales;
                    // });
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574

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

<<<<<<< HEAD
    return this.http.post(url, {nombre})
      .map((resp: any) => resp.hospital);

  }
=======
    return this.http.post(url, { nombre })
      .map((resp: any) => resp.hospital);

    }

>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574

  buscarHospital(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
<<<<<<< HEAD
      .map((resp: any) => resp.hospital);
=======
      .map((resp: any) => resp.hospitales);
>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574

  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
<<<<<<< HEAD

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
=======
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
      .map((resp: any) => {
        swal(
          'Hospital actualizado!',
          hospital.nombre +  ' fue actualizado correctamente',
          'success'
        );
        return resp.hospital;
      });

    }

>>>>>>> c1b8ee14df700760764eeb17282826bb3913e574
}
