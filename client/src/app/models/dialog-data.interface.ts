import { Planet } from './planet.interface';

export interface PlanetDialogData {
    planetToEdit: Planet | null;
    title: string;
    buttonText: string;
}

export interface ConfirmationDialogData {
    title: string;
    name: string;
    action: 'edit' | 'delete' | 'create';
}
