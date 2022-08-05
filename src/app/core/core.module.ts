import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth/auth.service';
import { UIService } from './services/ui/ui.service';
import { ATKService } from './services/atk/atk.service';
import { LogService } from './services/log/log.service';
import { UtilityService } from './services/utility/utility.service';
import { MappingService } from './services/mapping/mapping.service';
import { UserService } from './services/user/user.service';
import { ConfigurationService } from './services/configuration/configuration.service';
import { InterceptorService } from './services/base/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCancelService } from './services/base/httpCancel.service';
import { AuthGuard } from './guards/auth.guard';
import { MainGuard } from './guards/main.guard';
import { PhonePipe } from './services/pipe/phone-format.pipe';




@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule, RouterModule,
        SharedModule
    ],

    declarations: [
    ],

    exports: [
        CommonModule,
    ],
    providers: [
        AuthService,
        UIService,
        ATKService,
        LogService,
        UtilityService,
        DatePipe,
        MappingService,
        UserService,
        AuthGuard,
        MainGuard,
        ConfigurationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
        },
        HttpCancelService,
        PhonePipe
    ]
})
export class CoreModule {
}