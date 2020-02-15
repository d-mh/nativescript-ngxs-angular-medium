import { Injectable } from '@angular/core';
import { Actions, ofActionDispatched, ofActionCompleted, ofActionErrored } from '@ngxs/store';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Logout, Login, Authenticate } from '../state/auth.actions';
import { NavigationTransition } from 'tns-core-modules/ui/frame/frame';

@Injectable({
    providedIn: 'root',
})
export class RouteHandler {
    constructor(
        private actions: Actions,
        private routerExtension: RouterExtensions,
        private activeRoute: ActivatedRoute,
    ) {
        //  Logout
        this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
            this.navigateTo(['/login'], this.activeRoute, { name: 'slideRight' });
        });

        // Login
        this.actions.pipe(ofActionCompleted(Login)).subscribe(() => {
            this.navigateTo(['/items'], this.activeRoute);
        });

        // Login with token
        this.actions.pipe(ofActionCompleted(Authenticate)).subscribe(() => {
            this.navigateTo(['/items'], this.activeRoute);
        });
    }

    private navigateTo(path: string[], relativeTo: ActivatedRoute, transition?: NavigationTransition) {
        this.routerExtension.navigate(path, {
            clearHistory: true,
            relativeTo,
            animated: true,
            transition: transition ? transition : { name: 'slide' },
        });
    }
}