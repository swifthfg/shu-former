import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {DataService} from "./data.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import { map } from 'rxjs/operators';
import {Injectable} from "@angular/core";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private data: DataService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
          // do nothing
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) { // TODO for 403 make seperate page
            alert('You are not authorized!')
            this.router.navigate(['admin', 'login']);
            return Observable.throw(err);
          }
          return Observable.throw(err);
        }
      })
    );
  }
}

