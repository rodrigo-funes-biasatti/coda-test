import { MiaFormComponent, MiaFormConfig } from '@agencycoda/mia-form';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit {

  @ViewChild(MiaFormComponent) miaForm!: MiaFormComponent;

  config!: MiaFormConfig;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private snackBarService: SnackBarService,
    private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.config = new MiaFormConfig();
    this.config.hasSubmit = false;
    this.config.fields = [
      { key: 'firstname', type: 'string', label: 'Nombre', validators: [Validators.required, Validators.maxLength(50)], caption: 'Nombre del Cliente' },
      { key: 'lastname', type: 'string', label: 'Apellido', validators: [Validators.required, Validators.maxLength(50)], caption: 'Apellido del Cliente' },
      { key: 'email', type: 'string', label: 'Email', validators: [Validators.required, Validators.email], caption: 'Email del Cliente' },
    ];
    this.config.errorMessages = [
      { key: 'required', message: 'El %label% es requerido.' },
      { key: 'email', message: 'El %label% tiene un formato incorrecto.' },
    ];
  }

  onClickGuardar() {
    if (this.miaForm.getErrors().length) {
      return;
    }
    if (this.data) {
      this.miaForm.submit().subscribe(
        (result) => {
          this.clientService.createUpdate(result).subscribe(
            () => this.snackBarService.show("Se guardó el Cliente con éxito."),
            err => this.snackBarService.show("No se ha podido guardar el Cliente: " + err));
        },
        (err) => { console.error(err) }
      )
    }
    else {
      this.clientService.createUpdate(new Client(
        this.miaForm.group.get('firstname')?.value,
        this.miaForm.group.get('lastname')?.value,
        this.miaForm.group.get('email')?.value,
      )).subscribe(
        () => this.snackBarService.show("Se guardó el Cliente con éxito."),
        err => this.snackBarService.show("No se ha podido guardar el Cliente: " + err));
    }
  }
}
