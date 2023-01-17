import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DocumentListComponent } from './projecte/components/document-list/document-list.component';
import { DocumentComponent } from './projecte/components/document/document.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
