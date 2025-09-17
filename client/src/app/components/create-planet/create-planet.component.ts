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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Planet } from '../../models/planet.interface';

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
    }

    public onSubmit(): void {
        if (this.planetForm.valid) {
            const planetData: Planet = this.planetForm.value;

            const formData = new FormData();

            formData.append('planetName', planetData.planetName);
            formData.append('planetColor', planetData.planetColor);
            formData.append('description', planetData.description);
            formData.append(
                'planetRadiusKM',
                planetData.planetRadiusKM.toString()
            );

            formData.append(
                'distInMillionsKM[fromSun]',
                planetData.distInMillionsKM.fromSun.toString()
            );
            formData.append(
                'distInMillionsKM[fromEarth]',
                planetData.distInMillionsKM.fromEarth.toString()
            );

            if (this.selectedFile) {
                formData.append(
                    'file',
                    this.selectedFile,
                    this.selectedFile.name
                );
            }

            this.dialogRef.close(formData);
        } else {
            this.planetForm.markAllAsTouched();
        }
    }
}
