import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AbpModule, LocalizationService } from '@yoyo/abp';
import { LayoutModule } from '@app/layout/layout.module';
import { HomeComponent } from '@app/home/home.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from '@app/about/about.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { UsersComponent } from '@app/users/users.component';
import { RolesComponent } from '@app/roles/roles.component';
import { CreateTenantComponent } from '@app/tenants/create-tenant/create-tenant.component';
import { EditTenantComponent } from '@app/tenants/edit-tenant/edit-tenant.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from '@app/roles/edit-role/edit-role.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from '@app/users/edit-user/edit-user.component';
import { MenuService } from '@yoyo/theme';
import { GroupsComponent } from './groups/groups.component';
import { CreateGroupComponent } from './groups/create-group/create-group.component';
import { EditGroupComponent } from './groups/edit-group/edit-group.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';
import { CreateEnterpriseComponent } from './enterprises/create-enterprise/create-enterprise.component';
import { EditEnterpriseComponent } from './enterprises/edit-enterprise/edit-enterprise.component';
import { FactoriesComponent } from './factories/factories.component';
import { CreateFactoryComponent } from './factories/create-factory/create-factory.component';
import { EditFactoryComponent } from './factories/edit-factory/edit-factory.component';
import { ProductionLinesComponent } from './production-lines/production-lines.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    AbpModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TenantsComponent,
    UsersComponent,
    RolesComponent,
    CreateTenantComponent,
    EditTenantComponent,
    CreateRoleComponent,
    EditRoleComponent,
    CreateUserComponent,
    EditUserComponent,
    GroupsComponent,
    CreateGroupComponent,
    EditGroupComponent,
    EnterprisesComponent,
    CreateEnterpriseComponent,
    EditEnterpriseComponent,
    FactoriesComponent,
    CreateFactoryComponent,
    EditFactoryComponent,
    ProductionLinesComponent,
  ],
  entryComponents: [
    CreateTenantComponent,
    EditTenantComponent,
    CreateRoleComponent,
    EditRoleComponent,
    CreateUserComponent,
    EditUserComponent,
    CreateGroupComponent,

    CreateEnterpriseComponent,
    EditEnterpriseComponent,
    CreateFactoryComponent,
    EditFactoryComponent
  ],
  providers: [
    LocalizationService,
    MenuService
  ],
})
export class AppModule { }
