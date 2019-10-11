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
          },
          {
            caption: 'The Solution',
            link: '1-02'
          },
          {
            caption: 'Building Blocks',
            link: '1-03'
          }
        ]
      },
      {
        caption: 'Creating Observables',
        link: null,
        subMenu: [
          {
            caption: 'Creating Basic Observables',
            link: '2-01'
          }
        ]
      }
    ]
  }
}
