import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorInsertUpdateComponent } from './operator-insert-update.component';

describe('OperatorInsertUpdateComponent', () => {
  let component: OperatorInsertUpdateComponent;
  let fixture: ComponentFixture<OperatorInsertUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorInsertUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperatorInsertUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
