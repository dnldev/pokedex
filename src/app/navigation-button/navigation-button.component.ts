import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'pokedex-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.scss']
})
export class NavigationButtonComponent {
  @Input() text = '';
  @Input() link = '';

  constructor(public router: Router) {
  }
}
