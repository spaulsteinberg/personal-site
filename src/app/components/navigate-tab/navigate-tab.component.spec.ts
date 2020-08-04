import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateTabComponent } from './navigate-tab.component';

describe('NavigateTabComponent', () => {
  let component: NavigateTabComponent;
  let fixture: ComponentFixture<NavigateTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigateTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
