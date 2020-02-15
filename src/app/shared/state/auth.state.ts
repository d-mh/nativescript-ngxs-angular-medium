import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Login, Logout, Authenticate } from './auth.actions';
import { AuthService } from '../service/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthStateModel {
    token: string | null;
    username: string | null;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        username: null,
    },
})
export class AuthState {
    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.token;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.token;
    }

    constructor(
        private authService: AuthService,
    ) { }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        return this.authService.login(action.payload).pipe(
            tap((result: { token: string }) => {
                ctx.patchState({
                    token: result.token,
                    username: action.payload.username,
                });
            }),
            catchError(error => throwError(error)),
        );
    }

    @Action(Authenticate)
    loginWithToken(ctx: StateContext<AuthStateModel>) {
        return this.authService.authenticate(ctx.getState().token).pipe(
            tap((result: { token: string }) => {
                ctx.patchState({
                    token: result.token,
                    username: ctx.getState().username,
                });
            }),
            catchError(error => throwError(error)),
        );
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        return this.authService.logout(state.token).pipe(
            tap(() => {
                ctx.setState({
                    token: null,
                    username: null,
                });
            }),
        );
    }
}