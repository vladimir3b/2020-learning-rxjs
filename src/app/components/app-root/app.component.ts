import { Component } from '@angular/core';

export interface IMenuStructure {
  caption: string;
  link: string;
  subMenu?: Array<IMenuStructure>;
}

@Component({
  selector: 'fg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  projectTitle = 'Learning RxJs';
  menu: Array<IMenuStructure>;

  constructor() {
    this.menu = [
      {
        caption: 'Title 1',
        link: 'subMenu1',
        subMenu: [
          {
            caption: 'Subtitle 1-1',
            link: 'subtitle11'
          },
          {
            caption: 'Subtitle 1-2',
            link: 'subtitle12'
          },
          {
            caption: 'Subtitle 1-3',
            link: 'subtitle13'
          }
        ]
      },
      {
        caption: 'Title 2',
        link: 'title2',
        subMenu: [
          {
            caption: 'Subtitle 2-1',
            link: 'subtitle21'
          },
          {
            caption: 'Subtitle 2-2',
            link: 'subtitle22'
          }
        ]
      },
      {
        caption: 'Title 3',
        link: 'title3'
      },
      {
        caption: 'Title 4',
        link: 'title4'
      },
      {
        caption: 'Title 5',
        link: 'subMenu5',
        subMenu: [
          {
            caption: 'Subtitle 5-1',
            link: 'subtitle51'
          },
          {
            caption: 'Subtitle 5-2',
            link: 'subtitle52'
          },
          {
            caption: 'Subtitle 5-3',
            link: 'subtitle53'
          }
        ]
      },
      {
        caption: 'Title 6',
        link: 'subMenu6',
        subMenu: [
          {
            caption: 'Subtitle 6-1',
            link: 'subtitle61'
          },
          {
            caption: 'Subtitle 6-2',
            link: 'subtitle62'
          },
          {
            caption: 'Subtitle 6-3',
            link: 'subtitle61'
          }
        ]
      },
    ]
  }
}
