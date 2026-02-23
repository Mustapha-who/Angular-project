import { Routes } from '@angular/router';
import { SuggestionsListComponent } from './suggestions-list/suggestions-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';

export const SUGGESTIONS_ROUTES: Routes = [
  {
    path: '',
    component: SuggestionsListComponent
  },
  {
    path: ':id',
    component: SuggestionDetailsComponent
  }
];
