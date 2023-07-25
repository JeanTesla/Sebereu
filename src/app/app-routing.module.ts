import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { WorkspaceComponent } from './components/home/workspace/workspace.component';
import { MyContributionsComponent } from './components/home/my-contributions/my-contributions.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { 
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', component: WorkspaceComponent},
      {path: 'my-contributions', component: MyContributionsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
