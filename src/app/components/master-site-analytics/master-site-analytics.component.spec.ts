import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSiteAnalyticsComponent } from './master-site-analytics.component';

describe('MasterSiteAnalyticsComponent', () => {
  let component: MasterSiteAnalyticsComponent;
  let fixture: ComponentFixture<MasterSiteAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSiteAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSiteAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
