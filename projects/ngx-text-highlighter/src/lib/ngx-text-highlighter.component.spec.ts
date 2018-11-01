import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTextHighlighterComponent } from './ngx-text-highlighter.component';

describe('NgxTextHighlighterComponent', () => {
  let component: NgxTextHighlighterComponent;
  let fixture: ComponentFixture<NgxTextHighlighterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTextHighlighterComponent ]
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
