import { Component, OnInit, Injector, Input } from '@angular/core';
// import { ListResultDtoOfPermissionDto, CreateRoleDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { ListResultDtoOfPermissionDto, CreateEnterpriseDto, EnterpriseServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalComponentBase } from '@shared/component-base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-enterprise',
  templateUrl: './create-enterprise.component.html',
  styles: []
})
export class CreateEnterpriseComponent extends ModalComponentBase implements OnInit {

  permissions: ListResultDtoOfPermissionDto = null;
  enterprise: CreateEnterpriseDto = new CreateEnterpriseDto();
  permissionList = [];

  constructor(
    injector: Injector,
    private _enterpriseService: EnterpriseServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {

    // this._enterpriseService.getAllPermissions()
    //   .subscribe((permissions: ListResultDtoOfPermissionDto) => {
    //     this.permissions = permissions;
    //
    //     this.permissions.items.forEach((item) => {
    //       this.permissionList.push({
    //         label: item.displayName, value: item.name, checked: true
    //       });
    //     });
    //
    //   });

  }

  save(): void {
    this.saving = true;
    let tmpPermissions = [];

    this.permissionList.forEach((item) => {
      if (item.checked) {
        tmpPermissions.push(item.value);
      }
    });

    // this.enterprise.permissions = tmpPermissions;

    this._enterpriseService.create(this.enterprise)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
