import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsersProvider } from '../providers/users/users';
import { FeedPage } from '../pages/feed/feed';
import { HttpModule } from '@angular/http';
import { LocationsPage } from '../pages/locations/locations';
import { IonicStorageModule } from '@ionic/storage';
import { ProductPage } from '../pages/product/product';
import { ProductListPage } from '../pages/product-list/product-list';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { FavoritesPage } from '../pages/favorites/favorites';
import { ReviewPage } from '../pages/review/review';
import { SingleReviewPage } from '../pages/single-review/single-review';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FeedPage,
    LocationsPage,
    ProductPage,
    ProductListPage,
    EditProfilePage,
    FavoritesPage,
    ReviewPage,
    SingleReviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    Ionic2RatingModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FeedPage,
    LocationsPage,
    ProductPage,
    ProductListPage,
    EditProfilePage,
    FavoritesPage,
    ReviewPage,
    SingleReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider
  ]
})
export class AppModule {}
