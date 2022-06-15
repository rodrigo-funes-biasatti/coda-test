import { MiaPagination } from '@agencycoda/mia-core';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
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
