import { Component, OnInit, Input, Injector } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import {
  GroupDto,
  ListResultDtoOfPermissionDto,
  GroupServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styles: []
})
export class EditGroupComponent extends ModalComponentBase implements OnInit {

  @Input() id: number;
  permissions: ListResultDtoOfPermissionDto = null;
  group: GroupDto = null;

  permissionList = [];

  constructor(
    injector: Injector,
    private _groupService: GroupServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this._groupService.get(this.id)
      .finally(() => {

      })
      .subscribe((result: GroupDto) => {
        this.group = result;
      });
  }

  save(): void {
    this.saving = true;
    this._groupService.update(this.group)
      .finally(() => {
        this.saving = false;
      })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
