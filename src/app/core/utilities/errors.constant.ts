import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ErrorsConstantService {
  public static readonly GENERIC_ERROR: string = 'GENERIC';
  public static readonly UNAUTHORIZED: string = '401';
  public static readonly FORBIDDEN: string = '403';
  public static readonly TOO_MANY_REQUESTS: string = '429';

  private readonly errorsTranslations: Map<string, string> = new Map<string, string>([
    [ErrorsConstantService.UNAUTHORIZED, 'Token inválido o expirado. Por favor, vuelve a iniciar sesión.'],
    [ErrorsConstantService.FORBIDDEN, 'Error en la solicitud OAuth (clave de consumidor incorrecta, nonce malo, marca de tiempo expirada...). Desafortunadamente, volver a autenticar al usuario no ayudará en este caso.'],
    [ErrorsConstantService.TOO_MANY_REQUESTS, 'La aplicación ha excedido sus límites de tasa. Por favor, inténtalo de nuevo más tarde.'],
    [ErrorsConstantService.GENERIC_ERROR, 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.'],
  ]);

  public getErrorMessage(code: string): string {
    return this.errorsTranslations.get(code) || this.errorsTranslations.get(ErrorsConstantService.GENERIC_ERROR)!;
  }
}

