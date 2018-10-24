import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.obscontar3().subscribe(
      numero => console.log('Subs', numero),
      // tslint:disable-next-line:no-shadowed-variable
      error => console.error('error', error),
      () => console.log('termino')
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  obscontar3() {
    return new Observable(observer => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        let salida = {
          valor: contador
        };
        observer.next(salida);
         if (contador === 3) {
           clearInterval(intervalo);
           observer.complete();
         }

        //  if (contador === 2) {
        //    clearInterval(intervalo);
        //    observer.error('ayuda');
        //  }
      }, 1000);
    })
      .retry(2)
      .map((resp: any) => {
        return resp.valor;
      })
      .filter((valor, index) => {
        if (valor % 2 === 1) {
          return true;
        } else {
          return false;
        }
      });
  }
}
