import { Routes } from '@angular/router';
import { PlanetsWrapperComponent } from './components/layout/planets-wrapper/planets-wrapper.component';
import { PlanetsListingComponent } from './components/pages/planets-listing/planets-listing.component';
import { PlanetDetailsComponent } from './components/pages/planet-details/planet-details.component';

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
