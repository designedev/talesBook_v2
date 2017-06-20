import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpModule, JsonpModule} from '@angular/http';
import { ItemService } from './item-service';
import { PingService } from './ping.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    ItemService,
    PingService,
    {provide : COMPOSITION_BUFFER_MODE, useValue: false }
    ],
  bootstrap: [HomeComponent]
})
export class AppModule { }
