import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import {AuthService} from "../../../auth/services/Auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user: any;
  userMenu = [{ title: 'Profile'}, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authServise: AuthService,
              private router: Router) {
  }

  async ngOnInit() {
    this.user = await this.authServise.getUserDetails();
    /*this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);*/
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    })
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      this.authServise.logout();
      console.log('Log out Clicked ')
    } else if ( title === 'Profile' ) {
      this.router.navigateByUrl('/pages/user/profile');
      console.log('Profile Clicked ')
    }
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
