import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PokemonItemComponent implements OnInit {
  @Input() index: number;
  @Input() pokemon: any;

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    console.log(this.pokemon);
  }
}
