import { Component } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'pokedex-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private userService: UserService) {
  }

  isAdmin = () => this.userService.isAdmin;
}
