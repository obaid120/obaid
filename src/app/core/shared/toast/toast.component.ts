import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { UIService } from '../../services/ui/ui.service';


@Component({
    selector: 'toast',
    templateUrl: 'toast.component.html',
    styleUrls: ['toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

    // title = 'LMS';
    title = 'LC';
    msg = 'It is working!';
    iconType = 'info';
    opacity = 0;
    zIndex = 0;
    theme: any;
    notificationAlert = false;
    constructor(
        private _logService: LogService,
        private _uiService: UIService
    ) { }

    ngOnInit(): void {
        this._uiService.toastStatus.subscribe(
            (msg) => {
                //set title and msg
                this.notificationAlert = false;
                this.title = msg.title;
                this.msg = msg.msg;
                this.iconType = msg.iconType;
                this.opacity = 1;
                this.zIndex = 9999;
                this.theme = "danger";
                window.setTimeout(() => {
                    this.opacity = 0;
                    this.zIndex = 0;
                }, 4000)
            }
        );

        this._uiService.infoToastStatus.subscribe(
            (msg) => {
                // set title and msg
                this.notificationAlert = false;
                this.title = msg.title;
                this.msg = msg.msg;
                this.iconType = msg.iconType;
                this.opacity = 1;
                this.zIndex = 9999;
                this.theme = 'info';
                window.setTimeout(() => {
                    this.opacity = 0;
                    this.zIndex = 0;
                }, 4000);
            }
        );

        this._uiService.notificationToastStatus.subscribe(
            (msg) => {
                // set title and msg
                this._logService.logMessage("notifcation");

                this.notificationAlert = true;
                this.title = msg.title;
                this.msg = msg.msg;
                this.opacity = 1;
                this.zIndex = 9999;
                this.theme = 'warning';
                window.setTimeout(() => {
                    this.opacity = 0;
                    this.zIndex = 0;
                }, 4000);
            }
        );
    }

    ngOnDestroy(): void {
        this._uiService.toastStatus.unsubscribe();
    }

}
