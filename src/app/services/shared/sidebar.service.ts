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
    }
  ];

  constructor() {}
}
