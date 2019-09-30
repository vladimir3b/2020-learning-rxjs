import { Component } from '@angular/core';

export interface IMenuStructure {
  caption: string;
  link: string;
  subMenu?: Array<IMenuStructure>;
}

@Component({
  selector: 'fg-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  projectTitle = 'Learning RxJs';
  menu: Array<IMenuStructure>;

  constructor() {
    this.menu = [
      {
        caption: 'Introduction',
        link: null,
        subMenu: [
          {
            caption: 'The Problem',
            link: '1-01'
          }
        ]
      }
    ]
  }
}
