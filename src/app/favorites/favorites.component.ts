import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../models/suggestion';
import { SuggestionService } from '../core/suggestion.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  favorites: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.favorites = this.suggestionService.getFavorites();
  }
}
