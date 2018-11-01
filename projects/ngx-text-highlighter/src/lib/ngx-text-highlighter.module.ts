import { NgModule } from '@angular/core';
import { NgxTextHighlighterComponent } from './ngx-text-highlighter.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { StoredHighlightsComponent } from './components/stored-highlights/stored-highlights.component';
import { MarkerComponent } from './components/marker/marker.component';
import { CommonModule } from '@angular/common';
import { EventsService } from './services/events.service';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxTextHighlighterComponent,
    TextareaComponent,
    StoredHighlightsComponent,
    MarkerComponent,
    SafeHtmlPipe
  ],
  exports: [NgxTextHighlighterComponent]
})
export class NgxTextHighlighterModule { }
