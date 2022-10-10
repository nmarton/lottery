import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import NumberGeneratorService from './services/numberGenerator.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameModule,
    AuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
