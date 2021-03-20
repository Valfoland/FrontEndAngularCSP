import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDataFormComponent } from './child-data-form.component';

describe('ChildDataFormComponent', () => {
  let component: ChildDataFormComponent;
  let fixture: ComponentFixture<ChildDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
