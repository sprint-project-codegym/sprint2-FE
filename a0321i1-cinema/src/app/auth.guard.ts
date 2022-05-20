import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from './service/security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private tokenStorageService:TokenStorageService,
              private toastService: ToastrService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser =  this.tokenStorageService.getUser();
    if(currentUser!==null){
      let role = currentUser.authorities[0].authority;
      console.log(route.data);
      if(route.data.roles.indexOf(role) === -1){
        this.router.navigate(['/page-not-allow-access'],{
          queryParams: { returnUrl: state.url }});
        return false;
      }
      return true;
    }
    console.log("not authorize");
    this.router.navigateByUrl("/404");
    return false;

  }

}
