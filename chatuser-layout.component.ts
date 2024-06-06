import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceMoniteurService } from 'src/app/services/service-moniteur.service';
import { io } from "socket.io-client";
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chatuser-layout',
  templateUrl: './chatuser-layout.component.html',
  styleUrls: ['./chatuser-layout.component.css']
})
export class ChatuserLayoutComponent implements OnInit {
  helper = new JwtHelperService();
  userData = { userName: '', Etat: '' };
  userId: any;
  moniteurData: any = [];
  socket: any;
  isLoggin = false;
  searchText: string = '';

  constructor(
    private router: Router,
    public userService: UsersService,
    public moniteurService: ServiceMoniteurService) {
    //User Token
    const token = localStorage.getItem('token');
    if (token && !this.helper.isTokenExpired(token)) {
      const decodedToken = this.helper.decodeToken(token);
      this.userId = decodedToken.userId;
    }
  }

  ngOnInit(): void {

    this.socket = io(`http://localhost:5000`);

    //get monitors of school
    this.moniteurService.getSchool(this.userId).subscribe({
      next: (response: any) => {
        this.moniteurData = response
      }
    })

    //get the user's info
    this.userService.getOneUser(this.userId).subscribe({
      next: (response: any) => {
        this.userData = response.user
      },
      error: (err: HttpErrorResponse) => {
      }
    })
  }

  //search by name in the search bar
  filterData() {
    if (!this.searchText) {
      return this.moniteurData;
    }
    const filterText = this.searchText.toLowerCase();
    return this.moniteurData.filter((item: any) =>
      item.firstName.toLowerCase().includes(filterText) ||
      item.lastName.toLowerCase().includes(filterText)
    );
  }

  logout() {
    this.userService.userLogout();
    this.socket.disconnect();
    this.router.navigate(['/login'])
  }

}

