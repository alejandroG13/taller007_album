export class Foto {
  public id: number;
  public foto: string;
  public fotoBase64: string;
  public descripcion: string;

  constructor(id: number, foto: string, foto64: string, descrip: string) {
    this.id = id;
    this.foto = foto;
    this.fotoBase64 = foto64;
    this.descripcion = descrip;
  }
}
