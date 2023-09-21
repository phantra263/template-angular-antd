import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from './guards/app.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { PageDemoComponent } from './pages/template/page-demo/page-demo.component';
import { DetailDemoComponent } from './pages/template/detail-demo/detail-demo.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AppGuard],
    children: [
      {
        path: 'template',
        data: { breadcrumb: 'Template' },
        children: [
          { path: '', redirectTo: '/template/demo',  pathMatch: 'full' },
          { path: 'demo', component: PageDemoComponent, data: { breadcrumb: 'Page demo' } },
          { path: 'chitiet/:id', component: DetailDemoComponent, data: { breadcrumb: 'Chi tiết' } },
        ]
      },
    ]
  },
  { path: '**', redirectTo: 'page/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
