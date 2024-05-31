import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamDetailServiceService } from 'src/app/team-details/team-detail-service.service';
import { SessionTimeoutService } from '../services/session-timeout.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-water-mark-page',
  templateUrl: './water-mark-page.component.html',
  styleUrls: ['./water-mark-page.component.scss']
})
export class WaterMarkPageComponent {
  loginSuccess = false;
  formSubmitted = false;

  public showPassword: boolean = false;
  loginForm!: FormGroup;
  teamDetails: any = [];
  employeDetails: any = [];

  @Output() loginSuccessEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private formb: FormBuilder,
    private router: Router,
    private teamservice: TeamDetailServiceService,
    private sessionTimeoutService: SessionTimeoutService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.teamservice.getTeamDetails().subscribe((result: any) => {
      this.teamDetails = result;
    });
    this.teamservice.getEmployeeDetails().subscribe((result: any) => {
      this.employeDetails = result[0].employees;
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    let validuser = this.teamDetails.filter((e: { LeadName: any; }) =>  e.LeadName == this.loginForm.value.username );
    validuser = this.employeDetails.filter ((e: { Employee: any; }) => e.Employee== this.loginForm.value.username);
    if (this.loginForm.valid && (validuser.length == 1 || this.loginForm.value.username == 'Admin') && this.loginForm.value.password=='Admin') {
      this.router.navigate(['/tvm/team/teamlist']);
      sessionStorage.setItem('isLogin', 'Valid');
      this.sessionTimeoutService.startTimeout();
    } else{
      this.toastr.error(`Error: Please enter valid credentials`);
    }
  }
}
