import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SyncService } from 'src/app/services/sync.service';
import { Message, AllMessages } from '../../interfaces/messages-interface';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.scss'],
})
export class TasksDashboardComponent {

  pageToken: string = null;

  messages: Array<Message> = [];

  subscription: Subscription = new Subscription();

  messagesEndpoint: string  = 'http://message-list.appspot.com/messages';

  selectedSegment: string = 'mytasks';

  showLoader: boolean = true;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private syncService: SyncService) {
      this.getMessages();
  }

  getMessages(){
      this.subscription.add(this.syncService.get(this.messagesEndpoint).subscribe((res: AllMessages)=>{
          this.messages = this.processMessages(res.messages);
          this.pageToken = res.pageToken;
          this.showLoader = false;
      }))
  }

  getMoreMessages(event){
      this.subscription.add(this.syncService.get(this.messagesEndpoint, {pageToken: this.pageToken}).subscribe((res: AllMessages)=>{
          this.messages = this.messages.concat(this.processMessages(res.messages));
          this.pageToken = res.pageToken;
          this.showLoader = false;
          event.target.complete();
      }))
  }

  processMessages(messages: Array<Message>){
      messages.forEach((message: Message)=>{
          message.updated = '26 July, 2020';
      })
      return messages;
  }

  deleteMessage(index: number){
      this.messages = this.messages.filter((item, i) => i !== index);
  }

  segmentChanged(event){
      this.showLoader = true;
      this.messages = [];
      this.selectedSegment = event.detail.value;
      this.getMessages();
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }

}