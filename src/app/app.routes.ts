import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { HomeComponent } from './home/pages/home/home.component';
import { SlotMachineComponent } from './slot-machine/pages/slot-machine/slot-machine.component';

export const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
        {
            path: '', component: HomeComponent
        },
        {
            path: 'slot-machine', component: SlotMachineComponent
        },
    ]
}];
