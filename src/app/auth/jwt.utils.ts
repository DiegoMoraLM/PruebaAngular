import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  [key: string]: any;
  sub: string;
  exp: number;
  jti: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (e) {
    console.error('Error al decodificar el token JWT:', e);
    return null;
  }
}
