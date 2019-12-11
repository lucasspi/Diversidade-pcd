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
  public cpfInvalido: Boolean;
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
    if (value.phone.length < 11 || value.cpf.length < 11 ) {
      
      value.phone.length < 11 ? this.phoneError = true : this.phoneError = false;
      value.cpf.length < 11 ? this.cpfError = true : this.cpfError = false;
      
    }else{
      if (this.testaCPF(value.cpf)) {
        
        this.cpfInvalido = false
        this.http.post(`${environment.api.url}/callme/new`, value)
        .subscribe((result: any) => {
          console.log(result)
          this.phoneError = false;
          this.nameError = false;
          this.userName = value.name;
          $('#modalExemplo3').modal('hide');
          $('#modalExemplo4').modal('show');
          this.preCadastro(value);
        }, (error) =>{
          console.log(error)
          if (value.name.length == 0) {
            this.nameError = true;
            this.phoneError = false;
          }
          // this.showNotification("bg-black", `Push editado com Erro!`, "bottom", "right", "animated fadeInRight", "animated fadeOutRight")
        })
      }else{
        this.cpfInvalido = true
      }
    }
  }

  openPlatform(){
    window.open("https://app.diversidademais.com.br/", '_blank');
  }
  openPlatformCadastro(){
    window.open("https://app.diversidademais.com.br/#/authentication/questionario", '_blank');
  }

  

  preCadastro(value){
    console.log("VALUE BEFORA", value)
    let form = {
      telefone: value.phone,
      nome: value.name,
      cpf: value.cpf
    }
    this.http.post(`${environment.api.url}/pcd/new`, form)
    .subscribe((result: any) => {
      console.log("CADASTRO DE PCD ", result)
    })
  }

  testaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;
      
    for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
      
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
      
      Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
      
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
  }


}
