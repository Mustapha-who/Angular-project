import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ListSuggestionComponent,
    HeaderComponent,
    FooterComponent,
    SuggestionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
