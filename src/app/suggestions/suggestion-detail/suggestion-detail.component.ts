import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../../suggestion.service';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrl: './suggestion-detail.component.css'
})
export class SuggestionDetailComponent implements OnInit {

  suggestion: Suggestion | undefined;
  loading: boolean = true;
  error: string = '';

  // Modal
  showModal: boolean = false;
  editingSuggestion: Partial<Suggestion> = {};
  categories = ['Événements', 'Technologie', 'Ressources Humaines', 'Autre'];

  constructor(private route: ActivatedRoute, private suggestionService: SuggestionService, private router: Router) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data) => {
        this.suggestion = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = `Erreur: ${err.status} - ${err.message}`;
        this.loading = false;
      }
    });
  }

  like(s: Suggestion): void {
    this.suggestionService.like(s).subscribe();
  }

  openEditModal(): void {
    if (!this.suggestion) return;
    this.editingSuggestion = {
      title: this.suggestion.title,
      description: this.suggestion.description,
      category: this.suggestion.category,
      status: this.suggestion.status
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingSuggestion = {};
  }

  saveEdit(): void {
    if (!this.suggestion) return;
    this.suggestionService.updateSuggestion(this.suggestion.id, this.editingSuggestion).subscribe(() => {
      this.closeModal();
      const id = this.suggestion!.id;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/suggestions/detail', id]);
      });
    });
  }

}
