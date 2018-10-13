import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean;
  totalRegistros: number = 0;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
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
    this.cargarMedicos();

  }

  cargarMedicos() {
    this.cargando = true;

    this._medicoService.cargarMedicos(this.desde)
        .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.medicos = resp.medicos;
          this.cargando = false;

        });

  }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
        this.cargarMedicos();
        return;
    }

    this._medicoService.buscarMedico(termino)
        .subscribe( medicos => this.medicos = medicos );
  }

  borrarMedico ( medico: Medico) {
    this._medicoService.borrarMedico(medico._id)
        .subscribe(() => this.cargarMedicos());
  }

  editarMedico(medico: Medico) {

  }



}
