// import { Injectable, Injector } from '@angular/core';
// import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { AuthService } from "./auth.service";
// import { environment } from "../../environments/environment";
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   private secureRoutes = [`${environment.serverUrl}/api`];

//   constructor(private injector: Injector,
//   ) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.secureRoutes.find((x) => request.url.startsWith(x))) {
//       return next.handle(request);
//     }

//     const authService = this.injector.get(AuthService); // get it here within intercept
//     const token = authService.token;

//     if (!token) {
//       return next.handle(request);
//     }

//     request = request.clone({
//       headers: request.headers.set('Authorization', 'Bearer ' + token),
//     });

//     return next.handle(request).pipe(
//       // tap(
//       //     event => { }, err => {
//       //         if (err instanceof HttpErrorResponse && err.status == 401) {
//       //             console.log("handle 401 errors");
//       //             authService.login();
//       //         }
//       //     }
//       // )
//   );
//   }
// }
