import { HttpClientModule } from '@angular/common/http';
import { SecurityContext, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from 'app/app.routing';
import { BaseDemoComponent } from 'app/base-demo/base-demo.component';
import { MarkdownModule } from 'ngx-markdown';

import { WithAjaxCallbackComponent } from './with-ajax-callback.component';

describe('WithAjaxCallbackComponent', () => {
  let component: WithAjaxCallbackComponent;
  let fixture: ComponentFixture<WithAjaxCallbackComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        BaseDemoComponent,
        WithAjaxCallbackComponent,
        DataTableDirective
      ],
      imports: [
        AppRoutingModule,
        RouterTestingModule,
        DataTablesModule,
        HttpClientModule,
        MarkdownModule.forRoot(
          {
            sanitize: SecurityContext.NONE
          }
        )
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(WithAjaxCallbackComponent);

    component = fixture.componentInstance;

    fixture.detectChanges(); // initial binding
  });

  it('should create the app', waitForAsync(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have title "AJAX with callback"', waitForAsync(() => {
    const app = fixture.debugElement.componentInstance as WithAjaxCallbackComponent;
    expect(app.pageTitle).toBe('AJAX with callback');
  }));

});
