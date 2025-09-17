import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CreatePlanetComponent } from '../create-planet/create-planet.component';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { PlanetsService } from '../../services/planets.service';
import { PlanetDialogData } from '../../models/planet-dialog-data.interface';

@Component({
    selector: 'app-planets-details-header',
    standalone: true,
    imports: [MatButtonModule],
    styleUrl: './planets-details-header.component.scss',
    templateUrl: './planets-details-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsDetailsHeaderComponent {
    private dialog = inject(MatDialog);
    private planetsService = inject(PlanetsService);

    public onPlanetEditClick(): void {
        const dialogRef = this.dialog.open(CreatePlanetComponent, {
            width: '500px',
            height: '640px',
            data: {
                planetToEdit: this.planetsService.currentPlanet(),
                title: 'Edit planet',
                buttonText: 'Confirm',
            } as PlanetDialogData,
        });

        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(({ formData, id }) => {
                if (formData) {
                    this.planetsService.editPlanet(formData, id);
                }
            });
    }

    public onPlanetDeleteClick(): void {}
}
