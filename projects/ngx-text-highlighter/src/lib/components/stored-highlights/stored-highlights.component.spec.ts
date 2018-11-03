import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredHighlightsComponent } from './stored-highlights.component';
import { ColorFilterPipe } from '../../pipes/color-filter.pipe';

describe('StoredHighlightsComponent', () => {
  let component: StoredHighlightsComponent;
  let fixture: ComponentFixture<StoredHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredHighlightsComponent, ColorFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
