import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';



import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { authGuard } from './auth/guards/auth.guard';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { MenuComponent } from './core/menu/menu.component';
import { AccessGroupsComponent } from './features/access/access-groups/access-groups.component';
import { LockdownAreaComponent } from './features/access/lockdown-areas/lockdown-area.component';
import { PersonnelComponent } from './features/access/personnel/personnel.component';
import { OperatorsComponent } from './features/administration/operators/operators.component';
import { OperatorInsertUpdateComponent } from './features/administration/operators/operator-insert-update.component';
import { BasicSearchComponent } from './features/shared/basic-search/basic-search.component';
import { PaginationComponent } from './features/shared/pagination/pagination.component';
import { PaginationContainerComponent } from './features/shared/pagination-container/pagination-container.component';
import { TableComponent } from './features/shared/table/table.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuditTrailsComponent } from './features/system/audit-trails/audit-trails.component';
import { CompanyListComponent } from './features/system/company-list/company-list.component';
import { ServiceLogComponent } from './features/system/service-log/service-log.component';
import { SystemSettingsComponent } from './features/system/system-settings/system-settings.component';
import { ViewHistoryComponent } from './features/system/view-history/view-history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: OperatorsComponent, pathMatch: 'full' },
      { path: 'personnel', component: PersonnelComponent },
      { path: 'operators', component: OperatorsComponent },
      { path: 'operator-insert-update/:id', component: OperatorInsertUpdateComponent },
      { path: 'access-groups', component: AccessGroupsComponent },
      { path: 'audit-trails', component: AuditTrailsComponent },
      { path: 'company-list', component: CompanyListComponent },
      { path: 'service-log', component: ServiceLogComponent },
      { path: 'system-settings', component: SystemSettingsComponent },
      { path: 'view-history', component: ViewHistoryComponent },
      { path: 'lockdown-areas', component: LockdownAreaComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }  // Redirect any unknown paths to login
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    BasicSearchComponent,
    PaginationComponent,
    PaginationContainerComponent,
    TableComponent,
    PersonnelComponent,
    OperatorsComponent,
    OperatorInsertUpdateComponent,
    AccessGroupsComponent,
    NavMenuComponent,
    SystemSettingsComponent,
    AuditTrailsComponent,
    CompanyListComponent,
    ServiceLogComponent,
    ViewHistoryComponent,
    LockdownAreaComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,


    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ],
})
export class AppModule { }

