import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredHighlightsComponent } from './stored-highlights.component';

describe('StoredHighlightsComponent', () => {
  let component: StoredHighlightsComponent;
  let fixture: ComponentFixture<StoredHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredHighlightsComponent ]
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
