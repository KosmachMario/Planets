import { Routes } from '@angular/router';
import { PlanetsWrapperComponent } from './components/planets-wrapper/planets-wrapper.component';

export const routes: Routes = [
    { path: '', component: PlanetsWrapperComponent },
    { path: '**', redirectTo: '' },
];
