import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNetworkSpeedComponent } from './site-network-speed.component';

describe('SiteNetworkSpeedComponent', () => {
  let component: SiteNetworkSpeedComponent;
  let fixture: ComponentFixture<SiteNetworkSpeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteNetworkSpeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNetworkSpeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
