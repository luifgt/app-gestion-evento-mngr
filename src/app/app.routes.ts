import { Routes } from '@angular/router';
import { ConsultaEventoComponent } from './consulta-evento/consulta-evento.component';
import { EdicionEventoComponent } from './edicion-evento/edicion-evento.component';
import { CreacionEventoComponent } from './creacion-evento/creacion-evento.component';

export const routes: Routes = [
    { path: '', redirectTo: 'v1.0/api/events', pathMatch: 'full' },
    { path: 'v1.0/api/events', component: ConsultaEventoComponent },
    { path: 'v1.0/api/events/create', component: CreacionEventoComponent },
    { path: 'v1.0/api/events/:id', component: EdicionEventoComponent },
    { path: '**', redirectTo: 'v1.0/api/events' }
];