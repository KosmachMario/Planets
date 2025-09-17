import { Routes } from '@angular/router';
import { PlanetsWrapperComponent } from './components/planets-wrapper/planets-wrapper.component';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
import { PlanetsListingComponent } from './components/planets-listing/planets-listing.component';

export const routes: Routes = [
    {
        path: '',
        component: PlanetsWrapperComponent,
        children: [
            {
                path: '',
                redirectTo: 'planets',
                pathMatch: 'full',
            },
            {
                path: 'planets',
                component: PlanetsListingComponent,
            },
            {
                path: 'planets/:planetName/:id',
                component: PlanetDetailsComponent,
            },
        ],
    },
    { path: '**', redirectTo: '' },
];
