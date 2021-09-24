import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { MerchantEditComponent } from "./merchant-list/merchant-edit/merchant-edit.component";
import { MerchantListComponent } from "./merchant-list/merchant-list.component";
import { MerchantListService } from "./merchant-list/merchant-list.service";
import { PotionDetailComponent } from "./potions/potion-detail/recipe-detail.component";
import { PotionEditComponent } from "./potions/potion-edit/potion-edit.component";
import { PotionListComponent } from "./potions/potion-list/potion-list.component";
import { PotionItemComponent } from "./potions/potion-list/recipe-item/potion-item.component";
import { PotionStartComponent } from "./potions/potion-start/potion-start.component";
import { PotionService } from "./potions/potion.service";
import { PotionsComponent } from "./potions/potions.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { StoreModule } from "@ngrx/store";
import { merchantListReducer } from "./merchant-list/merchant-list.reducer";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PotionsComponent,
    PotionListComponent,
    PotionItemComponent,
    MerchantListComponent,
    DropdownDirective,
    PotionStartComponent,
    PotionEditComponent,
    PotionDetailComponent,
    MerchantEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ merchantList: merchantListReducer }),
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [MerchantListService, PotionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
