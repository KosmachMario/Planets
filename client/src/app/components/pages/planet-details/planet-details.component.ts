import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { PlanetsService } from '../../../services/planets.service';
import { PlanetsStateService } from '../../../services/planets-state.service';

@Component({
    selector: 'app-planet-details',
    standalone: true,
    imports: [],
    styleUrl: './planet-details.component.scss',
    templateUrl: './planet-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetDetailsComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly planetsService = inject(PlanetsService);
    private readonly planetsStateService = inject(PlanetsStateService);

    private planetId = this.route.snapshot.paramMap.get('id');
    private planetName = this.route.snapshot.paramMap.get('planetName') || '';

    public planet$ = this.planetsService.currentPlanet;

    constructor() {
        effect(
            () => {
                this.planetsStateService.headerTitle.set(
                    this.planet$()?.planetName || this.planetName || ''
                );
            },
            { allowSignalWrites: true }
        );
    }

    public ngOnInit(): void {
        this.planetsService
            .getPlanet(this.planetId)
            .pipe(take(1))
            .subscribe((planet) => {
                if (!planet) {
                    this.router.navigate(['/planets']);
                }
            });
        this.planetsStateService.isDetailsView.set(true);
    }
}
