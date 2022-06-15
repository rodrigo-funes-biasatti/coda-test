import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { MiaBaseCrudHttpService, MiaPagination } from '@agencycoda/mia-core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import URL_CLIENTS from '../constants/url-clients';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends MiaBaseCrudHttpService<Client> {

  constructor(
    protected http: HttpClient
  ) {
    super(http);
    this.basePathUrl = environment.baseUrl + 'client';
  }
 
  getAll(): Observable<MiaPagination<Client>> {
    return this.postOb<MiaPagination<Client>>(this.basePathUrl + URL_CLIENTS.all, {});
  }

  createUpdate(client: Client): Observable<Client> {
    return this.postOb<Client>(this.basePathUrl + URL_CLIENTS.crateUpdate, client);
  }

  deleteClient(itemId: number): Observable<boolean> {
    return this.removeOb(itemId);
  }
}