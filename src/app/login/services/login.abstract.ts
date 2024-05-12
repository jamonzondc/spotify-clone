import { Observable } from 'rxjs';
import { BearerTokenType } from 'src/app/shared/api/models/bearer-token.type';

export abstract class LoginAbstract {
  abstract getToken(): Observable<BearerTokenType>;
}
