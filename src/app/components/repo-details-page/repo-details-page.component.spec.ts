import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoDetailsPageComponent } from './repo-details-page.component';

describe('RepoDetailsPageComponent', () => {
  let component: RepoDetailsPageComponent;
  let fixture: ComponentFixture<RepoDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
