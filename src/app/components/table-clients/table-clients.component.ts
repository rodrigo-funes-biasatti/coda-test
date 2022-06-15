import { MiaPagination } from '@agencycoda/mia-core';
import { MiaTableComponent, MiaTableConfig } from '@agencycoda/mia-table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TABLE_CONFIG,
  COLUMNS_CONFIGURATION,
} from 'src/app/constants/table-config';
import { Client } from 'src/app/models/client';
import { ClientModalComponent } from '../client-modal/client-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ACTIONS_MODAL } from 'src/app/constants/actions-modal';
import { ClientService } from 'src/app/services/client.service';
import { DeleteClientModalComponent } from '../delete-client-modal/delete-client-modal.component';
import { ClientsStore } from 'src/app/stores/clients.store';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrls: ['./table-clients.component.scss'],
})
export class TableClientsComponent implements OnInit {
  @ViewChild(ClientModalComponent) clientModal?: ClientModalComponent;
  @ViewChild(DeleteClientModalComponent)
  deleteModal?: DeleteClientModalComponent;
  @ViewChild(MiaTableComponent) miaTable?: MiaTableComponent;
  tableConfig: MiaTableConfig = new MiaTableConfig();
  clientData$!: BehaviorSubject<MiaPagination<Client>>;
  clientSelected?: Client;

  constructor(public dialog: MatDialog, private clientStore: ClientsStore) {}

  ngOnInit(): void {
    this.loadConfig();
    this.getClientData();
  }

  loadConfig(): void {
    (this.tableConfig.id = TABLE_CONFIG.id),
      (this.tableConfig.loadingColor = TABLE_CONFIG.loadingColor),
      (this.tableConfig.hasEmptyScreen = TABLE_CONFIG.hasEmptyScreen),
      (this.tableConfig.emptyScreenTitle = TABLE_CONFIG.emptyScreenTitle),
      (this.tableConfig.columns = COLUMNS_CONFIGURATION),
      this.tableConfig.onClick.subscribe((result) => {
        this.handleButtonsModal(result);
      });
  }

  getClientData() {
    this.clientData$ = this.clientStore.getClientData();
    this.clientStore.fetchClientData();
  }

  handleButtonsModal(result: any) {
    this.clientSelected = result.item;
    switch (result.key) {
      case ACTIONS_MODAL.edit:
        this.openDialogEdit();
        break;
      case ACTIONS_MODAL.remove:
        this.openDialogDelete();
        break;
    }
  }

  openDialogNew() {
    const dialogRef = this.dialog.open(ClientModalComponent, { width: '20vw' });
    dialogRef.afterClosed().subscribe(() => {
      this.clientSelected = undefined;
    });
  }

  openDialogEdit() {
    const dialogRef = this.dialog.open(ClientModalComponent, {
      data: { client: this.clientSelected },
      width: '20vw',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.clientSelected = undefined;
    });
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(DeleteClientModalComponent, {
      data: { client: this.clientSelected },
    });
    dialogRef.afterClosed().subscribe((resultModal) => {
      this.clientSelected = undefined;
      dialogRef.close();
    });
  }
}
