import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CreatePlanetComponent } from '../../shared/create-planet/create-planet.component';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { PlanetsService } from '../../../services/planets.service';
import {
    ConfirmationDialogData,
    PlanetDialogData,
} from '../../../models/dialog-data.interface';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';

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
    private router = inject(Router);

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
            .subscribe((formData) => {
                if (formData) {
                    this.planetsService.editPlanet(
                        formData,
                        this.planetsService.currentPlanet()?.id
                    );
                }
            });
    }

    public onPlanetDeleteClick(): void {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '400px',
            data: {
                title: 'Confirm deleting',
                name: this.planetsService.currentPlanet()?.planetName,
                action: 'delete',
            } as ConfirmationDialogData,
        });

        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((confirm) => {
                if (confirm) {
                    this.planetsService
                        .deletePlanet(this.planetsService.currentPlanet()?.id)
                        .pipe(take(1))
                        .subscribe(() => {
                            this.router.navigate(['/planets']);
                        });
                }
            });
    }
}
