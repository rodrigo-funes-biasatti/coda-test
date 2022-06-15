import { MiaPagination } from '@agencycoda/mia-core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesResolveService implements Resolve<MiaPagination<Client>>{

  constructor(private clientService: ClientService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MiaPagination<Client>> {
    return this.clientService.getAll()
  }
}
