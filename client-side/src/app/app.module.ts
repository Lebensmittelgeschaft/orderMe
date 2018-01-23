import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { NewOrderPageComponent } from './components/new-order-page/new-order-page.component';


export const appRoutes: Routes = [
  { path: 'items', component: ItemsPageComponent },
  { path: 'neworder', component: NewOrderPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ItemsPageComponent,
    NewOrderPageComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    RouterModule,
    MatTabsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

