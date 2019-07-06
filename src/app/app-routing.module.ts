import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'brands', component: MarcasComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path:'', pathMatch:'full', redirectTo:'/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }