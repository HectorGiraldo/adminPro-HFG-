import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';


// Modulo
import { SharedModule } from '../shared/shared.module';

// Ng2Charts
import { ChartsModule } from 'ng2-charts';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafico1Component } from './grafico1/grafico1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonasComponent } from '../components/grafico-donas/grafico-donas.component';





@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafico1Component,
    IncrementadorComponent,
    GraficoDonasComponent,
    AccountSettingsComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Grafico1Component],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule]
})
export class PagesModule {}
