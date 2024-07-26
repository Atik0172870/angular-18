import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from './operators.service';
import { Operator } from './operator.model';

@Component({
  selector: 'app-operator-insert-update',
  templateUrl: './operator-insert-update.component.html',
  styleUrls: ['./operator-insert-update.component.scss']
})
export class OperatorInsertUpdateComponent implements OnInit {
  operatorForm: FormGroup;
  operator: Operator | undefined;
  operatorId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private operatorService: OperatorService
  ) {
    this.operatorForm = this.fb.group({
      operatorId: [{ value: '', disabled: true }],
      operFName: ['', [Validators.required, Validators.maxLength(50)]],
      operLName: ['', [Validators.required, Validators.maxLength(50)]],
      operLoginName: ['', [Validators.required, Validators.maxLength(50)]],
      autoAckTime: [null],
      lastUpdated: [new Date(), Validators.required],
      companyId: [null, Validators.required],
      // Add other form controls as needed
    });
  }

  ngOnInit(): void {
    this.operatorId = this.route.snapshot.paramMap.get('id')!;
    this.fetchOperatorDetail(this.operatorId);
  }

  fetchOperatorDetail(id: string): void {
    this.operatorService.getOperatorByOperatorId(id).subscribe(operator => {
      this.operator = operator;
      this.operatorForm.patchValue(operator);
    });
  }

  onSubmit(): void {
    if (this.operatorForm.valid) {
      const updatedOperator: Operator = { ...this.operator, ...this.operatorForm.value };
      //this.operatorService.updateOperator(this.operatorId, updatedOperator).subscribe(() => {
      //  this.router.navigate(['/operators']);
      //});
    }
  }
}
