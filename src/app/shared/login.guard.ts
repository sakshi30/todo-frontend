import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate{
    public historyArray = [];

    constructor(
        private _router: Router,
        private http: HttpClient,
        private _auth: AuthorizationService,
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{
        if(this._auth.isLoggedIn()){
            return true;
        }
        this._auth.currentURL = route.url[0].path;
        this._router.navigateByUrl('/login');
        return false;
    }
}