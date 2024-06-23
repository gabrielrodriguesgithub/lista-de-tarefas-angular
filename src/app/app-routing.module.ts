import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'register', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] }, // Página inicial
  // Outras rotas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
