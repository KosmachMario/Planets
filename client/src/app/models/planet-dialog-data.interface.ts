import { Planet } from './planet.interface';

export interface PlanetDialogData {
    planetToEdit: Planet | null;
    title: string;
    buttonText: string;
}
