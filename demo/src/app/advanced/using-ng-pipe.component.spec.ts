import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA, SecurityContext } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { MarkdownModule } from 'ngx-markdown';
import { BaseDemoComponent } from '../base-demo/base-demo.component';
import { AppRoutingModule } from '../app.routing';
import { FormsModule } from '@angular/forms';
import { UsingNgPipeComponent } from './using-ng-pipe.component';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Person } from 'app/person';


let fixture: ComponentFixture<UsingNgPipeComponent>, component: null| UsingNgPipeComponent = null;

describe('UsingNgPipeComponent', () => {
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        BaseDemoComponent,
        UsingNgPipeComponent,
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
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        UpperCasePipe,
        CurrencyPipe
      ]
    }).createComponent(UsingNgPipeComponent);

    component = fixture.componentInstance;

    fixture.detectChanges(); // initial binding
  });

  it('should create the app', waitForAsync(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have title "Using Angular Pipe"', waitForAsync(() => {
    const app = fixture.debugElement.componentInstance as UsingNgPipeComponent;
    expect(app.pageTitle).toBe('Using Angular Pipe');
  }));

  it('should have firstName, lastName columns have text in uppercase', async () => {
    const app = fixture.debugElement.componentInstance as UsingNgPipeComponent;
    await fixture.whenStable();

    const query = fixture.debugElement.query(By.directive(DataTableDirective));
    const dir = query.injector.get(DataTableDirective);
    expect(dir).toBeTruthy();

    const instance = await dir.dtInstance;

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    const testsArray = [0, 3, 6];
    const expectedArray = testsArray.map(_ => true);

    expect(testsArray.map(index => {
      const dataRow = rows[index];

      const firstNameFromData = (instance.row(dataRow).data() as Person).firstName;
      const firstNameFromTable = $('td:nth-child(2)', dataRow).text();

      const lastNameFromData = (instance.row(dataRow).data() as Person).lastName;
      const lastNameFromTable = $('td:nth-child(3)', dataRow).text();
      return firstNameFromTable === firstNameFromData.toUpperCase() && lastNameFromTable === lastNameFromData.toUpperCase();
    }))
      .toEqual(expectedArray);
  });


  it('should have money on id column', async () => {
    const app = fixture.debugElement.componentInstance as UsingNgPipeComponent;
    await fixture.whenStable();

    const query = fixture.debugElement.query(By.directive(DataTableDirective));
    const dir = query.injector.get(DataTableDirective);
    expect(dir).toBeTruthy();

    const instance = await dir.dtInstance;

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    const testsArray = [0, 3, 6];
    const expectedArray = testsArray.map(_ => true);

    expect(testsArray.map(index => {
      const dataRow = rows[index];

      const pipeInstance = app.pipeCurrencyInstance;

      const IdFromData = (instance.row(dataRow).data() as Person).id;
      const IdFromTable = $('td:nth-child(1)', dataRow).text();
      return IdFromTable === pipeInstance.transform(IdFromData,'USD','symbol');
    }))
      .toEqual(expectedArray);
  });


  it('should not crash when using "visible: false" for columns', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const query = fixture.debugElement.query(By.directive(DataTableDirective));
    const dir = query.injector.get(DataTableDirective);
    expect(dir).toBeTruthy();

    // hide first column
    (await dir.dtInstance).columns(0).visible(false);
    await fixture.whenRenderingDone();

    fixture.detectChanges();

    // verify app still works
    expect((await dir.dtInstance).column(0).visible()).toBeFalse();
  });

});
