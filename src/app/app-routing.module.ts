import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SellerGuardService } from './sellerGuard/seller-guard.service';
import { SellerDashComponent } from './seller-panel/seller-dash/seller-dash.component';
import { HomeComponent } from './home/home/home.component';
import { SellerDataFormComponent } from './register/seller-data-form/seller-data-form.component';
import { RegisterCompletedComponent } from './register/register-completed/register-completed.component';
import { SellerHomeComponent } from './seller-panel/seller-home/seller-home.component';
import { CatalogsAreaComponent } from './seller-panel/seller-catalog/catalogs/catalogs-area/catalogs-area.component';
import { SingleProductListingComponent } from './seller-panel/seller-catalog/sellerSingleCatalog/single-product-listing/single-product-listing.component';
import { SingleProductVariantComponent } from './seller-panel/seller-catalog/sellerSingleCatalog/single-product-variant/single-product-variant.component';
import { ProductIncompleteComponent } from './seller-panel/seller-catalog/product-status/product-incomplete/product-incomplete.component';
import { ProductVariantCompleteComponent } from './seller-panel/seller-catalog/product-status/product-variant-complete/product-variant-complete.component';

const routes: Routes = [
{ path: 'register', component: RegisterComponent },
{ path: '', component:HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register/seller-information', component: SellerDataFormComponent },

{ path: 'register/register-completed', component: RegisterCompletedComponent },

{
  path: 'seller/dashboard/home',canActivate:[SellerGuardService] ,
      children: [
                  //ADMIN PANEL
                    { path: '', component: SellerHomeComponent },
                    { path: 'seller-dashboard', component:SellerDashComponent },
                    { path: 'catalog-Area', component:CatalogsAreaComponent },
                    { path: 'product-Incomplete', component:ProductIncompleteComponent },
                    { path: 'singleProductListing', component:SingleProductListingComponent},
                    { path: 'variantProduct', component:SingleProductVariantComponent},
                    { path: 'variantComplete/:variantId', component:ProductVariantCompleteComponent},
                  
      ],
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
