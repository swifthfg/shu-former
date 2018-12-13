import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataService} from "./data.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dataService: DataService) {};

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const adminToken = this.dataService.getAdminToken();

    if (adminToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", adminToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
