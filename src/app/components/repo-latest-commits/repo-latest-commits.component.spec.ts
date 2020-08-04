import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoLatestCommitsComponent } from './repo-latest-commits.component';

describe('RepoLatestCommitsComponent', () => {
  let component: RepoLatestCommitsComponent;
  let fixture: ComponentFixture<RepoLatestCommitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoLatestCommitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoLatestCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
