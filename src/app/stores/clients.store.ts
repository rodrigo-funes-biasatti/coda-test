import { MiaPagination } from "@agencycoda/mia-core";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Client } from "../models/client";
import { ClientService } from "../services/client.service";

@Injectable({
    providedIn: "root"
})
export class ClientsStore {
    private _clientData$ = new BehaviorSubject<MiaPagination<Client>>({} as MiaPagination<Client>);

    constructor(private clientService: ClientService) { }

    getClientData(): BehaviorSubject<MiaPagination<Client>> {
        return this._clientData$;
    }

    fetchClientData() {
        this.clientService.getAll().subscribe(
            (response) => this._clientData$.next(response)
        );
    }
}