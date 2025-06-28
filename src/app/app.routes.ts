import type { Routes } from "@angular/router"
import { LoginComponent } from "./components/auth/login/login.component"
import { RegisterComponent } from "./components/auth/register/register.component"
import { ForgotPasswordComponent } from "./components/auth/forgot-password/forgot-password.component"
import { DashboardComponent } from "./components/dashboard/dashboard.component"

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "**", redirectTo: "/login" },
]
