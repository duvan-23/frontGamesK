import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { HomeComponent } from './home/pages/home/home.component';
import { SlotMachineComponent } from './slot-machine/pages/slot-machine/slot-machine.component';
import { LoginComponent } from './login/pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: 'casino',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'home', component: HomeComponent
            },
            {
                path: 'slot-machine', component: SlotMachineComponent
            },
        ]
    },
    {
        path: 'login',
        canActivate: [loginGuard],
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    },
];
