import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { TarefaService } from './services/tarefa.service';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule } from '@ionic/angular';
import { EditarTarefaComponent } from './componentes/editar-tarefa/editar-tarefa.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    HomeComponent,
    EditarTarefaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    IonicModule.forRoot() 
  ],
  providers: [
    AuthService,
    TarefaService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
