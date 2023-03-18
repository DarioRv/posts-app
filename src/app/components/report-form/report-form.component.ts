import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserActions } from 'src/app/services/user-actions';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  reportForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userActions: UserActions) {
    this.reportForm = this.formBuilder.group({
      reportType: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }

  get ReportType() {
    return this.reportForm.get('reportType');
  }

  get Comment() {
    return this.reportForm.get('comment');
  }

  sendReport() {
    if (this.reportForm.valid) {
      const report = {
        "type": this.ReportType?.value,
        "comment": this.Comment?.value
      }
      console.log(report);
      this.userActions.saveReport(report);
    }
    else {
      this.reportForm.markAllAsTouched();
    }
  }
}
