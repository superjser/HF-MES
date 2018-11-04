import { Component, OnInit, Injector } from '@angular/core';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/component-base/paged-listing-component-base';
import {
  FactoryDto,
  FactoryServiceProxy,
  PagedResultDtoOfFactoryDto,
} from '@shared/service-proxies/service-proxies';
import { EditFactoryComponent } from "@app/factories/edit-factory/edit-factory.component";
import { CreateFactoryComponent } from "@app/factories/create-factory/create-factory.component";

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styles: []
})
// export class FactoriesComponent implements OnInit {
export class FactoriesComponent extends PagedListingComponentBase<FactoryDto> {
  constructor(injector: Injector, private factoriesService: FactoryServiceProxy) {
    super(injector);
  }

  protected fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void {
    this.factoriesService
      .getAll(request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfFactoryDto) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
      });
  }
  protected delete(entity: FactoryDto): void {
    abp.message.confirm(
      '从车间列表移除 \'' + entity.factoryName + '\'?',
      '永久删除此车间？',
      (result: boolean) => {
        if (result) {
          this.factoriesService
            .delete(entity.id)
            .finally(() => {
              abp.notify.info('删除车间: ' + entity.factoryName);
              this.refresh();
            })
            .subscribe(() => { });
        }
      },
    );
  }

  create(): void {
    this.modalHelper
      .open(CreateFactoryComponent, {}, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }

  edit(item: FactoryDto): void {
    this.modalHelper
      .open(EditFactoryComponent, { id: item.id }, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }
}
