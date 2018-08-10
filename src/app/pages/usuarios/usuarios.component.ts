import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuario: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios());
  }

  mostarModal( id: string) {

    this._modalUploadService.mostrarModal( 'usuarios', id );

  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {

      this.totalRegistros = resp.total;
      this.usuario = resp.usuarios;
      this.cargando = false;
    });

  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
    .subscribe( (usuarios: Usuario[]) => {
      this.usuario = usuarios;
      this.cargando = false;

    });

  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('no se puede borrar', 'no es posible borrarse a si mismo', 'error');
      return;
    } else {
      swal({
        title: 'Estas seguro?',
        text: 'vas a eliminar a ' + usuario.nombre,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borralo!'
      }).then((result) => {
      if (result.value) {
       this._usuarioService.borrarUsuario(usuario._id)
                           .subscribe(borrado => {
                            this.desde = 0;
                            this.cargarUsuarios();

                           });
      }
    });

    }
  }

  actualizarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
        .subscribe();
  }

}
