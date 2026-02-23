import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {

  searchText: string = '';

  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.suggestions = this.suggestionService.getSuggestions();
    this.favorites = this.suggestionService.getFavorites();
  }

  like(s: Suggestion): void {
    this.suggestionService.like(s);
  }

  isFavorite(s: Suggestion): boolean {
    return this.suggestionService.isFavorite(s);
  }

  addToFavorites(s: Suggestion): void {
    this.suggestionService.addToFavorites(s);
    this.favorites = this.suggestionService.getFavorites(); // Update local copy
  }

  filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.category.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
