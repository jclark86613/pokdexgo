import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PokedexTableService } from 'src/app/components/pokedex-table/pokedex-table.service';
import { Filter, FILTERS, Filters } from 'src/app/components/pokedex-table/pokedex-table.types';
import { Pokemon, STANDARD_POKEMON_FORMS_ARRAY, StdPokemonForm, UserPokedex } from 'src/app/services/pokedex-data/pokedex-data.types';
import { BasePageComponent } from '../base-page/base-page.component';
import { PagesService } from '../pages.service';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export enum POKEDEX_VIEW_ENUM {
  TABLE = 'table',
  CARD = 'card'
}
export const POKEDEX_VIEW_ARRAY = <const> [...Object.values(POKEDEX_VIEW_ENUM)];
export type PokedexView = typeof POKEDEX_VIEW_ARRAY[number];

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent extends BasePageComponent {
  @ViewChild('container') containerDom: ElementRef;
  @ViewChild('filterBar') filtersDom: ElementRef;
  @ViewChild('scroller') scrollerDom: ElementRef;

  @Input() set filters(filters: Filter[]) {
    this._filters = filters;
    this.resetPage();
    this.selectForm();
  };

  private selectForm(): void {
    const val: number = this._filters.find(filter => filter.by === FILTERS.STANDARD_POKEMON_FORMS).values[0] as number;
    this.selectedForm = STANDARD_POKEMON_FORMS_ARRAY[ val - 1 ];
  }

  public pokedex: Pokemon[];
  public search: string;
  public regionFilter: number;
  public userPokedex: UserPokedex;
  public loading: boolean = true;
  public listSize: number;

  public _filters: Filters = [];
  public selectedForm: StdPokemonForm;
  public layout: PokedexView = POKEDEX_VIEW_ENUM.CARD;
  public POKEDEX_VIEW_ENUM = POKEDEX_VIEW_ENUM;
  public orderAsending: boolean = true;
  public sortedColumn: string = 'id';
  public checklist: StdPokemonForm[] = [...STANDARD_POKEMON_FORMS_ARRAY]

  protected _pageTitle: string = 'Pokedex - Pokemon go pokedex checklist';

  private _pokedex: Pokemon[];
  private _saving: boolean = false;
  private _init: boolean = true;
  private _page: number = 0;
  private _perPage: number = 200;
  private _filtedPokedex: Pokemon[];
  private _updateTimeout: ReturnType<typeof setTimeout>;

  constructor(
    protected pagesService: PagesService,
    private pokedexTableService: PokedexTableService,
    private route: ActivatedRoute
  ) {
    super(pagesService);
  }
  ngOnInit(): void {
    const service: PokedexTableService = this.pokedexTableService;
    combineLatest([service.pokedex$, service.userPokedex$]).subscribe(([pokedex, userPokedex]: [Pokemon[], UserPokedex]) => {
      this.userPokedex = userPokedex;
      this._pokedex = pokedex;
      this._saving = false;

      if (this._init) {
        this._init = false;
        this.loading = false;
        this.resetPage();
      }
    });
    this.route.params.subscribe(params => {
      this.layout = params.layout;
    });

  }
  ngAfterViewInit(): void {
    this.resize();
  }

  public updateEntry(id:string, value: StdPokemonForm) {
    if (this._saving) { return; }
    const pokemon = this.userPokedex[id];
    if (pokemon) {
      pokemon[value] = !pokemon[value];
    }

    clearTimeout(this._updateTimeout);

    this._updateTimeout = setTimeout( () => {
      this._saving = true;
      this.pokedexTableService.latestUserPokedex = Object.assign({},this.userPokedex);
    }, 10000);
  }

  public resize(): void {
    this.listSize = parseInt(window.getComputedStyle(this.scrollerDom.nativeElement).height,10);
  }

  public nextPage(): void {
    if (!this.pokedex) {
      this.resetPage();
    } else {
      this._page++;
      const start = this._page * this._perPage;
      const end = start + this._perPage;
      this.pokedex = this.pokedex.concat(this._filtedPokedex.slice(start, end));
    }
  }
  
  public sortColumn(value: StdPokemonForm): void {
    if (this.sortedColumn !== value) {
      this.sortedColumn = value;
      this.orderAsending = true;
    } else {
      this.orderAsending = !this.orderAsending;
    }

    if (!this.checklist.includes(value)) {
      this.sortByIdentifier(value);
    } else {
      this.sortByChecklist(value);
    }
    this.resetPage();
  }
    
  private resetPage(): void {
    if(!this._pokedex) {
      return;
    }
    this._page = 0;
    const start = this._page * this._perPage;
    const end = start + this._perPage;

    // filtered list used for displace
    this._filtedPokedex = this.pokedexTableService.filter(this._pokedex, this._filters);
    this.pokedex = this._filtedPokedex.slice(start,end);
    if(this.scrollerDom) {
      this.scrollerDom.nativeElement.scrollTop = 0;
    }
  }

  private sortByIdentifier(value: string): void {
    this._pokedex.sort((a:Pokemon, b: Pokemon) => {
      let output = 0;
      switch(true) {
        case a[value] > b[value]:
          output = 1;
          break;
        case a[value] < b[value]:
          output = -1;
          break;
        default:
          output = a.id > b.id ? 1 : -1;
          break;
      }
      return output * (this.orderAsending ? 1 : -1);
    })
  }

  private sortByChecklist(value: string): void {
    this._pokedex.sort((a:Pokemon, b: Pokemon) => {
      let output = 0;
      const usera = this.userPokedex[a.id][value] ? 1 : -1;
      const userb = this.userPokedex[b.id][value] ? 1 : -1;
      if (!usera || !userb) {
        return;
      }

      switch(true) {
        case usera > userb:
          output = 1 * (this.orderAsending ? 1 : -1);
          break;
        case usera < userb:
          output = -1 * (this.orderAsending ? 1 : -1);
          break;
        default:
          output = a.id > b.id ? 1 : -1;
          break;
      }

      return output;
    })
  }

}


  


