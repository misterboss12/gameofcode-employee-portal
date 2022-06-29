import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RoutePaths } from '../../route-paths.enum';

@Component({
  selector: 'app-breadcumb-toolbar',
  templateUrl: './breadcumb-toolbar.component.html',
  styleUrls: ['./breadcumb-toolbar.component.css'],
})
export class BreadcumbToolbarComponent implements OnInit {
  @Input() breadcumbPath: string;

  pathArray = [];

  isLogged: boolean;

  userData;

  routePaths: typeof RoutePaths;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.pathArray = this.breadcumbPath.split('/');
    this.isLogged = this.authService.isLoggedIn;
    this.userData = this.authService.userData;
    this.routePaths = RoutePaths;
  }
}
