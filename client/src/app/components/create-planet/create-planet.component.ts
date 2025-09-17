import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Planet } from '../../models/planet.interface';
import {
    ConfirmationDialogData,
    PlanetDialogData,
} from '../../models/dialog-data.interface';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { take } from 'rxjs';

@Component({
    selector: 'app-create-planet',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButton,
        MatFormField,
        MatInput,
        CdkTextareaAutosize,
        ReactiveFormsModule,
    ],
    templateUrl: './create-planet.component.html',
    styleUrl: './create-planet.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanetComponent {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<CreatePlanetComponent>);
    private dialog = inject(MatDialog);

    public data: PlanetDialogData = inject(MAT_DIALOG_DATA);

    public planetForm: FormGroup;

    public imageUrl = signal<string | null>(null);
    public selectedFile: File | null = null;

    constructor() {
        this.planetForm = this.fb.group({
            planetName: ['', Validators.required],
            description: ['', Validators.required],
            planetColor: ['', Validators.required],
            planetRadiusKM: [null, [Validators.required, Validators.min(1)]],
            distInMillionsKM: this.fb.group({
                fromSun: [null, [Validators.required, Validators.min(0)]],
                fromEarth: [null, [Validators.required, Validators.min(0)]],
            }),
        });

        if (this.data.planetToEdit) {
            this.planetForm.patchValue(this.data.planetToEdit);
            this.imageUrl.set(this.data.planetToEdit.imageUrl);
        }
    }

    public onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;

        if (!input.files || input.files.length === 0) return;

        this.selectedFile = input.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl.set(reader.result as string);
        };
        reader.readAsDataURL(this.selectedFile);

        this.planetForm.markAsDirty();
    }

    public onSubmit(): void {
        if (this.planetForm.valid) {
            this.checkConfirmationAndExecute();
        } else {
            this.planetForm.markAllAsTouched();
        }
    }

    private checkConfirmationAndExecute(): void {
        const action = this.data.planetToEdit ? 'edit' : 'create';
        const confirmationTitle = this.data.planetToEdit
            ? 'editing'
            : 'creating';

        const dialogRef = this.dialog.open(ConfirmationComponent, {
            width: '400px',
            data: {
                title: `Confirm ${confirmationTitle}`,
                name: this.planetForm.value.planetName,
                action,
            } as ConfirmationDialogData,
        });

        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((confirm) => {
                if (confirm) {
                    const planetData: Planet = this.planetForm.value;

                    const formData = this.generateFormData(planetData);

                    this.dialogRef.close(formData);
                }
            });
    }

    private generateFormData(planetData: Planet): FormData {
        const formData = new FormData();

        formData.append('planetName', planetData.planetName);
        formData.append('planetColor', planetData.planetColor);
        formData.append('description', planetData.description);
        formData.append('planetRadiusKM', planetData.planetRadiusKM.toString());

        formData.append(
            'distInMillionsKM[fromSun]',
            planetData.distInMillionsKM.fromSun.toString()
        );
        formData.append(
            'distInMillionsKM[fromEarth]',
            planetData.distInMillionsKM.fromEarth.toString()
        );

        if (this.selectedFile) {
            formData.append('file', this.selectedFile, this.selectedFile.name);
        } else if (this.data.planetToEdit?.imageUrl) {
            formData.append('imageName', this.data.planetToEdit.imageName);
            formData.append('imageUrl', this.data.planetToEdit.imageUrl);
        }
        return formData;
    }
}
