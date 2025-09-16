import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-planets-header',
    standalone: true,
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './planets-header.component.html',
    styleUrl: './planets-header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsHeaderComponent {}
