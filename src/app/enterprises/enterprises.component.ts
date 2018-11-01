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

  public enterpriseTitle:string = "企业"

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
      '确定删除此项内容？',
      '永久删除',
      (result: boolean) => {
        if (result) {
          this.enterprisesService
            .delete(entity.id)
            .finally(() => {
              abp.notify.info('啊啊啊啊啊 ');
              this.refresh();
            })
            .subscribe(() => { });
        }
      },
    );
  }

  enterprises = [
    {
      EnterpriseName: "山东慧峰新型材料有限公司",
      EnterpriseDescription: "石英石",
      CreationTime: "时间好像是自动获取的"
    }
  ]

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
      .open(EditEnterpriseComponent, { id: item.id }, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }
}

