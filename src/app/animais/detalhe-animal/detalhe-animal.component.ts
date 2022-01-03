import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { animal } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  animalId!: number;
  animal$!: Observable<animal>


  constructor( private animaisservice: AnimaisService,
     private activatedRoute: ActivatedRoute,
     private router: Router
     ) { }

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params.animalId;
    this.animal$ = this.animaisservice.buscaPorId(this.animalId);
  }

  curtir() {
    this.animaisservice.curtir(this.animalId).subscribe((curtida) => {
      if (curtida){
        this.animal$ = this.animaisservice.buscaPorId(this.animalId);
      }
    });
  }


  excluir(){
    this.animaisservice.excluiAnimal(this.animalId).subscribe(
      () => {
        this.router.navigate(['/animais/']);
      },
      (error) => console.log(error)
    );
  }

}
