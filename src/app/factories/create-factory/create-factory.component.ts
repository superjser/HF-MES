import { Component, OnInit, Injector, Input } from '@angular/core';
import { ListResultDtoOfPermissionDto, CreateFactoryDto, FactoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalComponentBase } from '@shared/component-base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-factory',
  templateUrl: './create-factory.component.html',
  styles: []
})
export class CreateFactoryComponent extends ModalComponentBase implements OnInit {

  permissions: ListResultDtoOfPermissionDto = null;
  factory: CreateFactoryDto = new CreateFactoryDto();
  permissionList = [];

  constructor(
    injector: Injector,
    private _factoryService: FactoryServiceProxy
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

    // this.factory.permissions = tmpPermissions;

    this._factoryService.create(this.factory)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
