import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string = 'Johnty Rhodes';
  role: string = 'Admin';

  constructor(private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ProfileEditComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'username': this.username,
        'role': this.role
      }
    });

    modal.onDidDismiss().then((res: any)=>{
        console.log("getting data", res);
        if(res.data.isEdited){
          this.username = res.data.username;
          this.role = res.data.role;
          this.presentToast();
        }
    })
    
    return await modal.present()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your Profile has been updated successfully!',
      duration: 2000
    });
    toast.present();
  }

}
