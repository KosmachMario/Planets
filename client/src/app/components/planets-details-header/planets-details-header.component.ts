import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-planets-details-header',
    standalone: true,
    imports: [MatButtonModule],
    styleUrl: './planets-details-header.component.scss',
    templateUrl: './planets-details-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsDetailsHeaderComponent {
    public onPlanetEditClick(): void {}

    public onPlanetDeleteClick(): void {}
}
