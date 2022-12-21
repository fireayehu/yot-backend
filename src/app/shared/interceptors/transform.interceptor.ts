import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({ data })),
      catchError((err) =>
        throwError(() => {
          if (err.response) {
            if (Array.isArray(err.response.message)) {
              return new HttpException(
                err.response.message[0],
                err.response.statusCode,
              );
            } else {
              return new HttpException(
                err.response.message,
                err.response.statusCode,
              );
            }
          }
          return err;
        }),
      ),
    );
  }
}
