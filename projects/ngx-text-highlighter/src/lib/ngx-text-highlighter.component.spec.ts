import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTextHighlighterComponent } from './ngx-text-highlighter.component';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { MarkerComponent } from './components/marker/marker.component';
import { StoredHighlightsComponent } from './components/stored-highlights/stored-highlights.component';
import { TextareaComponent } from './components/textarea/textarea.component';

describe('NgxTextHighlighterComponent', () => {
  let component: NgxTextHighlighterComponent;
  let fixture: ComponentFixture<NgxTextHighlighterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTextHighlighterComponent, MarkerComponent, TextareaComponent, StoredHighlightsComponent, ColorFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTextHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
