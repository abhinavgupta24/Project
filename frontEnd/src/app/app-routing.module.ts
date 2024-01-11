import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItemListComponent } from "./myComponent/item-list/item-list.component";
import { WelcomeComponent } from "./myComponent/welcome/welcome.component";
import {EntityCrudComponent} from "./entity-crud/entity-crud.component"
import { ItemUpdateComponent } from "./item-update/item-update.component";
import { ItemDetailsComponent } from "./myComponent/item-details/item-details.component";
import { LoginComponent } from "./myComponent/login/login.component";
import { SignUpComponent } from "./myComponent/sign-up/sign-up.component";
import { AuthGuard } from "./auth.guard";
const routes: Routes=[
    {path:'signUp',component:SignUpComponent},
    {path:'login',component:LoginComponent},
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'greeting',component: WelcomeComponent,canActivate:[AuthGuard] },
    {path:'items',component:ItemListComponent,canActivate:[AuthGuard]},
    {path:'addItem',component: EntityCrudComponent,canActivate:[AuthGuard] },
    {path:'updateItem/:id', component:ItemUpdateComponent},
    {path:'item-details/:id',component: ItemDetailsComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}