import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-verification',
  templateUrl: './approve-verification.component.html',
  styleUrls: ['./approve-verification.component.scss']
})
export class ApproveVerificationComponent implements OnInit {

  id:number;
  
  constructor() { }

  ngOnInit(): void {
    this.refresh();
  }

  approveVerification(){
    
  }

  declineVerification(){

  }

  refresh(){
    
  }

}
