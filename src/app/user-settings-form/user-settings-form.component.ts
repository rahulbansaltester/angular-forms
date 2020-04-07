import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  postError: boolean = false;
  postErrorMessage ='';
  subScriptionTypes : Observable<string[]>;

  originalUserSettings: UserSettings ={
    name: 'Milton',
    emailOffers: true,
    interfaceStyle:'dark',
    subscriptionStyle:'Annual',
    notes:'Here are a few notes...'
  }

  userSettings: UserSettings = {...this.originalUserSettings} 
  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.subScriptionTypes = this.dataService.getSubscriptionTypes()    
  }

  onHttpError(errorResponse: any){
      console.log('error',errorResponse);
      this.postError = true;
      this.postErrorMessage = errorResponse.error.errorMessage;
  }

   onSubmit( form: NgForm){
    console.log('in onSubmit',form.valid);
    if(form.valid){
        this.dataService.postUserSettingsForm(this.userSettings).subscribe(result=> console.log('success',result),error=>this.onHttpError(error));
    }
    else{
      this.postError =true;
      this.postErrorMessage ="Please fix the above Errors";
    }
  }

   onBlur(field : NgModel){
      console.log('in on Blur',field.valid);
   }

}
