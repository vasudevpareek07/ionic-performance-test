import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TaskElementComponent } from './components/task-element/task-element.component';
import { TasksDashboardComponent } from './components/tasks-dashboard/tasks-dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, TasksDashboardComponent, TaskElementComponent]
})
export class HomePageModule {}
