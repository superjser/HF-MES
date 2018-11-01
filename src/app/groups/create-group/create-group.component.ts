import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styles: []
})
export class CreateGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  save(): void{
    alert("保存了")
  }
}
