import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { effect, Injectable, signal } from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    finalize,
    Observable,
    take,
    throwError,
} from 'rxjs';
import { Planet } from '../models/planet.interface';

@Injectable({
    providedIn: 'root',
})
export class PlanetsService {
    private SERVER_DOMAIN = 'http://localhost:3001';

    private _allPlanets = signal<Planet[]>([]);

    private _filteredPlanets = new BehaviorSubject<Planet[]>([]);
    private _loading = new BehaviorSubject<boolean>(false);

    public planets$ = this._filteredPlanets.asObservable();
    public loading$ = this._loading.asObservable();

    public searchText = signal<string>('');

    constructor(private http: HttpClient) {
        effect(
            () => {
                this.filterPlanets(this.searchText(), this._allPlanets());
            },
            { allowSignalWrites: true }
        );
    }

    public loadPlanets(): void {
        this._loading.next(true);

        this.http
            .get<Planet[]>(`${this.SERVER_DOMAIN}/api/planets`)
            .pipe(
                catchError(this.handleError),
                take(1),
                finalize(() => this._loading.next(false))
            )
            .subscribe({
                next: (response) => {
                    this._allPlanets.set(response);
                },
                error: (err) => {
                    this._allPlanets.set([]);
                },
            });
    }

    private filterPlanets(term: string, allPlanets: Planet[]): void {
        if (!term) {
            this._filteredPlanets.next(allPlanets);
            return;
        }

        const termLower = term.toLowerCase();

        const filtered = allPlanets.filter(
            (p) =>
                p.planetName.toLowerCase().includes(termLower) ||
                p.description.toLowerCase().includes(termLower) ||
                p.planetColor.toLowerCase().includes(termLower)
        );

        this._filteredPlanets.next(filtered);
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        console.error('Planets Response Error:', error);
        return throwError(
            () => new Error('Failed to fetch Planets data. Please try again.')
        );
    }
}
