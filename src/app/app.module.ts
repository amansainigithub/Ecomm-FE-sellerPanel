import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SellerDashComponent } from './seller-panel/seller-dash/seller-dash.component';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './home/home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgToastModule } from 'ng-angular-popup';
import { SellerDataFormComponent } from './register/seller-data-form/seller-data-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Import this
import {MatExpansionModule} from '@angular/material/expansion';
import { RegisterCompletedComponent } from './register/register-completed/register-completed.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { SellerHomeComponent } from './seller-panel/seller-home/seller-home.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CatalogAllComponent } from './seller-panel/seller-catalog/catalogs/catalog-all/catalog-all.component';
import { CatalogProgressComponent } from './seller-panel/seller-catalog/catalogs/catalog-progress/catalog-progress.component';
import { CatalogErrorComponent } from './seller-panel/seller-catalog/catalogs/catalog-error/catalog-error.component';
import { CatalogPassComponent } from './seller-panel/seller-catalog/catalogs/catalog-pass/catalog-pass.component';
import { CatalogDraftComponent } from './seller-panel/seller-catalog/catalogs/catalog-draft/catalog-draft.component';
import { CatalogsAreaComponent } from './seller-panel/seller-catalog/catalogs/catalogs-area/catalogs-area.component';
import { NgChartsModule } from 'ng2-charts';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDialogModule} from '@angular/material/dialog';
import { SingleProductListingComponent } from './seller-panel/seller-catalog/sellerSingleCatalog/single-product-listing/single-product-listing.component';
import { SingleProductVariantComponent } from './seller-panel/seller-catalog/sellerSingleCatalog/single-product-variant/single-product-variant.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SellerDashComponent,
    HomeComponent,
    SellerDataFormComponent,
    RegisterCompletedComponent,
    SellerHomeComponent,
    CatalogAllComponent,
    CatalogProgressComponent,
    CatalogErrorComponent,
    CatalogPassComponent,
    CatalogDraftComponent,
    CatalogsAreaComponent,
    SingleProductListingComponent,
    SingleProductVariantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    NgToastModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    NgChartsModule,
    MatTooltipModule,
    MatSelectModule,
    MatBadgeModule,
    MatDialogModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders,provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
