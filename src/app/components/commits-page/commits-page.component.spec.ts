import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsPageComponent } from './commits-page.component';

describe('CommitsPageComponent', () => {
  let component: CommitsPageComponent;
  let fixture: ComponentFixture<CommitsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
