import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-planets-listing',
    standalone: true,
    imports: [],
    templateUrl: './planets-listing.component.html',
    styleUrl: './planets-listing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsListingComponent {}
