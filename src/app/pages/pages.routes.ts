
import { Routes, RouterModule } from '@angular/router';


// import { PagesComponent } from './pages.component';
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
// import { LoginGuardGuard } from '../services/service.index';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { AdminGuard } from '../services/guards/admin.guard';



const pagesRoutes: Routes = [


      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard],
        data: { titulo: 'Dashboard'} },

      { path: 'progress', component: ProgressComponent, canActivate: [ VerificaTokenGuard], data: { titulo: 'ProgressBars'}},
      { path: 'grafico1', component: Grafico1Component, canActivate: [ VerificaTokenGuard], data: { titulo: 'Graficos'}},
      { path: 'promesas', component: PromesasComponent, canActivate: [ VerificaTokenGuard], data: { titulo: 'Promesas'}},
      { path: 'rxjs', component: RxjsComponent, canActivate: [ VerificaTokenGuard], data: { titulo: 'RxJs'} },
      { path: 'account-setting', component: AccountSettingsComponent,  data: { titulo: 'Ajuste de Tema'} },
      { path: 'profile', component: ProfileComponent, canActivate: [ VerificaTokenGuard], data: { titulo: 'Perfil de Usuario'}},
      { path: 'busqueda/:termino', component: BusquedaComponent, canActivate: [ VerificaTokenGuard], data: { titulo: 'Busqueda'}},

      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        data: { titulo: 'Mantenimiento de Usuarios'}},
      { path: 'medicos', component: MedicosComponent, canActivate: [ VerificaTokenGuard], data: { titulo: 'Mantenimiento de Medicos'}},
      { path: 'medico/:id', component: MedicoComponent, canActivate: [ VerificaTokenGuard], data: { titulo: 'Actualizar Medico'}},
      { path: 'hospitales', component: HospitalesComponent, canActivate: [ VerificaTokenGuard], data: { titulo: 'Mantenimiento de Hospitales'}},
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
