import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { AuthService } from "./auth.service"

@Injectable({
  providedIn: "root",
})
export class CampaignService {
  private apiUrl = "http://localhost:8080/api/campaigns"

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getCampaigns(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getCampaignById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  sendCampaign(campaign: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, campaign, { headers: this.getAuthHeaders() });
  }

  scheduleCampaign(campaign: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, campaign, { headers: this.getAuthHeaders() });
  }

  saveDraft(campaign: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { ...campaign, status: 'DRAFT' }, { headers: this.getAuthHeaders() });
  }

  sendCampaignById(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/send`, {}, { headers: this.getAuthHeaders() });
  }

  getDashboardStats(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/analytics/dashboard', { headers: this.getAuthHeaders() });
  }
}
