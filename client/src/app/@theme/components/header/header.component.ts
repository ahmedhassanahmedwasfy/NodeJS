import { Component, Input, OnInit } from '@angular/core';
import {NbLayoutDirectionService, NbMenuService, NbSidebarService} from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import {Router} from '@angular/router';
import {ProfileService} from '../../../@core/services/profile.service';
import {AuthService} from '../../../@core/services/Auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user: any;
  userImage: any;
  userMenu = [{ title: 'Profile'}, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authServise: AuthService,
              private router: Router,
              private profileService: ProfileService,
              private directionService: NbLayoutDirectionService){}

  async ngOnInit() {
    await this.profileService.getUserProfile().subscribe(
      res => {
        this.user = res['user'];
      },
      err => {
        console.log(err);
      });

    this.getProfileImage();

    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
    });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  checkdir() {
    let checkdir = this.directionService.isLtr();
    return checkdir;

  }

  goToHome() {
    this.menuService.navigateHome();
  }

  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      this.authServise.logout();
    } else if ( title === 'Profile' ) {
      this.router.navigateByUrl('/pages/user/userProfile');

    }
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }


  async getProfileImage() {
    let tmp = await this.profileService.getUserProfileImage().toPromise();
    this.userImage = 'data:image/png;base64,' + tmp;
  }
}
