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

@Component({
    selector: 'app-planets-listing',
    standalone: true,
    imports: [PlanetsTableComponent, PlanetsGridComponent],
    templateUrl: './planets-listing.component.html',
    styleUrl: './planets-listing.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsListingComponent implements OnInit {
    public planetsStateService = inject(PlanetsStateService);
    private planetsService = inject(PlanetsService);

    public isGridView = this.planetsStateService.isGridView;

    public planets: Signal<Planet[]>;

    constructor() {
        this.planets = toSignal(this.planetsService.planets$, {
            initialValue: [],
        });
    }

    public ngOnInit(): void {
        this.planetsService.loadPlanets();
    }
}
