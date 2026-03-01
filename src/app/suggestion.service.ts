import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Suggestion } from './models/suggestion';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private apiUrl = `${environment.apiUrl}/suggestions`;

  favorites: Suggestion[] = [];

  constructor(private http: HttpClient) {}

  getSuggestions(): Observable<Suggestion[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.suggestions ?? res)
    );
  }

  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.suggestion ?? res)
    );
  }

  updateSuggestion(id: number, data: Partial<Suggestion>): Observable<Suggestion> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data).pipe(
      map(res => res.suggestion ?? res)
    );
  }

  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addSuggestion(s: Partial<Suggestion>): Observable<Suggestion> {
    return this.http.post<any>(this.apiUrl, s).pipe(
      map(res => res.suggestion ?? res)
    );
  }

  like(s: Suggestion): Observable<Suggestion> {
    return this.http.put<any>(`${this.apiUrl}/${s.id}/like`, {}).pipe(
      map(res => res.suggestion ?? res),
      tap(updated => s.nbLikes = updated.nbLikes)
    );
  }

  addToFavorites(s: Suggestion): void {
    if (!this.isFavorite(s)) {
      this.favorites.push(s);
    }
  }

  isFavorite(s: Suggestion): boolean {
    return this.favorites.some(f => f.id === s.id);
  }

  getFavorites(): Suggestion[] {
    return this.favorites;
  }
}
