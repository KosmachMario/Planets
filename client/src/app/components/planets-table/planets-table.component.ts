import { DecimalPipe } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Planet } from '../../models/planet.interface';

@Component({
    selector: 'app-planets-table',
    standalone: true,
    imports: [MatTableModule, DecimalPipe],
    templateUrl: `./planets-table.component.html`,
    styleUrl: './planets-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsTableComponent {
    public planets = input.required<Planet[]>();

    public displayedColumns: string[] = [
        'planetName',
        'planetColor',
        'planetRadiusKM',
        'distanceFromSun',
        'distanceFromEarth',
    ];

    public dataSource = new MatTableDataSource<Planet>();

    constructor() {
        effect(() => {
            this.dataSource.data = this.planets();
        });
    }
}
