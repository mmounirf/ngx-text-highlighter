import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredHighlightsComponent } from './stored-highlights.component';
import { ColorFilterPipe } from '../../pipes/color-filter.pipe';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('StoredHighlightsComponent', () => {
  let component: StoredHighlightsComponent;
  let fixture: ComponentFixture<StoredHighlightsComponent>;
  let message: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredHighlightsComponent, ColorFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredHighlightsComponent);
    component = fixture.componentInstance;
    message = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all items if no filter selected', () => {
    const colorFilterPipe = new ColorFilterPipe();
    const selectedFilters = [];
    expect(component.store === colorFilterPipe.transform(component.store, selectedFilters));
  });

  it('should show appropriate message when selected filter found no matches', () => {
    const colorFilterPipe = new ColorFilterPipe();
    const messageText = message.query(By.css('.storage-list > span'));

    if (colorFilterPipe.transform(component.store, component.selectedFilters).length < 1 && component.store.length > 1) {
      expect(messageText.nativeElement.innerText).toBe('No items matches the selected filter');
    }
    if (component.store.length < 1) {
      expect(messageText.nativeElement.innerText).toBe('You\'ve no highlighted items');
    }
  });
});
