import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogService } from '../../services/log/log.service';
import { UIService } from '../../services/ui/ui.service';


@Component({
    selector: 'page-loader',
    // moduleId: module.id,
    templateUrl: 'pageLoader.component.html'
})
export class PageLoaderComponent implements OnInit, OnDestroy {

    visible = false;

    constructor(
        private _uiService: UIService,
        private _logService: LogService,
    ) {
    }

    ngOnInit(): void {
        // this._logService.logMessage("loader Comp");
        this._uiService.spinnerStatus.subscribe(
            (show) => {
                this._logService.logMessage("Page Loader");
                this._logService.logMessage("show");
                this._logService.logMessage(show);
                this.visible = show;
            }
        );
    }

    ngOnDestroy(): void {
        this._uiService.spinnerStatus.unsubscribe();
    }
}