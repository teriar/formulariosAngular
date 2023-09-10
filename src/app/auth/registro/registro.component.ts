import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator.service';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validators/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {



 miFormulario:FormGroup =this.fb.group({
  nombre:['',[Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
  email:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator] ],
  username:['',[Validators.required, noPuedeSerStrider]],
  password:['',[Validators.required, Validators.minLength(6)]],
  password2:['',[Validators.required]]
  
 },
 {
 validators:[ this.validatorService.camposIguales('password','password2')]
})

  constructor( private fb:FormBuilder, private validatorService:ValidatorService, private emailValidator:EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre:'Felipe Gonzalez',
      email:'test1@test.com',
      usernema:'Darkrising'
    })
  }

campoNoValido(campo:string){
return this.miFormulario.get(campo)?.invalid
       && this.miFormulario.get(campo)?.touched;
}

submitFormulario(){
  console.log(this.miFormulario.value);

  this.miFormulario.markAllAsTouched();
}

}
