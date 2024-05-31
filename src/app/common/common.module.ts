import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterMarkPageComponent } from './water-mark-page/water-mark-page.component';
import { InterstoreComponent } from './interstore/interstore.component';
import { RouterModule } from '@angular/router';
import { CommonTvmRoutingModule } from './common-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { SearchComponent } from './search/search.component';
import { CardTableViewControllerComponent } from './card-table-view-controller/card-table-view-controller.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { TableGeneratorComponent } from './table-generator/table-generator.component';
import { CalendarModule } from 'primeng/calendar';
import { UploadImagesComponent } from './upload-image/upload-image.component';
import { FileUploadService } from '../Serviceimage/file-upload.Services';
import { BreadcrumbComponent } from '../bread-crumb/bread-crumb.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppModule } from "../app.module";

@NgModule({
    declarations: [
        WaterMarkPageComponent,
        InterstoreComponent,
        NavBarComponent,
        SideNavBarComponent,
        SearchComponent,
        CardTableViewControllerComponent,
        FormGeneratorComponent,
        TableGeneratorComponent,
        UploadImagesComponent,
        BreadcrumbComponent
    ],
    exports: [
        NavBarComponent,
        SideNavBarComponent,
        SearchComponent,
        CardTableViewControllerComponent,
        FormGeneratorComponent,
        TableGeneratorComponent,
        UploadImagesComponent,
        BreadcrumbComponent,
    ],
    providers: [
        FileUploadService
    ],
    imports: [
        CommonModule,
        RouterModule,
        CommonTvmRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CalendarModule,
        NgSelectModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        AppModule
    ]
})
export class CommonTvmModule { }
