import { Component, OnInit, TemplateRef } from '@angular/core';
import { ARREGLO_FOTOS } from './../mocks/album-mock';
import { Foto } from './../models/album';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  public fotoSeleccionada: Foto;
  public fotoArreglo: Foto[];
  public tmpBase64: any;
  public modalRef: BsModalRef;
  public modalTitulo: string;
  public modalTexto: string;
  public modalContenido: string;
  public initializeModal: any;

  constructor(
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.fotoSeleccionada = new Foto(0, '', '', '',);
    this.fotoArreglo = ARREGLO_FOTOS;
    this.modalRef = this.initializeModal;
    this.modalTitulo = '';
    this.modalTexto = '';
    this.modalContenido = '';
  }

  ngOnInit(): void {}

  public cancelar(): void {
    this.fotoSeleccionada = new Foto(0, '', '', '');
    this.modalRef.hide();
  }

  public grabarFoto(): boolean {
    if (
      this.fotoSeleccionada.descripcion == '' ||
      this.fotoSeleccionada.fotoBase64 == ''
    ) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 8000,
      };
      this.toastr.error(
        'No se pueden crear <br/> registros vacios',
        'ADVERTENCIA',
        parametros
      );
      return false;
    } else {
      this.fotoSeleccionada.id = this.fotoArreglo.length + 1;
      this.fotoArreglo.push(this.fotoSeleccionada);
      return true;
    }
  }

  public procesarFoto(): void {
    if (this.fotoSeleccionada.id === 0) {
      this.grabarFoto();
    }
    this.fotoSeleccionada = new Foto(0, '', '', '');
    this.modalRef.hide();
  }

  public eliminarFoto(objFoto: Foto): void {
    this.fotoArreglo = this.fotoArreglo.filter(
      (elemento) => elemento != objFoto
    );
    this.fotoSeleccionada = new Foto(0, '', '', '');
  }

  public eliminar(): void {
    this.eliminarFoto(this.fotoSeleccionada);
    this.modalRef.hide();
  }

  public cancelarEliminar(): void {
    this.modalRef.hide();
  }

  public abrirModalEliminar(template: TemplateRef<any>, fotoTmp: Foto): void {
    this.fotoSeleccionada = fotoTmp;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'ADVERTENCIA';
    this.modalTexto = '¿Realmente quiere eliminar este registro?';
  }

  public abrirModalActulizar(template: TemplateRef<any>, fotoTmp: Foto): void {
    this.fotoSeleccionada = fotoTmp;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'ADVERTENCIA';
    this.modalTexto = '¿Desea actulizar estos datos?';
  }

  public seleccionarFoto(input: any): any {
    if (!input.target.files[0] || input.target.files[0].length === 0) {
      return;
    }
    const mimeType = input.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };

      this.toastr.error(
        'Solo se permiten <strong> imágenes</strong>',
        'Te lo estoy advirtiendo',
        parametros
      );
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.onload = () => {
      this.tmpBase64 = reader.result;

      this.fotoSeleccionada.fotoBase64 = this.tmpBase64;
      this.fotoSeleccionada.foto = input.target.files[0].name;
    };
  }

}
