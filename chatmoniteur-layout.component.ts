import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CrudService } from 'src/app/services/crud.service';
import { ServiceMoniteurService } from 'src/app/services/service-moniteur.service';
import { UsersService } from 'src/app/services/users.service';
import { io } from "socket.io-client";


@Component({
  selector: 'app-chatmoniteur-layout',
  templateUrl: './chatmoniteur-layout.component.html',
  styleUrls: ['./chatmoniteur-layout.component.css']
})
export class ChatmoniteurLayoutComponent implements OnInit {

  helper = new JwtHelperService();
  moniteur_encryptedId: any;
  moniteurId: any;
  schoolId: any;
  moniteurData = { firstName: '', lastName: '' };
  candidatData: any = []
  schoolData: any = []
  isLoggin = false;
  searchText: string = '';
  socket: any;

  constructor(private router: Router,
    public moniteurService: ServiceMoniteurService,
    public candidatService: CrudService,
    public userService: UsersService
  ) {
    //token
    const token = localStorage.getItem('Mtoken');
    if (token && !this.helper.isTokenExpired(token)) {
      const decodedToken = this.helper.decodeToken(token);
      this.moniteur_encryptedId = decodedToken.moniteurId;
      this.moniteurId = decodedToken.id;
      this.schoolId = decodedToken.etablissment;
    }
  }

  ngOnInit(): void {
    //socket 
    this.socket = io(`http://localhost:5000`);

    //get monitors of candidats
    this.candidatService.getMCandidat(this.moniteurId).subscribe({
      next: (response: any) => {
        this.candidatData = response
      }
    })

    //get one monitor by his encrypted id
    this.moniteurService.getOneMoniteur(this.moniteur_encryptedId).subscribe({
      next: (response: any) => {
        this.moniteurData = response
      },
    })

    //get one user by the school id 
    this.userService.getOneUser(this.schoolId).subscribe({
      next: (response: any) => {
        this.schoolData = response.user
      },
    })
  }

  //search by letter in the search bar
  filterData() {
    if (!this.searchText) {
      return this.candidatData;
    }

    const filterText = this.searchText.toLowerCase();
    return this.candidatData.filter((item: any) =>
      item.firstName.toLowerCase().includes(filterText) ||
      item.lastName.toLowerCase().includes(filterText)
    );
  }

  logout() {
    this.moniteurService.moniteurLogout()
    this.socket.disconnect();
    this.router.navigate(['/login'])
  }

}

