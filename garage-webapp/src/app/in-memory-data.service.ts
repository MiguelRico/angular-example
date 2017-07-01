import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 0,  dni: '47835678-E', name: 'Antonio Perez', address: 'Avd/ Palomeque N 3', telephone: 678253678 },
      { id: 1,  dni: '46785907-F', name: 'Juan Gomez', address: 'Avd/ Galaroza N 6', telephone: 678456377 },
      { id: 2,  dni: '57893085-X', name: 'Maria Jimenez', address: 'Avd/ Alemania N 8', telephone: 698076893 },
      { id: 3,  dni: '24569876-G', name: 'Rosa Lopez', address: 'Avd/ Andalucia N 23', telephone: 635214578 }
    ];
    const bills = [
      { id: 0,  user: '0', car: '0', concept: '0', amount: 300},
      { id: 1,  user: '0', car: '1', concept: '2', amount: 150},
      { id: 2,  user: '2', car: '3', concept: '3', amount: 60},
      { id: 4,  user: '2', car: '4', concept: '1', amount: 250},
      { id: 5,  user: '3', car: '5', concept: '2', amount: 150},
      { id: 6,  user: '1', car: '2', concept: '0', amount: 300},
      { id: 7,  user: '2', car: '4', concept: '4', amount: 50},
      { id: 8,  user: '3', car: '5', concept: '4', amount: 50},
    ];
    const cars = [
      { id: 0, user: 0, model: 'Renault Clio', enrollment: '6437-FPH'},
      { id: 1, user: 0, model: 'Wolkswagen Golf', enrollment: '7657-FHG'},
      { id: 2, user: 1, model: 'Mercedes', enrollment: '9457-ERT'},
      { id: 3, user: 2, model: 'Audi Q7', enrollment: '6347-FDC'},
      { id: 4, user: 2, model: 'Citroen Saxo', enrollment: '2227-KIU'},
      { id: 5, user: 3, model: 'Renault Megane', enrollment: '4457-UJH'},
    ];
    const concepts = [
      { id: 0,  name: 'Oil change' },
      { id: 1,  name: 'Technical inspection' },
      { id: 2,  name: 'Change of tires' },
      { id: 3,  name: 'Washed' },
      { id: 4,  name: 'Headlight change' }
    ];
    return {users, bills, cars, concepts};
  }
}
