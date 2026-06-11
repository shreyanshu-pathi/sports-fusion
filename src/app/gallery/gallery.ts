import { Component, inject } from '@angular/core';
import { GALLERY_IMAGES } from '../constants/constants';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {

  images = GALLERY_IMAGES;

  gallerySports = [
    {
      name: 'Cricket',
      currentIndex: 0,
      images: GALLERY_IMAGES.Cricket
    },

    {
      name: 'Football',
      currentIndex: 0,
      images: GALLERY_IMAGES.Football
    },

    {
       name: 'Basketball',
      currentIndex: 0,
      images: GALLERY_IMAGES.Basketball
    },

    {
      name: 'Badminton',
      currentIndex: 0,
      images: GALLERY_IMAGES.Badminton
    },

    {
      name: 'Tennis',
      currentIndex: 0,
      images: GALLERY_IMAGES.Tennis
    },

    {
      name: 'Volleyball',
      currentIndex: 0,
      images: GALLERY_IMAGES.Volleyball
    },
  ];

  nextImage(sport: any): void {
    sport.currentIndex = (sport.currentIndex + 1) % sport.images.length;
  }

  prevImage(sport: any): void {
    sport.currentIndex = (sport.currentIndex - 1 + sport.images.length) % sport.images.length;
  }
}
