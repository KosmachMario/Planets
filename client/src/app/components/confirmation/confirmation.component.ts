import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../models/dialog-data.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-confirmation',
    standalone: true,
    imports: [MatDialogModule, MatButton, MatIcon],
    styleUrl: './confirmation.component.scss',
    templateUrl: './confirmation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
    public dialogRef = inject(MatDialogRef<ConfirmationComponent>);
    public data: ConfirmationDialogData = inject(MAT_DIALOG_DATA);
}
