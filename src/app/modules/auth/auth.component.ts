
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionServices } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  form!: FormGroup;
  ipAddress: any;
  constructor(private http: HttpClient, private router: Router, private authServices: AuthService, private formBuilder: FormBuilder, private sessionService: SessionServices) {

    this.form = this.formBuilder.group({
      email: [null, [Validators.required,
      Validators.pattern(/^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/)]],
      password: [null, Validators.required]
    })

  }

  login() {
    if (this.form.valid) {
      const form = this.form.value;
      this.authServices.login(form.email, form.password).then(session => {
        if (session.error === 0) {
          if (session.data.length != 0) {
            const auth = session.data[0] as AuthModel;
            this.sessionService.setSession(auth);

            this.router.navigate(['/dashboard']);
          }
          else {

            alert("Credenciales incorrectas")
            this.form.controls["password"].reset();
          }


        }
        else {
          // this.toastServices.show('Las credenciales son incorrectas', { classname: 'bg-danger text-light', delay: 10000 });
        }

      });
    }
  }
}
