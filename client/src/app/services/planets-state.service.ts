import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PlanetsStateService {
    public isGridView = signal(true);
}
