import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PlanetsDetailsHeaderComponent } from '../../features/planets-details-header/planets-details-header.component';
import { PlanetsStateService } from '../../../services/planets-state.service';
import { PlanetsListingHeaderComponent } from '../../features/planets-listing-header/planets-listing-header.component';

@Component({
    selector: 'app-planets-header',
    standalone: true,
    imports: [PlanetsListingHeaderComponent, PlanetsDetailsHeaderComponent],
    templateUrl: './planets-header.component.html',
    styleUrl: './planets-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsHeaderComponent {
    private planetsStateService = inject(PlanetsStateService);

    public isGridView = this.planetsStateService.isGridView;
    public isDetailsView = this.planetsStateService.isDetailsView;
    public headerTitle = this.planetsStateService.headerTitle;
}
