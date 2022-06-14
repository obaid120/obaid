import { NgModule } from '@angular/core';
import { NavComponent } from "./nav/nav.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { SpinComponent } from './spin/spin.component';
import { PageLoaderComponent } from './pageLoader/pageLoader.component';




@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule, RouterModule,
        MaterialModule,
    ],

    declarations: [
        NavComponent,
        SpinComponent,
        PageLoaderComponent
    ],

    exports: [
        NavComponent, CommonModule, SpinComponent, PageLoaderComponent
    ]
})
export class SharedModule {
}