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

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styles: []
})
// export class GroupsComponent implements OnInit {
export class GroupsComponent extends PagedListingComponentBase<GroupDto> {

  constructor(injector: Injector, private groupsService: GroupServiceProxy) {
    super(injector);
  }

  // 获取数据列表
  protected fetchDataList(
    request: PagedRequestDto,
    pageNumber: number,
    finishedCallback: Function,
  ): void {
    this.groupsService
      .getAll(request.skipCount, request.maxResultCount)
      .finally(() => {
        finishedCallback();
      })
      .subscribe((result: PagedResultDtoOfGroupDto) => {
        this.dataList = result.items;
        this.totalItems = result.totalCount;
      });
  }


  ngOnInit() {
  }

  refresh():void{
    alert("刷新了！")
  }

  create():void{
    this.modalHelper
      .open(CreateGroupComponent,{},'md',{
        nzMask: true,
      })
      .subscribe(isSave => {
        if (isSave) {
          this.refresh();
        }
      });
    //alert("我创建了一条内容！")
  };

  groups = [
    {
      name: '赫峰集团',
      description: '山东赫峰集团',
      time: 'Wed Sep 19 2018 16:24:31 GMT+0800',
      remarks: '你甚至可以在这里写一些备注',
    },
    {
      name: '赫峰集团',
      description: '山东赫峰集团',
      time: 'Wed Sep 19 2018 16:24:31 GMT+0800',
      remarks: '你甚至可以在这里写一些备注',
    },
    {
      name: '赫峰集团',
      description: '山东赫峰集团',
      time: 'Wed Sep 19 2018 16:24:31 GMT+0800',
      remarks: '你甚至可以在这里写一些备注',
    }
  ]


}
