import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetsService } from '../../services/planets.service';
import { Observable, of } from 'rxjs';
import { Planet } from '../../models/planet.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlanetsStateService } from '../../services/planets-state.service';

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
    private readonly planetsService = inject(PlanetsService);
    private readonly planetsStateService = inject(PlanetsStateService);

    private planetId = this.route.snapshot.paramMap.get('id');
    private planetName = this.route.snapshot.paramMap.get('planetName') || '';

    public planet$ = toSignal(this.getPlanet(), {
        initialValue: null,
    });

    public ngOnInit(): void {
        this.planetsStateService.headerTitle.set(this.planetName);
        this.planetsStateService.isDetailsView.set(true);
    }

    private getPlanet(): Observable<Planet | null> {
        if (!this.planetId) {
            return of(null);
        }

        return this.planetsService.getPlanet(this.planetId);
    }
}
