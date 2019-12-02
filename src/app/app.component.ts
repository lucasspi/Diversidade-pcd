import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import {ErrorStateMatcher} from '@angular/material/core';

declare const $: any;
declare const M: any;
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
  title = 'Diversidade+';
  radioDecision1: any; // rspData = form
  groupForm: FormGroup;
  emailForm: FormGroup;
  
  public noAuth: true;
  public cpfError: Boolean;
  public phoneError: Boolean;
  public nameError: Boolean;
  public favoriteSeason: string;
  public userName: string;
  public seasons: string[] = ['RECEBER UMA LIGAÇÃO DA NOSSA CENTRAL', 'PREENCHER O QUESTIONÁRIO PCD'];
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  
  constructor(cdr: ChangeDetectorRef, private http: HttpClient) {
    // super( http);
    this.phoneError = false;
    this.nameError = false;
    this.cpfError = false;
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
      phone: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required])
    });
  }

  fecharmodal(){
    console.log("CHEGOUY")
    $('#modalExemplo5').modal('hide')
    $("#modalExemplo5").addClass("hide");
    $("#modalExemplo5").removeClass("show");
  }

  callMe(row){
    let value = row.value
    console.log("value", value)
    if (value.phone.length < 11 || value.cpf.length < 11) {
      
      value.phone.length < 11 ? this.phoneError = true : this.phoneError = false;
      value.cpf < 11 ? this.cpfError = true : this.cpfError = false;
      
    }else{
      

      this.http.post(`${environment.api.url}/callme/new`, value)
      .subscribe((result: any) => {
        console.log(result)
        this.phoneError = false;
        this.nameError = false;
        this.userName = value.name;
        $('#modalExemplo3').modal('hide');
        $('#modalExemplo4').modal('show');
      }, (error) =>{
        console.log(error)
        if (value.name.length == 0) {
          this.nameError = true;
          this.phoneError = false;
        }
        // this.showNotification("bg-black", `Push editado com Erro!`, "bottom", "right", "animated fadeInRight", "animated fadeOutRight")
      })
      
    }
  }

}
