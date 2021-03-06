import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  endpoint:any = 'user/azure_id/';
  name:any;
  password:any;
  email:any;
  azure_id:any;
  photo_url:any;
  username:any;
  user_id:any;
  updateEndpoint:any = 'user/';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private httpProvider: UsersProvider) {

      this.httpProvider.getAzureID().then(azure_id =>{
        this.azure_id = azure_id;
        this.getUserData();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  getUserData(){
    this.httpProvider.getJsonData(this.endpoint+this.azure_id).subscribe(
      result => {
          console.log(result);
          this.email = result[0].email;
          this.name = result[0].name;
          this.username = result[0].username;
          this.photo_url = result[0].photo_url;
          this.user_id = result[0].id;
      }
    )
  }

  updateUser(){
    this.httpProvider.updateUser(this.updateEndpoint+this.user_id, this.name, this.username, this.email, this.password, this.photo_url);
  }

}
