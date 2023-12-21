import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpHeaderRequestInterceptor } from "./interceptors/http-request.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
  ],
  exports: [

  ],
  providers: [
    HttpHeaderRequestInterceptor,    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderRequestInterceptor,
      multi: true,
    },
    HttpHeaderRequestInterceptor,    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }
