import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { TokenInterceptor } from './token.interceptor';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { LoginComponent } from './pages/login/login.component';
import { BreadcrumbComponent } from './pages/breadcrumb/breadcrumb.component';
import { HasRoleDirective } from './directives/hasRole.directive';
import { AuthService } from './services/auth.service';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { PageDemoComponent } from './pages/template/page-demo/page-demo.component';
import { DetailDemoComponent } from './pages/template/detail-demo/detail-demo.component';
import { CRUDService } from './services/CRUD.service';
import { environment } from '../environments/environment';

registerLocaleData(en);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  var translateHttpLoader = new TranslateHttpLoader(http)
  return translateHttpLoader
}

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    LoginComponent,
    HasRoleDirective,
    PageDemoComponent,
    DetailDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    ReactiveFormsModule,

    NzTreeModule,
    NzMenuModule,
    NzFormModule,
    NzCardModule,
    NzModalModule,
    NzBadgeModule,
    NzTableModule,
    NzInputModule,
    NzLayoutModule,
    NzAvatarModule,
    NzButtonModule,
    NzResultModule,
    NzDrawerModule,
    NzSelectModule,
    NzSliderModule,
    NzSwitchModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzCalendarModule,
    NzCollapseModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NzInputNumberModule,
    NzDescriptionsModule,
    NzNotificationModule,
    NzAutocompleteModule,
    NzTabsModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzDropDownModule,
    NzModalModule,
    NzStepsModule,
    NzTagModule,
    NzRadioModule,
    NzEmptyModule,
    NzDividerModule,
    NzSpaceModule,
    NzStatisticModule,
    NzNoAnimationModule,
    NzSpinModule,

    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    NzModalService,
    AuthService,
    CRUDService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
