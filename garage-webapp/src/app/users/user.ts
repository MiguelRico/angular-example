export class User {
  id: number;
  dni: string;
  name: string;
  address: string;
  telephone: number;

  constructor(id: number, dni: string, name: string, address: string, telephone: number) {
    this.id = id;
    this.dni = dni;
    this.name = name;
    this.address = address;
    this.telephone = telephone;
  }
}
