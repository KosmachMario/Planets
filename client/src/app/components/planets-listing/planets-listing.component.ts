import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Planet } from '../../models/planet.interface';
import { PlanetsService } from '../../services/planets.service';
import { PlanetsTableComponent } from '../planets-table/planets-table.component';
import { PlanetsStateService } from '../../services/planets-state.service';
import { PlanetsGridComponent } from '../planets-grid/planets-grid.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-planets-listing',
    standalone: true,
    imports: [PlanetsTableComponent, PlanetsGridComponent],
    templateUrl: './planets-listing.component.html',
    styleUrl: './planets-listing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsListingComponent implements OnInit {
    private readonly planetsStateService = inject(PlanetsStateService);
    private readonly planetsService = inject(PlanetsService);
    private readonly router = inject(Router);

    public isGridView = this.planetsStateService.isGridView;

    public planets: Signal<Planet[]> = toSignal(this.planetsService.planets$, {
        initialValue: [],
    });

    public ngOnInit(): void {
        this.planetsStateService.headerTitle.set('Planets');
        this.planetsStateService.isDetailsView.set(false);
        this.planetsService.loadPlanets();
    }

    public onNavigateToDetails(planet: Planet): void {
        this.router.navigate(['/planets', planet.planetName, planet.id]);
    }
}
