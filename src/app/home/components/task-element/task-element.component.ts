
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../interfaces/messages-interface';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.scss'],
})
export class TaskElementComponent{

  @Input() message: Message;

  @Input() index: number;

  @Output() deleteMessage: EventEmitter<number> = new EventEmitter<number>();

  constructor(private alertController: AlertController, public toastController: ToastController, public actionSheetController: ActionSheetController) { }

  delete(){
    this.deleteMessage.emit(this.index);
    this.presentToast();
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete',
      message: 'Are you sure you want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.delete();
            console.log('Confirm public actionSheetController: ActionSheetControllerOkay');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Task has been deleted successfully',
      duration: 2000
    });
    toast.present();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'More Options',
      cssClass: 'my-custom-class',
      buttons: [
      {
        text: 'Copy',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Share',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}