import { Component, OnInit, Input, Injector } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import {
  FactoryDto,
  ListResultDtoOfPermissionDto,
  FactoryServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-factory',
  templateUrl: './edit-factory.component.html',
  styles: []
})
export class EditFactoryComponent extends ModalComponentBase implements OnInit {

  @Input() id: number;
  permissions: ListResultDtoOfPermissionDto = null;
  factory: FactoryDto = null;

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


    this._factoryService.update(this.factory)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
