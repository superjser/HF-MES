import { Component, OnInit, Injector, Input } from '@angular/core';
import {
  ListResultDtoOfPermissionDto,
  CreateProductionLineDto,
  ProductionLineServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { ModalComponentBase } from '@shared/component-base';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-create-productionline',
  templateUrl: './create-productionline.component.html',
  styles: []
})
export class CreateProductionlineComponent extends ModalComponentBase implements OnInit {
  permissions: ListResultDtoOfPermissionDto = null;
  productionline: CreateProductionLineDto = new CreateProductionLineDto();
  permissionList = [];

  constructor(
    injector: Injector,
    private _productionlineService: ProductionLineServiceProxy
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


    this._productionlineService.create(this.productionline)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
