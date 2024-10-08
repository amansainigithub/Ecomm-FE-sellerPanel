import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../_services/user.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SellerDataService } from './seller-data.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isLoggedIn = false;
  roles: string[] = [];

  //MobileForm
  mobileForm:any={
    mobile:null,
    isVerified:false
  }

  //Otp Form
  otpForm:any={
    otp:null,
    mobile:null
  }

  //Validation Key
  nextRegisterForm:any = false;

  //USER ALREADY VERIFIED
  isUserVerified:any = false;
 
  constructor(private authService: AuthService , 
              private UserService:UserService , 
              private tokenStorage: TokenStorageService, 
              private toast:NgToastService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private sellerDataService:SellerDataService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      window.location.href = '/seller/dashboard';
    }
  }

  mobilePattern:any = /^\d{10}$/;

  //Sign up with Mobile Start
  signUpWithMobile(){

    //Spinner Show
    this.spinner.show();
   
      if (!this.mobilePattern.test(this.mobileForm.mobile)) {
        this.toast.success({detail:"Please Enter a Valid mobile number",summary:"Error", position:"topRight",duration:3000});
        return;
    }

    this.authService.sellerSendOtpService(this.mobileForm).subscribe(data => {

            const jsonObject = JSON.parse(JSON.stringify(data));

            //Set Mobile Data To OTP FORM JSON OBJECT
            this.otpForm.mobile =  this.mobileForm.mobile;

              if(jsonObject.data.message === 'Already Verified')
              {
                this.toast.success({detail:"User Already Verified",summary:"success", position:"topRight",duration:3000});
                this.isUserVerified = true;
              }else{
                //Starting CountDown Timer
                this.startCountdown();
                
                this.toast.success({detail:"OTP Sent to Your mobile Number",summary:"success", position:"topRight",duration:3000});
                this.isUserVerified = false;
              }

               //Spinner hide
                this.spinner.hide();
             
           },
              err=>{
                const jsonObject = JSON.parse(JSON.stringify(err));
                this.toast.success({detail:"Errorr",summary:"error", position:"topRight",duration:3000});
                //Spinner hide
                this.spinner.hide();
        })
  }
  //Sign up with Mobile Start



  //Otp CountDown Timer Start
  isMobileInputDisabled = false; // Track if the button is disabled
  countdown = 60; // Countdown time in seconds
  startCountdown() {
    this.isMobileInputDisabled = true; // Disable the button
    this.countdown = 60; // Reset countdown

    // Use RxJS timer to handle the countdown
    const countdownTimer = timer(0, 1000).subscribe(() => {
      this.countdown--;

      // When countdown reaches zero, reset the button state
      if (this.countdown <= 0) {
        this.isMobileInputDisabled = false;
        countdownTimer.unsubscribe(); // Unsubscribe to prevent memory leaks
      }
    });
  }
  //Otp CountDown Timer Ending


//Validate Seller OTP
  isOtpInputDisabled:any = false;
  isOtpValid:any = false;
  validateOtp(): void {
    if(this.otpForm.otp.length == 6)
    {
       if(this.otpForm.otp == '' || this.otpForm.otp === undefined || this.otpForm.otp == null)
        {
          this.toast.error({detail:"Please Enter a Valid OTP",summary:"Error", position:"topRight",duration:3000});
          return;
        }
        
        this.otpForm.mobile = this.mobileForm.mobile;
  
          this.authService.validateSellerOtp(this.otpForm).subscribe(resp => {
  
            const jsonObject = JSON.parse(JSON.stringify(resp));
            this.toast.success({detail:jsonObject.data.message,summary:"success", position:"topRight",duration:3000});
            
            this.isOtpValid = true;

            this.isOtpInputDisabled = true;
              },
              err=>{
                const jsonObject = JSON.parse(JSON.stringify(err));
                this.toast.error({detail:"invalid OTP or Expired",summary:"Error", position:"topRight",duration:3000});
          })

    }
  }


  //Seller Form
  sellerForm:any={
    email:null,
    password:null,
    mobile:null
  }
  isEmailError:any =false;

  //Save Seller Details and redirect to Seller Other information Page
  submitSellerDetails(){
    
    //Show Spinner
    this.spinner.show();

    this.sellerForm.mobile = this.mobileForm.mobile;
    this.authService.register(this.sellerForm).subscribe(data=>{

      // show toast message
      this.toast.success({detail:"Registration completed",summary:"success", position:"topRight",duration:3000});

      //Redirect To Seller information Page
       this.sellerDataService.setData(this.sellerForm);

      //Hide Spinner
      this.spinner.hide();

      //Redirect to seller Information Page
      this.router.navigate(['/register/seller-information']);
    },error=>{
      const jsonObject = JSON.parse(JSON.stringify(error));
      if(jsonObject.error.data.message === "Email ID already taken")
      {
        this.isEmailError = true;
        this.toast.error({detail:"This Email Id User For Another Seller Id",summary:"Failed", position:"topRight",duration:3000});
       
       //Hide Spinner
       this.spinner.hide();
        return;
      }

      this.toast.error({detail:"Registration Failed | Something went wrong",summary:"Failed", position:"topRight",duration:3000});

       //Hide Spinner
       this.spinner.hide();
    })
  }
    //Save Seller Details and redirect to Seller Other information Page




}
