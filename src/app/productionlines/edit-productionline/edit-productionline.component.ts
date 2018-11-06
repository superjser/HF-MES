import { Component, OnInit, Injector, Input } from '@angular/core';
import {
  ListResultDtoOfPermissionDto,
  // EditProductionLineDto,
  ProductionLineDto,
  ProductionLineServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { ModalComponentBase } from '@shared/component-base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-productionline',
  templateUrl: './edit-productionline.component.html',
  styles: []
})
export class EditProductionlineComponent extends ModalComponentBase implements OnInit {

  @Input() id: number;
  permissions: ListResultDtoOfPermissionDto = null;
  productionline: ProductionLineDto = null;

  permissionList = [];

  constructor(
    injector: Injector,
    private _productionlineService: ProductionLineServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this._productionlineService.get(this.id)
      .finally(() => {

      })
      .subscribe((result: ProductionLineDto) => {
        this.productionline = result;
      });
  }

  save(): void {
    this.saving = true;
    this._productionlineService.update(this.productionline)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
