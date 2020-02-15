import { Injectable } from '@angular/core';

// tslint:disable: no-console
@Injectable({
    providedIn: 'root',
})
export class Logger {

    constructor() { }

    log(title: string, color: string, payload: any) {

        // const greyStyle = 'color: #9E9E9E; font-weight: bold';
        const greenStyle = 'color: #4CAF50; font-weight: bold';
        const redishStyle = 'color: #FD8182; font-weight: bold';
        let prefix;

        switch (color) {
            case greenStyle:
                prefix = '[Logger - complete] ';
                break;

            case redishStyle:
                prefix = '[Logger - error] ';
                break;

            default:
                prefix = '[Logger] ';
                break;
        }

        console.log(prefix + title.substr(3));
        if (payload) {
            console.log('\n' + JSON.stringify(payload, null, '\u00AD\u00AD\u00AD'));
        }
    }
}
