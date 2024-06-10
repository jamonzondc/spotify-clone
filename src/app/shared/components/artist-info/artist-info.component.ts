import {Component, inject, Input} from '@angular/core';
import {Artist} from "../../entities";
import {NgFor} from "@angular/common";
import {Navigation} from "../../feature";

@Component({
  selector: 'app-artist-info',
  styleUrls: ['./artist-info.component.scss'],
  standalone: true,
  imports: [NgFor],
  template: `
    <b>
      <p>
        @for (artist of artists; track artist.id; let isLastArtist = $last) {
          <a
            class="artist-link"
            (click)="goToArtist(artist.id)"
          >
            {{ artist.name + (isLastArtist ? "" : ", ") }}
          </a>
        }
      </p>
    </b>
  `,
})
export class ArtistInfoComponent {
  @Input() artists: Artist[] = [];
  private navigation: Navigation = inject(Navigation);

  public goToArtist(artistId: string): void {
    if (!artistId) return;
    this.navigation.navigateTo(`/artist/${artistId}`);
  }
}
