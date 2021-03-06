import { Component, Input } from "@angular/core";
import { IMenuStructure } from '../app-root/app.component';

@Component({
  selector: 'fg-header',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  @Input() projectTitle: string;
  @Input() menu: Array<IMenuStructure>;
}