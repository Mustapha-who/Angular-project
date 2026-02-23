import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListSuggestionComponent } from '../core/list-suggestion/list-suggestion.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';
import { AddSuggestionComponent } from './add-suggestion/add-suggestion.component';

const routes: Routes = [
  { path: '', component: ListSuggestionComponent },
  { path: 'detail/:id', component: SuggestionDetailComponent },
  { path: 'add', component: AddSuggestionComponent }
];

@NgModule({
  declarations: [ListSuggestionComponent, SuggestionDetailComponent, AddSuggestionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SuggestionsModule { }