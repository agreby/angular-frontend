import type { Routes } from "@angular/router"
import { LoginComponent } from "./components/auth/login/login.component"
import { RegisterComponent } from "./components/auth/register/register.component"
import { ForgotPasswordComponent } from "./components/auth/forgot-password/forgot-password.component"
import { DashboardComponent } from "./components/dashboard/dashboard.component"
import { CampaignFormComponent } from "./components/campaign-form/campaign-form.component"
import { CampaignsListComponent } from "./components/campaigns-list/campaigns-list.component"
import { CampaignAnalyticsComponent } from "./components/campaign-analytics/campaign-analytics.component"
import { EmailTableComponent } from "./components/email-table/email-table.component"
import { PlanUsageComponent } from "./components/plan-usage/plan-usage.component"

export const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "campaigns/new", component: CampaignFormComponent },
  { path: "campaigns", component: CampaignsListComponent },
  { path: "campaigns/:id/analytics", component: CampaignAnalyticsComponent },
  { path: "emails", component: EmailTableComponent },
  { path: "plan-usage", component: PlanUsageComponent },
  { path: "**", redirectTo: "/login" },
]
