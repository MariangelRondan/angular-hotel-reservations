import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute 
  ){ 
      //when we create this component, the angular DI will inject an insance of the service so we can use it on the 
      //comp. Same with router and FormBuilder
    
  }
  reservationForm: FormGroup = new FormGroup({
  })
  ngOnInit(): void {
   this.reservationForm = this.formBuilder.group({ //invoco los formControlNames que puse en el form
    checkInDate: ['', Validators.required],
    checkOutDate: ['', Validators.required],
    guestName: ['', Validators.required], 
    guestEmail: ['', [Validators.required, Validators.email ]],
    roomNumber: ['', Validators.required],
   })
   let id= this.activatedRoute.snapshot.paramMap.get('id') //obtiene el params de la url, que en el caso del edit, es el id

   if(id){
    let reservation = this.reservationService.getReservationDetail(id)
    if(reservation){
      this.reservationForm.patchValue(reservation)
       // Es un método utilizado en los formularios reactivos de Angular para actualizar solo una parte de los valores 
       //en un formulario. A diferencia de setValue(), que espera que proporciones valores para todos los campos del 
       //formulario, patchValue() te permite actualizar solo los campos que desees.
    }

   }

  }

  
  onSubmit(){
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value; 
      let id= this.activatedRoute.snapshot.paramMap.get('id') //obtiene el params de la url, que en el caso del edit, es el id
      
      if(id){ //Update
        this.reservationService.updateReservation(id, reservation)
      } else{ //new
        
        this.reservationService.addReservation(reservation);
      }
  
      this.router.navigate(['/list'])

    }
    }
 


}
