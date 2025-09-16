import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PlanetsStateService } from '../../services/planets-state.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlanetsService } from '../../services/planets.service';

@Component({
    selector: 'app-planets-header',
    standalone: true,
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './planets-header.component.html',
    styleUrl: './planets-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsHeaderComponent implements OnInit {
    private planetsStateService = inject(PlanetsStateService);
    private planetsService = inject(PlanetsService);
    private destroyRef = inject(DestroyRef);

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

    public onNewPlanetClick(): void {}
}
