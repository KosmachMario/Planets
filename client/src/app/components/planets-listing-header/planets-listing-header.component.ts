import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip, take } from 'rxjs';
import { CreatePlanetComponent } from '../create-planet/create-planet.component';
import { PlanetsService } from '../../services/planets.service';
import { MatDialog } from '@angular/material/dialog';
import { PlanetsStateService } from '../../services/planets-state.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PlanetDialogData } from '../../models/dialog-data.interface';

@Component({
    selector: 'app-planets-listing-header',
    standalone: true,
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    styleUrl: './planets-listing-header.component.scss',
    templateUrl: './planets-listing-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsListingHeaderComponent {
    private planetsStateService = inject(PlanetsStateService);
    private planetsService = inject(PlanetsService);
    private destroyRef = inject(DestroyRef);
    private dialog = inject(MatDialog);

    public isGridView = this.planetsStateService.isGridView;

    public searchControl = new FormControl('');

    public ngOnInit() {
        this.searchControl.valueChanges
            .pipe(
                skip(1),
                takeUntilDestroyed(this.destroyRef),
                debounceTime(100),
                distinctUntilChanged()
            )
            .subscribe((value) => {
                this.planetsService.searchText.set(value || '');
            });
    }

    public setGridView(value: boolean): void {
        this.planetsStateService.isGridView.set(value);
    }

    public onNewPlanetClick(): void {
        const dialogRef = this.dialog.open(CreatePlanetComponent, {
            width: '500px',
            height: '640px',
            data: {
                planetToEdit: null,
                title: 'New planet',
                buttonText: 'Create',
            } as PlanetDialogData,
        });

        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((result: FormData) => {
                if (result) {
                    this.planetsService.createPlanet(result);
                }
            });
    }
}
