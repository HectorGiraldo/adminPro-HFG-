import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subir-archivo/subir-archivos.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivosService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
          .map((resp: any) => {
            this.token = resp.token;
            localStorage.setItem('token', this.token);
            console.log( 'token renovado');
            return true;
          })
          .catch( err => {
            this.router.navigate(['/login']);
            swal('Error renovando el token!', 'no fue posible renovar el token', 'error');
            return Observable.throw( err );

           });
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
        .map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

          return true;
        });
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
               .map( (resp: any) => {
                 this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                 return true;
               })
               .catch( err => {
                swal('Error en el login!', err.error.mensaje, 'error');
                return Observable.throw( err );

               });
  }

  crearUsuario( usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
               .map((resp: any) => {
                 swal('Usuario Creado!', usuario.email, 'success');
                 return resp.usuario;
               })
               .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error');
                return Observable.throw( err );

               });

  }

  actualizarUsuario ( usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;

    url += '?token=' + this.token;

    return this.http.put(url, usuario)
               .map( (resp: any) => {

                if (usuario._id === this.usuario._id) {
                  let usuarioDB: Usuario = resp.usuario;

                  this.guardarStorage(usuarioDB._id, this.token, usuarioDB, resp.menu);
                }


                swal('Usuario Actualizado!', usuario.nombre, 'success');

                return true;
               })
               .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error');
                return Observable.throw( err );

               });
  }

  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
        .then((resp: any) => {
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizado!', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario, this.menu);
        })
        .catch(resp => {
          console.log(resp);
        });
  }

  cargarUsuarios( desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);

  }

  buscarUsuarios( termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
    .map((resp: any) => resp.usuarios);

  }

  borrarUsuario(id: string) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
                    .map( resp => {
                      swal(
                        'Usuario Borrado!',
                        'el usuario fue eliminado correctamente',
                        'success'
                      );
                      return true;
                    });

  }



}
