import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dasboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/grafico1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RXJS', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-account',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Medicos', url: '/medicos'},
        {titulo: 'Hospitales', url: '/hospitales'}
      ]
    }
  ];

  constructor() {}
}
