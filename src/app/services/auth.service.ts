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
    // Check if user is already logged in
    const token = localStorage.getItem("authToken")
    if (token) {
      // You might want to validate the token with the backend
      this.getCurrentUser().subscribe()
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem("authToken", response.token)
        this.currentUserSubject.next(response.user)
      }),
    )
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap((response) => {
        localStorage.setItem("authToken", response.token)
        this.currentUserSubject.next(response.user)
      }),
    )
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
    return !!localStorage.getItem("authToken")
  }

  getToken(): string | null {
    return localStorage.getItem("authToken")
  }
}
