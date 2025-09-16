import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    private _planets = new BehaviorSubject<Planet[]>([]);
    private _loading = new BehaviorSubject<boolean>(false);

    public planets$ = this._planets.asObservable();
    public loading$ = this._loading.asObservable();

    constructor(private http: HttpClient) {}

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
                    this._planets.next(response);
                },
                error: (err) => {
                    this._planets.next([]);
                },
            });
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        console.error('Planets Response Error:', error);
        return throwError(
            () => new Error('Failed to fetch Planets data. Please try again.')
        );
    }
}
