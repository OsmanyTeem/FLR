import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ModifyReservationPage } from '../modify-reservation/modify-reservation';
import { Device } from '@ionic-native/device';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  azure_id:any;
  user_id:any;
  endpoint:any = 'user/azure_id/';
  hasLoggedIn:boolean;
  productID:any;
  productName:any;
  price:any;
  transaction_start_date:any;
  transaction_end_date:any;
  transaction_start_time:any;
  transaction_end_time:any;
  number_activity_reserved:any;
  reservationEndpoint:any = 'reservation';
  guestName:any;
  guestEmail:any;
  guestMobile:any;
  guestId:any;
  guestEndpoint:any = 'guest';
  deviceID:any;
  token:any;
  name:any;
  merchid:any = '496160873888';
  amount:any;
  currency:any = 'USD';
  address:any;
  city:any;
  region:any;
  country:any;
  postal:any;
  ecomind:any = 'E';
  cvv2:any;
  tokenize:any = 'Y';
  capture:any = 'Y';
  acctype:any = 'VISA';
  orderid:any = 'AB-11-9876"';
  account:any;
  cardConnectEnpoint:any = 'https://fts.cardconnect.com:6443/cardconnect/rest/auth';
  expiry:any;
  paymentEndpoint:any = 'payment';
  loading:any;
  checked:boolean = true;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private httpProvider: UsersProvider, 
    public alertCtrl: AlertController,
    private device: Device,
    public loadingCtrl: LoadingController) {
      var that = this;
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img width="150" src="assets/imgs/placeholder.png" />
        <br>
        <h1 class="loader-text-center">Contacting Payment Provider...</h1>`,
      });

      // window.addEventListener('message', function(event) {
      //   // document.getElementById('mytoken').value = JSON.parse(event.data);
      //   that.token;
        
      //   var token = JSON.parse(event.data);      
        
      //   console.log('Received message ' + token.message);
      //   // var mytoken = document.getElementById('mytoken');
      //   that.token = token.message;
      //   }, false);



      this.productID = navParams.get('productID');
      this.productName = navParams.get('productName');
      this.price = navParams.get('price');
      this.transaction_start_date = navParams.get('transaction_start_date');
      this.transaction_end_date = navParams.get('transaction_end_date');
      this.transaction_start_time = navParams.get('transaction_start_time');
      this.transaction_end_time = navParams.get('transaction_end_time');
      this.number_activity_reserved = navParams.get('number_activity_reserved');
      this.guestName = navParams.get('guestName');
      this.guestEmail = navParams.get('guestEmail');
      this.guestMobile = navParams.get('guestMobile');
      this.deviceID = this.device.uuid;
      this.amount = this.price * this.number_activity_reserved;
      console.log(this.transaction_start_time, this.transaction_end_time);
      this.getUserStatus();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  getUserStatus(){
    this.httpProvider.hasLoggedIn().then(hasLoggedIn => {
      console.log(hasLoggedIn);
      this.hasLoggedIn  = hasLoggedIn;
        if(hasLoggedIn){
          this.httpProvider.getAzureID().then(azure =>{
            this.azure_id = azure;
            this.getUserData();
            
          });
        }else{
         console.log('User not logged in');
        }
        
    })
  }
  
  getUserData(){
    this.httpProvider.getJsonData(this.endpoint+this.azure_id).subscribe(
      result => {
          console.log(result);
          this.user_id = result[0].id;
         
      }
    )
  }

  pay(payment_id){
    if(this.hasLoggedIn == true){
      this.makeReservation(payment_id);
    }else{
      //this.presentAlert("You need to sign in");
      this.createGuest(payment_id);
    }
  }

  createGuest(payment_id){
    this.httpProvider.addItem(this.guestEndpoint, JSON.stringify({device_id: this.deviceID, email: this.guestEmail, phone: this.guestMobile}))
      .subscribe(data =>{
        console.log(data);
        this.guestId = data.id;
        this.makeReservation(payment_id);
      });
  }

  makeReservation(payment_id){
    this.httpProvider.addItem(this.reservationEndpoint, JSON.stringify({
      user_id: this.user_id,
      product_id: this.productID,
      transaction_date: new Date(),
      transaction_start_date: this.transaction_start_date,
      transaction_end_date: this.transaction_end_date,
      transaction_start_time: this.transaction_start_time,
      transaction_end_time: this.transaction_end_time,
      number_activity_reserved: this.number_activity_reserved,
      nbr_in_party: 0,
      nbr_in_adult: this.number_activity_reserved,
      nbr_children: 0,
      misc_trip_name: this.productName,
      price: this.price,
      guest_id: this.guestId ,
      payment_id: payment_id
    })).subscribe(data => {
        console.log(data);
        this.navCtrl.push(ModifyReservationPage, {reservation: data});
    });
  }

  presentAlert(message) { 
    let alert = this.alertCtrl.create({
      title: 'Warning!',
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showMe(){
    if(this.name != undefined && this.account != undefined && this.expiry != undefined && this.cvv2 != undefined && this.postal != undefined){
      this.sendCardData();
    }else if(this.checked == false){
      this.presentAlert("Accept the terms and conditions");

    }else{
      this.presentAlert("All fields are required!");
    }
  }

  updateTerms(){
    console.log(this.checked);
  }
  sendCardData() { 
    this.loading.present();

    this.httpProvider.addItem(this.paymentEndpoint, JSON.stringify({
      acccttype: this.acctype,
      orderid: this.orderid,
      account: this.account,
      expiry: this.expiry,
      amount: this.amount,
      currency: this.currency,
      name: this.name,
      address: this.address,
      city: this.city,
      region: this.region,
      country: this.country,
      postal: this.postal,
      cvv2: this.cvv2,
    
    })).subscribe(data => {
      console.log("Payment", data);
      this.loading.dismiss();
      if(data.text === 'Approval'){
        this.pay(data.payment_id);

      }else{
        this.presentAlert(data.text);
      }
    }); 
}


}
