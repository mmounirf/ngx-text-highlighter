import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'th-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})

export class TextareaComponent implements OnInit {
  constructor(protected events: EventsService, private sanitizer: DomSanitizer) { }
  content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet facilisis dui, a finibus dui. Donec dignissim, justo at placerat maximus, urna turpis viverra urna, at hendrerit dui sem sed quam. Donec tincidunt magna quis tortor dignissim, at condimentum turpis lacinia. Aenean id turpis sit amet lacus semper sollicitudin. Nullam gravida erat vitae posuere sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Fusce nec sapien sagittis, tincidunt tortor quis, ultricies magna. Nullam nulla erat, laoreet non neque et, bibendum ornare nisl. Aliquam nisl massa, lobortis non metus quis, hendrerit rutrum enim. Nullam in lorem ut diam varius rutrum eget consectetur est. Aliquam quis velit iaculis, vehicula lectus a, imperdiet arcu. In sodales dolor eu erat tincidunt, et cursus dui vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus sed congue tellus. Quisque pulvinar felis aliquam nunc ultrices ullamcorper. Proin eget lacus at massa ullamcorper suscipit. Sed bibendum purus lorem, at ornare est aliquet dictum. Nulla eleifend eros congue nulla luctus auctor. Donec malesuada consectetur vestibulum. Suspendisse ut neque ac risus eleifend tempus sit amet quis turpis. Praesent tincidunt bibendum egestas. Integer porta accumsan metus, nec finibus justo fermentum ac. Nulla facilisi. Pellentesque erat augue, congue nec est ac, bibendum congue libero. Maecenas venenatis vel lacus in mollis. Ut sollicitudin vel ipsum sit amet aliquet. Donec tincidunt tempus est a malesuada.';
  selection = '';
  position;
  ngOnInit() {
    this.events.listen().subscribe(event => {

      switch (event.origin) {

        case ('marker'):
          if (this.selection) {
            this.content = this.replaceAt(this.content, this.position, `<span style="background-color: ${event.color};">${this.selection}</span>`);
          }
        break;

        case ('textarea'):
          this.selection = event.selection.toString();
          this.position = {starts: event.selection.anchorOffset, ends: event.selection.focusOffset};
        break;

        default:
        break;
      }
    });
  }


  handleSelection($event: MouseEvent) {
    const selection: Selection = $event.view.getSelection();
    if (selection.type === 'Range') {
      this.events.dispatch({
          origin: 'textarea',
          type: 'selection',
          mouseEvent: $event,
          selection: selection,
        });
    }
  }

  handleBlur($event) {
    this.content = $event.target.innerHTML;
  }

  // Replace string at specific position (native replace() method will just replace the first occurance)
  replaceAt(string, position, replace) {
    return string.substring(0, position.starts) + replace + string.substring(position.ends);
  }

}


