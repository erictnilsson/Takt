import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room/room.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserlistComponent } from './userlist/userlist.component';
import { PlayerComponent } from './player/player.component';
import { QueueComponent } from './queue/queue.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';

@NgModule({
  declarations: [RoomComponent, NavbarComponent, UserlistComponent, PlayerComponent, QueueComponent, SearchComponent, ErrorComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RoomModule { }
