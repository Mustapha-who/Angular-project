import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../../suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {

  searchText: string = '';
  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];

  // Modal
  showModal: boolean = false;
  editingSuggestion: Partial<Suggestion> = {};
  editingId: number | null = null;

  categories = ['Événements', 'Technologie', 'Ressources Humaines', 'Autre'];

  constructor(private suggestionService: SuggestionService, private router: Router) {}

  ngOnInit(): void {
    this.suggestionService.getSuggestions().subscribe(data => {
      this.suggestions = data;
    });
    this.favorites = this.suggestionService.getFavorites();
  }

  like(s: Suggestion): void {
    this.suggestionService.like(s).subscribe();
  }

  isFavorite(s: Suggestion): boolean {
    return this.suggestionService.isFavorite(s);
  }

  addToFavorites(s: Suggestion): void {
    this.suggestionService.addToFavorites(s);
    this.favorites = this.suggestionService.getFavorites();
  }

  deleteSuggestion(s: Suggestion): void {
    this.suggestionService.deleteSuggestion(s.id).subscribe(() => {
      this.suggestions = this.suggestions.filter(x => x.id !== s.id);
    });
  }

  openEditModal(s: Suggestion): void {
    this.editingId = s.id;
    this.editingSuggestion = { title: s.title, description: s.description, category: s.category, status: s.status };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingId = null;
    this.editingSuggestion = {};
  }

  saveEdit(): void {
    if (!this.editingId) return;
    this.suggestionService.updateSuggestion(this.editingId, this.editingSuggestion).subscribe(() => {
      this.closeModal();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/suggestions']);
      });
    });
  }

  filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      (s.title?.toLowerCase() ?? '').includes(this.searchText.toLowerCase()) ||
      (s.category?.toLowerCase() ?? '').includes(this.searchText.toLowerCase())
    );
  }
}
