import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBlog } from '../blog.model';
import { BlogService } from '../service/blog.service';

export const blogResolve = (route: ActivatedRouteSnapshot): Observable<null | IBlog> => {
  const id = route.params['id'];
  if (id) {
    return inject(BlogService)
      .find(id)
      .pipe(
        mergeMap((blog: HttpResponse<IBlog>) => {
          if (blog.body) {
            return of(blog.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        })
      );
  }
  return of(null);
};

export default blogResolve;
