import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./core/authentication/login/login.component";
import {MainLayoutComponent} from "./core/layout/main-layout/main-layout.component";
import {
    AngularFireAuthGuard, canActivate,
    hasCustomClaim,
    redirectLoggedInTo,
    redirectUnauthorizedTo
} from "@angular/fire/auth-guard";
import {RegisterComponent} from "./core/authentication/register/register.component";

// const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
// const belongsToAccount = (next: any) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home' // navigate to home if there was NO route
    },
    {
        path: '',
        component: MainLayoutComponent,
        ...canActivate(redirectUnauthorizedToLogin),
        children: [
            {
                path: 'home',
                loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'admin',
                loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'logout',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
    },
    {
        path: '**', // catch all routes
        redirectTo: 'home' // can redirect home or to dedicated "not found" route
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
