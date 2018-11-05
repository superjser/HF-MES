import { Component, OnInit, Injector } from '@angular/core';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/component-base/paged-listing-component-base';
import {
  EnterpriseDto,
  EnterpriseServiceProxy,
  PagedResultDtoOfEnterpriseDto,
} from '@shared/service-proxies/service-proxies';
import { EditEnterpriseComponent } from '@app/enterprises/edit-enterprise/edit-enterprise.component';
import { CreateEnterpriseComponent } from '@app/enterprises/create-enterprise/create-enterprise.component';
@Component({
  selector: 'app-enterprises',
  templateUrl: './enterprises.component.html',
  styles: []
})
export class EnterprisesComponent extends PagedListingComponentBase<EnterpriseDto> {
  constructor(injector: Injector, private enterprisesService: EnterpriseServiceProxy) {
    super(injector);
  }

  // public enterpriseTitle:string = "企业"

  protected fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void {
    this.enterprisesService
      .getAll(request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfEnterpriseDto) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
      });
  }
  protected delete(entity: EnterpriseDto): void {
    abp.message.confirm(
      '从企业列表移除 \'' + entity.enterpriseName + '\'?',
      '永久删除此企业？',
      (result: boolean) => {
        if (result) {
          this.enterprisesService
            .delete(entity.id)
            .finally(() => {
              abp.notify.info('删除企业: ' + entity.enterpriseName);
              this.refresh();
            })
            .subscribe(() => { });
        }
      },
    );
  }

  create(): void {
    this.modalHelper
      .open(CreateEnterpriseComponent, {}, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }

  edit(item: EnterpriseDto): void {
    this.modalHelper
      .open(EditEnterpriseComponent, { id:item.id }, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }
}

