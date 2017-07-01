export class Car {
  id: number;
  user: number;
  model: string;
  enrollment: string;

  constructor(id: number, user: number, model: string, enrollment: string) {
    this.id = id;
    this.user = user;
    this.model = model;
    this.enrollment = enrollment;
  }
}
