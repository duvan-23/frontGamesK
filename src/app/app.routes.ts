import { Routes } from '@angular/router';
import { GameListComponent } from './games/components/game-list/game-list.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
        {
            path: '', component: GameListComponent
        }
    ]
}];
