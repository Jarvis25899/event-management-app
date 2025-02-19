import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full',
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        component: EventListComponent,
      },
      {
        path: 'create',
        component: EditEventComponent,
      },
      {
        path: 'view/:id',
        component: EventDetailsComponent,
      },
      {
        path: 'edit/:id',
        component: EditEventComponent,
      },
    ],
  },
];
