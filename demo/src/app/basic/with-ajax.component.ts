import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-with-ajax',
  templateUrl: 'with-ajax.component.html'
})
export class WithAjaxComponent implements OnInit {

  pageTitle = 'Quickstart';
  mdIntro = 'assets/docs/basic/with-ajax/intro.md';
  mdHTML = 'assets/docs/basic/with-ajax/source-html.md';
  mdTS = 'assets/docs/basic/with-ajax/source-ts.md';
  mdTSV2 = 'assets/docs/basic/with-ajax/source-ts-dtv2.md';

  dtOptions: Config = {};

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };
  }
}
