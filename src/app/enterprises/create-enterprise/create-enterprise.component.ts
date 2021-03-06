import { Component, OnInit, Injector, Input } from '@angular/core';
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

  }

  save(): void {
    this.saving = true;
    let tmpPermissions = [];

    this.permissionList.forEach((item) => {
      if (item.checked) {
        tmpPermissions.push(item.value);
      }
    });

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
