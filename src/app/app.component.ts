import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import {ErrorStateMatcher} from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Diversidade-pcd';
  radioDecision1: any; // rspData = form
  groupForm: FormGroup;
  emailForm: FormGroup;
  public noAuth: true;
  public favoriteSeason: string;
  public seasons: string[] = ['RECEBER UMA LIGAÇÃO DA NOSSA CENTRAL', 'PREENCHER O QUESTIONÁRIO PCD'];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(cdr: ChangeDetectorRef) {
    // super( http);
    this.groupForm = this.createForm();
    this.emailForm = this.createEmailForm();
  }
  createForm() {
    return new FormGroup({
      radioBox: new FormControl('')
    });
  }
  createEmailForm() {
    return new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required])
    });
  }

  sendEmail(){

  }
}
