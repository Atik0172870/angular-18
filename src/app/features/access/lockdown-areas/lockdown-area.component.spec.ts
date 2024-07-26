import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockdownAreaComponent } from './lockdown-area.component';

describe('AccessGroupsComponent', () => {
  let component: LockdownAreaComponent;
  let fixture: ComponentFixture<LockdownAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockdownAreaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LockdownAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
