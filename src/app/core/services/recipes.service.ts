import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private readonly baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  // Signals
  categories = signal<string[]>([]);
  selectedCategory = signal<string>('Beef');
  recipes = signal<any[]>([]);
  isLoading = signal(false);

  constructor(private http: HttpClient) {
    this.loadCategories();

    // Effect pour charger les recettes automatiquement
    effect(() => {
      const category = this.selectedCategory();
      if (!category) return;

      this.isLoading.set(true);
      this.http.get<{ meals: any[] }>(`${this.baseUrl}/filter.php?c=${category}`)
        .subscribe({
          next: res => this.recipes.set(res.meals || []),
          error: () => this.recipes.set([]),
          complete: () => this.isLoading.set(false)
        });
    });
  }

  private loadCategories() {
    this.http.get<{ categories: { strCategory: string }[] }>(`${this.baseUrl}/categories.php`)
      .subscribe(res => {
        const cat = res.categories.map(c => c.strCategory);
        this.categories.set(cat);
      });
  }
}