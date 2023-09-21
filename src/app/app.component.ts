import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from './app.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  notifications: any = {
    totalItems: 0
  };

  isCollapsed = false;
  jwtHelper = new JwtHelperService();
  currUser: any;
  version: any = environment.infoApp.version;

  notificationDetail: any = {
    isVisible: false,
    title: '',
    content: '',
    created: null,

    id: 0,
    isRead: null,
    isReadUrl: null,
    ghiChu: null
  }

  langVisible: boolean = false;
  langSelected: string = localStorage.getItem('langSelected') ? localStorage.getItem('langSelected') : 'vi';

  constructor(public authService: AuthService,
    public appSrv: AppService, private modalService: NzModalService,
    public globalServ: AppService, private translate: TranslateService) {
      translate.use(this.langSelected);
    }

  ngOnInit(): void {
    // if (this.authService.loggedIn()) {
    //   this.ngGetNotification();
    // }
  }

  ngLogout() {
    this.authService.logout();
  }

  

  handleNotificationCancel(): void {
    this.notificationDetail.isVisible = false;
  }

  

  fnChangeLanguage(data: string): void {
    console.log(data);
    this.langSelected = data;
    this.langVisible = false;
    localStorage.setItem('langSelected', data);
    this.translate.use(data);
  }

}
