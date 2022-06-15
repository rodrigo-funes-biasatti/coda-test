import { MiaPagination } from '@agencycoda/mia-core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';
import { ClientsStore } from '../stores/clients.store';

@Injectable({
  providedIn: 'root'
})
export class ClientesResolveService implements Resolve<MiaPagination<Client>>{

  constructor(private clientStore: ClientsStore) { }

  resolve(): Observable<MiaPagination<Client>> {
    return this.clientStore.getClientData().asObservable();
  }
}
