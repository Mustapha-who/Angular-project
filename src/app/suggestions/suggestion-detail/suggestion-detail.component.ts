import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../../core/suggestion.service';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrl: './suggestion-detail.component.css'
})
export class SuggestionDetailComponent implements OnInit {

  suggestion: Suggestion | undefined;

  constructor(private route: ActivatedRoute, private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.suggestion = this.suggestionService.getSuggestionById(id);
  }

  like(s: Suggestion): void {
    this.suggestionService.like(s);
  }

}
