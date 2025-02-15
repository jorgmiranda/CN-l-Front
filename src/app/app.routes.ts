import { Routes } from '@angular/router';
import { FailedComponent } from './failed/failed.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { ListarPacientesComponent } from './components/listar-pacientes/listar-pacientes.component';
import { ListarAlertasComponent } from './components/listar-alertas/listar-alertas.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'listar-pacientes',
    component: ListarPacientesComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'listar-alertas',
    component: ListarAlertasComponent,
    canActivate: [MsalGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login-failed',
    component: FailedComponent,
  },
];
