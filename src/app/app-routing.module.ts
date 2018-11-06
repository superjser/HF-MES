import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from '@app/home/home.component';
import { AppComponent } from '@app/app.component';
import { AboutComponent } from '@app/about/about.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { RolesComponent } from '@app/roles/roles.component';
import { UsersComponent } from '@app/users/users.component';
//新页面
// import { FactoryModelComponent } from "@app/factory-model/factory-model.component";
import { GroupsComponent } from "@app/groups/groups.component";
import { EnterprisesComponent } from "@app/enterprises/enterprises.component"
import { FactoriesComponent } from "@app/factories/factories.component";
import { ProductionlinesComponent } from "@app/productionlines/productionlines.component";

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    canActivate: [AppRouteGuard],
    canActivateChild: [AppRouteGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AppRouteGuard],
      },
      {
        path: 'tenants',
        component: TenantsComponent,
        canActivate: [AppRouteGuard],
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [AppRouteGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AppRouteGuard],
      },
      {
        path: 'about',
        component: AboutComponent,
        canActivate: [AppRouteGuard],
      },
      //新页面
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AppRouteGuard],
      },
      {
        path: 'enterprises',
        component: EnterprisesComponent,
        canActivate: [AppRouteGuard],
      },
      {
        path: 'factories',
        component: FactoriesComponent,
        canActivate: [AppRouteGuard],
      },
      {
        path: 'productionlines',
        component: ProductionlinesComponent,
        canActivate: [AppRouteGuard]
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
