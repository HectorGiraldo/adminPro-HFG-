
import { Routes, RouterModule } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafico1Component } from './grafico1/grafico1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { MedicoComponent } from './medicos/medico.component';


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars'}},
      { path: 'grafico1', component: Grafico1Component, data: { titulo: 'Graficos'}},
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
      { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Ajuste de Tema'} },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario'}},

      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios'}},
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos'}},
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico'}},
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales'}},
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
