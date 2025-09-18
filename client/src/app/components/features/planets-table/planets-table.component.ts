import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    output,
    ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Planet } from '../../../models/planet.interface';

@Component({
    selector: 'app-planets-table',
    standalone: true,
    imports: [MatTableModule, MatSortModule],
    templateUrl: `./planets-table.component.html`,
    styleUrl: './planets-table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsTableComponent implements AfterViewInit {
    @ViewChild(MatSort) sort!: MatSort;

    public planets = input.required<Planet[]>();
    public navigateToDetails = output<Planet>();

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

    public ngAfterViewInit(): void {
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'distanceFromSun':
                    return Number(item.distInMillionsKM.fromSun);
                case 'distanceFromEarth':
                    return Number(item.distInMillionsKM.fromEarth);
                default:
                    return (item as any)[property];
            }
        };
        this.dataSource.sort = this.sort;
    }

    public onRowClick(planet: Planet) {
        this.navigateToDetails.emit(planet);
    }
}
