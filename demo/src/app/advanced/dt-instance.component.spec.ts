import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, SecurityContext } from '@angular/core';
import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { MarkdownModule } from 'ngx-markdown';
import { BaseDemoComponent } from '../base-demo/base-demo.component';
import { AppRoutingModule } from '../app.routing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DtInstanceComponent } from './dt-instance.component';


let fixture: ComponentFixture<DtInstanceComponent>, component: null| DtInstanceComponent = null;

describe('DtInstanceComponent', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        BaseDemoComponent,
        DtInstanceComponent,
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
        ),
        FormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(DtInstanceComponent);

    component = fixture.componentInstance;

    fixture.detectChanges(); // initial binding
  });

  it('should create the app', waitForAsync(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have title "Finding DataTable instance"', waitForAsync(() => {
    const app = fixture.debugElement.componentInstance as DtInstanceComponent;
    expect(app.pageTitle).toBe('Finding DataTable instance');
  }));

  it('should retrieve Table instance', async () => {
    const app = fixture.componentInstance as DtInstanceComponent;
    await fixture.whenStable();

    const query = fixture.debugElement.query(By.directive(DataTableDirective));
    const dir = query.injector.get(DataTableDirective);
    expect(dir).toBeTruthy();

    const instance = await dir.dtInstance;
    expect(instance).toBeTruthy();
  });

});
