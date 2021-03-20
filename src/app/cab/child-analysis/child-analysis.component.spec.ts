import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildAnalysisComponent } from './child-analysis.component';

describe('ChildAnalysisComponent', () => {
  let component: ChildAnalysisComponent;
  let fixture: ComponentFixture<ChildAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
