import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit{

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService){ 
    //angular DI will inject an instance of the service cuando se instancie la clase.

  }

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }


    deleteReservation(id: string): void {
      this.reservationService.deleteReservation(id);
    }
}
