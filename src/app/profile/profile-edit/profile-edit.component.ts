import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {

  @Input() username: string;
  @Input() role: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismiss(isEdited: boolean = false) {
    this.modalController.dismiss({
      'username': this.username,
      'role': this.role,
      "isEdited": isEdited
    });
  }

  setUsername($event){
    this.username = $event.detail.value;
  }

  setRole($event){
    this.role = $event.detail.value;
  }

  updateProfile(){
      this.dismiss(true);
  }

}
