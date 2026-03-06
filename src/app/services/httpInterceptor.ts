import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

// export class HttpInterceptorService implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const authToken = "someshit";
//         const authReq = req.clone({
//             headers: req.headers.set("Authentication", authToken)
//         })
//         return next.handle(authReq);
//     }

// }

export function httpInterceptorService(req: HttpRequest<any>, next: HttpHandlerFn) {
    const authToken = "someshit";
    const authReq = req.clone({
        headers: req.headers.append("Authentication", authToken)
    })
    return next(authReq);
}