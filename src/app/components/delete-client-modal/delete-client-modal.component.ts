import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ClientsStore } from 'src/app/stores/clients.store';

@Component({
  selector: 'app-delete-client-modal',
  templateUrl: './delete-client-modal.component.html',
  styleUrls: ['./delete-client-modal.component.scss']
})
export class DeleteClientModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private snackBarService: SnackBarService,
              private clientService: ClientService,
              private clientStore: ClientsStore) { }

  ngOnInit(): void { }

  onClickEliminar() {
    this.clientService.deleteClient(this.data.client.id).subscribe(
      () => {
        this.snackBarService.show("Se eliminó el Cliente con éxito.");
        this.clientStore.fetchClientData();
      },
      err => this.snackBarService.show("No se ha podido eliminar el Cliente: " + err.error)
    );
  }
}
