import { AutenticacaoService } from "../services/autenticacao.service";
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn:'root' })

export class AuthGuard implements CanActivate{

    constructor (private userService: AutenticacaoService,
                private router: Router) { }

    canActivate(
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): 
                boolean | Observable<boolean> | Promise<boolean> {

        if(!this.userService.isLogged()){
            this.router.navigateByUrl('/Auth/login');
            return false;
        }
        return true;
    }
}