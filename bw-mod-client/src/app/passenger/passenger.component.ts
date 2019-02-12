import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetConversationGQL } from 'src/generated/graphql';


@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {
  convId: string;

  constructor(private getConversation: GetConversationGQL, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.convId = this.route.snapshot.paramMap.get('convId');
    console.log('============== convid', this.convId);
    this.getConversation.fetch({ convId: +this.convId }, {fetchPolicy: "cache-only"})
    // this.getConversation.fetch({ convId: +this.convId })
         .subscribe(result => console.log('============= result from cache', result));


  }

}
