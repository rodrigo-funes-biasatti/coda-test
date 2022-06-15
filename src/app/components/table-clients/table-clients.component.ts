import { MiaPagination } from '@agencycoda/mia-core';
import { MiaTableComponent, MiaTableConfig } from '@agencycoda/mia-table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TABLE_CONFIG, COLUMNS_CONFIGURATION } from 'src/app/constants/table-config';
import { Client } from 'src/app/models/client';
import { ClientModalComponent } from '../client-modal/client-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ACTIONS_MODAL } from 'src/app/constants/actions-modal';
import { ClientService } from 'src/app/services/client.service';
import { DeleteClientModalComponent } from '../delete-client-modal/delete-client-modal.component';

@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrls: ['./table-clients.component.scss']
})
export class TableClientsComponent implements OnInit {

  @ViewChild(ClientModalComponent) clientModal?: ClientModalComponent;
  @ViewChild(DeleteClientModalComponent) deleteModal?: DeleteClientModalComponent;
  @ViewChild(MiaTableComponent) miaTable?: MiaTableComponent;
  tableConfig: MiaTableConfig = new MiaTableConfig();
  mockData?: MiaPagination<Client>;
  clientSelected?: Client;
  
  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router,
              private clientService: ClientService) {
    this.mockData = this.route.snapshot.data.clients;
   }

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig(): void {
    this.tableConfig.id = TABLE_CONFIG.id,
    this.tableConfig.loadingColor = TABLE_CONFIG.loadingColor,
    this.tableConfig.hasEmptyScreen = TABLE_CONFIG.hasEmptyScreen,
    this.tableConfig.emptyScreenTitle = TABLE_CONFIG.emptyScreenTitle,
    this.tableConfig.columns = COLUMNS_CONFIGURATION,
    this.tableConfig.onClick.subscribe(result => {
      this.handleButtonsModal(result);
    });
  }

  handleButtonsModal(result: any) {
    this.clientSelected = result.item;
    switch(result.key) {
      case ACTIONS_MODAL.edit: this.openDialogEdit(); break;
      case ACTIONS_MODAL.remove: this.openDialogDelete(); break;
    }
  }

  openDialogNew() {
    const dialogRef = this.dialog.open(ClientModalComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.clientSelected = undefined;
      this.refreshTable();
    })
  }

  openDialogEdit() {
    const dialogRef = this.dialog.open(ClientModalComponent, { data: { client: this.clientSelected }});
    dialogRef.afterClosed().subscribe(() => {
      this.clientSelected = undefined;
      this.refreshTable();
    })
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(DeleteClientModalComponent, { data: { client: this.clientSelected }});
    dialogRef.afterClosed().subscribe((resultModal) => {
      this.clientSelected = undefined;
      dialogRef.close();
      this.refreshTable(resultModal);
    })
  }

  refreshTable(client?: Client) {
    this.clientService.getAll().subscribe(
      res => {
        this.mockData = res;
        this.miaTable?.loadMocks();
      }
    )
    //this.mockData = this.miaTable?.mockData?.data.filter(cl => cl.id != client.id);
  }
}