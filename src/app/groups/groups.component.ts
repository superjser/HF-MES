import {Component, Injector, OnInit} from '@angular/core';
//分页
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/component-base/paged-listing-component-base';
// 页面Dto
import {
  GroupDto,
  GroupServiceProxy,
  PagedResultDtoOfGroupDto,
} from "@shared/service-proxies/service-proxies";
import { CreateGroupComponent} from "@app/groups/create-group/create-group.component";
import { EditGroupComponent } from "@app/groups/edit-group/edit-group.component";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styles: []
})
// export class GroupsComponent implements OnInit {
export class GroupsComponent extends PagedListingComponentBase<GroupDto> {

  constructor(injector: Injector, private factoriesService: GroupServiceProxy) {
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
      .subscribe((result: PagedResultDtoOfGroupDto) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
      });
  }
  protected delete(entity: GroupDto): void {
    abp.message.confirm(
      '从集团列表移除 \'' + entity.groupName + '\'?',
      '永久删除此集团？',
      (result: boolean) => {
        if (result) {
          this.factoriesService
            .delete(entity.id)
            .finally(() => {
              abp.notify.info('删除集团: ' + entity.groupName);
              this.refresh();
            })
            .subscribe(() => { });
        }
      },
    );
  }

  create(): void {
    this.modalHelper
      .open(CreateGroupComponent, {}, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }

  edit(item: GroupDto): void {
    this.modalHelper
      .open(EditGroupComponent, { id: item.id }, 'md', {
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
  }
}
