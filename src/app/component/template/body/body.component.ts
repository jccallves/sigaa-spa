import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { Pessoa } from 'src/app/core/models/pessoa.model';
import { RotasApp } from 'src/app/shared/enum/rotas-app';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  public currentUser: Observable<Pessoa>;
  @Input() isLogged_in: boolean;
  @Input() nome : string = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (this.authService.getCurrentUser) {

      this.authService.setLoggedUser(true);
      this.authService.getCurrentUser.nome
      this.router.navigateByUrl(RotasApp.HOME);
      this.authService.getLoggedUser().subscribe((logged) => {
        this.isLogged_in = logged;
      });
      this.authService.getNameLoggedUser().subscribe((name) => {
        this.nome = name;
      });
    } else {
      console.log("entrei")
      this.authService.getLoggedUser().subscribe((logged) => {
        this.isLogged_in = logged;
      });
      this.authService.getNameLoggedUser().subscribe((name) => {
        this.nome = name;
      });
    }
  }

  logout() {
    this.authService.logout();
    this.nome = null;
    this.authService.getLoggedUser().subscribe((logged) => {
      this.isLogged_in = logged;
    });
    this.router.navigateByUrl(RotasApp.LOGIN);
  }
}
