import {
    ChangeDetectionStrategy,
    Component,
    input,
    output,
} from '@angular/core';
import { Planet } from '../../models/planet.interface';

@Component({
    selector: 'app-planets-grid',
    standalone: true,
    imports: [],
    templateUrl: './planets-grid.component.html',
    styleUrl: './planets-grid.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsGridComponent {
    public planets = input.required<Planet[]>();
    public navigateToDetails = output<Planet>();

    public onRowClick(planet: Planet) {
        this.navigateToDetails.emit(planet);
    }
}
