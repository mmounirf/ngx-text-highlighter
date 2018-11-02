import { Component, OnInit, ViewChild, Inject, EventEmitter, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'th-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})

export class TextareaComponent implements OnInit {
  savedSelection: Range | null;
  selectedText: string;

  @Output() blur: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject (DOCUMENT) private _document: any, private events: EventsService) { }

  ngOnInit() {
    // Listen to events
    this.events.listen().subscribe((event) => {
      // Marker events
      if (event.origin === 'marker' && event.type === 'highlight') {
        // Highlight text
        this.marker(event.color, this.selectedText);
      }
    });
  }

  restoreSelection(): boolean {
    if (this.savedSelection) {
      if (window.getSelection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(this.savedSelection);
        return true;
      } else if (this._document.getSelection) {
        return true;
      }
    } else {
      return false;
    }
  }

  marker(color: string, text: string): void {
    // We have a selection?
    if (this.restoreSelection()) {
      // Execute background color
      this._document.execCommand('hiliteColor', false, color);
      // Trigger stored highlights
      this.events.dispatch({origin: 'textarea', type: 'store', color: color, text: text});
    }
  }
  onTextAreaBlur() {
    // Browser supports getSelection()?
    if (window.getSelection) {
      // Get selection
      const selection = window.getSelection();
      // Browser support range?
      if (selection.getRangeAt && selection.rangeCount) {
        // Get range and selected text
        this.savedSelection = selection.getRangeAt(0);
        this.selectedText = selection.toString();
      }
    } else if (this._document.getSelection && this._document.createRange) {
      this.savedSelection = document.createRange();
    } else {
      this.savedSelection = null;
    }

  }

  // Get selection before blur (for floating marker)
  onSelection($event) {
    const selection = window.getSelection();
    if (selection.type === 'Range') {
      this.events.dispatch({origin: 'textarea', type: 'selection', value: selection});
    }

    // Selection is not a range, means the user just places caret in another place, let's let the floating marker knows about it
    if (selection.type !== 'Range') {
      this.events.dispatch({origin: 'textarea', type: 'blur'});
    }
  }


}


