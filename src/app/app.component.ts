import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  markerStyle = 'fixed';
  colors = [];
  color = '#000000';
  isFloat = false;
  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  changeMarkerStyle(value): void {
    this.isFloat = !this.isFloat;
    value ? this.markerStyle = 'fixed' : this.markerStyle = 'float';
  }

  addColor(color): void {
    // Had to reassign the array, to get angular listen for input changes
    this.colors = [...this.colors, color];
  }
}
