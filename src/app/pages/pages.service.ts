import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private meta: Meta, private title: Title, private router: Router) {}
  public generateMetaTags(title: string, desciption: string): void {
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: desciption });
      // this.meta.updateTag({ name: 'twitter:image', content: this.image });

      this.meta.updateTag({ property: 'og:url', content: `https://pokedexgo.com${this.router.url}` });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: desciption });
      // this.meta.updateTag({ property: 'og:image', content: this.image });

      this.title.setTitle(title);
  }
}
