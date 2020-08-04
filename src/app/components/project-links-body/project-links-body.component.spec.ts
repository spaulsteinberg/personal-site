import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLinksBodyComponent } from './project-links-body.component';

describe('ProjectLinksBodyComponent', () => {
  let component: ProjectLinksBodyComponent;
  let fixture: ComponentFixture<ProjectLinksBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLinksBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLinksBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
