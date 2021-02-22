import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewComponent } from './pages/create-new/create-new.component';
import { HomeComponent } from './pages/home/home.component';
import { ModifyComponent } from './pages/modify/modify.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'task/:id', component: TaskComponent },
    { path: 'create', component: CreateNewComponent},
    { path: 'modify/:id', component: ModifyComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }