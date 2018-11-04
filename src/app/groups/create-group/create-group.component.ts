import {Component, Injector, OnInit} from '@angular/core';
import {
  CreateGroupDto,
  GroupServiceProxy,
  ListResultDtoOfPermissionDto
} from "@shared/service-proxies/service-proxies";
import {ModalComponentBase} from "@shared/component-base";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styles: []
})
export class CreateGroupComponent extends ModalComponentBase implements OnInit {

  permissions: ListResultDtoOfPermissionDto = null;
  group: CreateGroupDto = new CreateGroupDto();
  permissionList = [];

  constructor(
    injector: Injector,
    private _groupService: GroupServiceProxy
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

    this._groupService.create(this.group)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
