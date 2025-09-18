import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlanetsHeaderComponent } from '../planets-header/planets-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-planets-wrapper',
    standalone: true,
    imports: [PlanetsHeaderComponent, RouterOutlet],
    templateUrl: './planets-wrapper.component.html',
    styleUrl: './planets-wrapper.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsWrapperComponent {}
