import { Component, OnInit, Injector } from '@angular/core';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/component-base/paged-listing-component-base';
import {
  ProductionLineServiceProxy,
  ProductionLineDto,
  PagedResultDtoOfProductionLineDto,
} from '@shared/service-proxies/service-proxies';
import { EditProductionlineComponent } from "@app/productionlines/edit-productionline/edit-productionline.component";
import { CreateProductionlineComponent } from "@app/productionlines/create-productionline/create-productionline.component";

@Component({
  selector: 'app-productionlines',
  templateUrl: './productionlines.component.html',
  styles: []
})
export class ProductionlinesComponent extends PagedListingComponentBase<ProductionLineDto> {

  constructor(injector: Injector, private productionlinesService: ProductionLineServiceProxy) {
    super(injector);
  }

  protected fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void {
    this.productionlinesService
      .getAll(request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfProductionLineDto) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
      });
  }
  protected delete(entity: ProductionLineDto): void {
    abp.message.confirm(
      '从产线列表移除 \'' + entity.productionLineName + '\'?',
      '永久删除此产线？',
      (result: boolean) => {
        if (result) {
          this.productionlinesService
            .delete(entity.id)
            .finally(() => {
              abp.notify.info('删除产线: ' + entity.productionLineName);
              this.refresh();
            })
            .subscribe(() => { });
        }
      },
    );
  }

  create(): void {
    this.modalHelper
      .open(CreateProductionlineComponent, {}, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }

  edit(item: ProductionLineDto): void {
    this.modalHelper
      .open(EditProductionlineComponent, { id: item.id }, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }
}
