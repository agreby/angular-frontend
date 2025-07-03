import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, BehaviorSubject } from "rxjs"
import { tap } from "rxjs/operators"

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  token: string
  user: User
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/auth"
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient) {
    // Don't automatically call getCurrentUser on startup
    // This prevents 403 errors when user is not logged in
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        const token = response.data?.token;
        const user = response.data?.user;
        localStorage.setItem("authToken", token);
        this.currentUserSubject.next(user);
      }),
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        const token = response.data?.token;
        const user = response.data?.user;
        if (token) localStorage.setItem("authToken", token);
        if (user) this.currentUserSubject.next(user);
      }),
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email })
  }

  logout(): void {
    localStorage.removeItem("authToken")
    this.currentUserSubject.next(null)
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`)
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("authToken");
    return !!(token && token !== "undefined" && token !== "null" && token !== "");
  }

  getToken(): string | null {
    const token = localStorage.getItem("authToken");
    if (token && token !== "undefined" && token !== "null" && token !== "") {
      return token;
    }
    return null;
  }
}
