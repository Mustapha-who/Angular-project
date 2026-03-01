import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuggestionService } from '../../suggestion.service';

@Component({
  selector: 'app-add-suggestion',
  templateUrl: './add-suggestion.component.html',
  styleUrl: './add-suggestion.component.css'
})
export class AddSuggestionComponent {

  suggestionForm: FormGroup;

  categories = ['Événements', 'Technologie', 'Ressources Humaines', 'Autre'];

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService,
    private router: Router
  ) {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.value;
      const newSuggestion = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(formValue.date),
        status: 'pending',
        nbLikes: 0
      };

      this.suggestionService.addSuggestion(newSuggestion).subscribe(() => {
        this.router.navigate(['/suggestions']);
      });
    }
  }

  get title() { return this.suggestionForm.get('title'); }
  get description() { return this.suggestionForm.get('description'); }
  get category() { return this.suggestionForm.get('category'); }
  get date() { return this.suggestionForm.get('date'); }
}
