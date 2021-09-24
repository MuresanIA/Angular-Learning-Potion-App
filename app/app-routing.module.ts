import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { PotionDetailComponent } from './potions/potion-detail/recipe-detail.component';
import { PotionEditComponent } from './potions/potion-edit/potion-edit.component';
import { PotionsResolverService } from './potions/potions-resolver.service';
import { PotionStartComponent } from './potions/potion-start/potion-start.component';
import { PotionsComponent } from './potions/potions.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/potions', pathMatch: 'full' },
  {
    path: 'potions',
    component: PotionsComponent,
    children: [
      { path: '', component: PotionStartComponent },
      { path: 'new', component: PotionEditComponent },
      {
        path: ':id',
        component: PotionDetailComponent,
        resolve: [PotionsResolverService]
      },
      {
        path: ':id/edit',
        component: PotionEditComponent,
        resolve: [PotionsResolverService]
      }
    ]
  },
  { path: 'merchant-list', component: MerchantListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
