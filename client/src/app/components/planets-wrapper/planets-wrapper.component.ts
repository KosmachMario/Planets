import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlanetsHeaderComponent } from '../planets-header/planets-header.component';
import { PlanetsListingComponent } from '../planets-listing/planets-listing.component';

@Component({
    selector: 'app-planets-wrapper',
    standalone: true,
    imports: [PlanetsHeaderComponent, PlanetsListingComponent],
    templateUrl: './planets-wrapper.component.html',
    styleUrl: './planets-wrapper.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsWrapperComponent {}
