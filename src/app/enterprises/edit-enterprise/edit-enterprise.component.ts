import { Component, OnInit, Input, Injector } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { EnterpriseDto, ListResultDtoOfPermissionDto, EnterpriseServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-enterprise',
  templateUrl: './edit-enterprise.component.html',
  styles: []
})
export class EditEnterpriseComponent extends ModalComponentBase implements OnInit {

  @Input() id: number;
  permissions: ListResultDtoOfPermissionDto = null;
  enterprise: EnterpriseDto = null;

  permissionList = [];

  constructor(
    injector: Injector,
    private _enterpriseService: EnterpriseServiceProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    // this._enterpriseService.getAllPermissions()
    //   .subscribe((permissions: ListResultDtoOfPermissionDto) => {
    //     this.permissions = permissions;
    //
    //     this.fetchData();
    //   });
  }
  //
  // fetchData(): void {
  //   this._enterpriseService.get(this.id)
  //     .finally(() => {
  //
  //     })
  //     .subscribe((result: EnterpriseDto) => {
  //       this.enterprise = result;
  //       this.permissions.items.forEach((item) => {
  //         this.permissionList.push({
  //           // label: item.displayName, value: item.name, checked: this.checkPermission(item.name), disabled: this.enterprise.isStatic
  //         });
  //       });
  //     });
  // }


  // checkPermission(permissionName: string): boolean {
  //   return this.enterprise.permissions.indexOf(permissionName) != -1;
  // }

  save(): void {
    this.saving = true;
    let tmpPermissions = [];

    this.permissionList.forEach((item) => {
      if (item.checked) {
        tmpPermissions.push(item.value);
      }
    });

    // this.enterprise.permissions = tmpPermissions;

    this._enterpriseService.update(this.enterprise)
      // .finally(() => {
      //   this.saving = false;
      // })
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.success();
      });
  }

}
