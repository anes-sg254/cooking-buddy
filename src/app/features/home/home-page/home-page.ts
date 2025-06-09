import { Component, inject } from '@angular/core';

import { RecipesService } from '../../../core/services/recipes.service';
import { PageLayoutComponent } from '../../../shared/layouts/page-layout/page-layout';

@Component({
  selector: 'app-home-page',
  imports: [PageLayoutComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
    private recipesService = inject(RecipesService);

  categories = this.recipesService.categories;
  selectedCategory = this.recipesService.selectedCategory;
  recipes = this.recipesService.recipes;
  isLoading = this.recipesService.isLoading;

  changeCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

}
