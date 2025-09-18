import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PlanetsStateService {
    public headerTitle = signal('');
    public isGridView = signal(true);
    public isDetailsView = signal(false);
}
