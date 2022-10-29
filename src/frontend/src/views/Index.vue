<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <div class="content__dough">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите тесто</h2>

          <div class="sheet__content dough">
            <BuilderDoughSelector
              v-for="(item, i) in dough"
              class="dough__input"
              :class="`dough__input--${doughNames[i].split('-')[1]}`"
              :key="item.id"
              :item="item"
              @selectedDoughPrice="selectedDoughPrice"
            ></BuilderDoughSelector>
          </div>
        </div>
      </div>
      <div class="content__diameter">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите размер</h2>
          <div class="sheet__content diameter">
            <BuilderSizeSelector
              v-for="(size, i) in sizes"
              class="diameter__input"
              :class="`diameter__input--${sizesNames[i]}`"
              :key="sizesNames[i]"
              :sizesName="sizesNames[i]"
              :size="size"
              @selectedSiseMultiplier="selectedSiseMultiplier"
            ></BuilderSizeSelector>
          </div>
        </div>
      </div>

      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

          <div class="sheet__content ingredients">
            <div class="ingredients__sauce">
              <p>Основной соус:</p>

              <BuilderSauceSelector
                v-for="sauce in sauces"
                class="radio ingredients__input"
                :key="sauce.id"
                :sauce="sauce"
                @selectedSauce="selectedSauceType"
              ></BuilderSauceSelector>
            </div>

            <div class="ingredients__filling">
              <p>Начинка:</p>
              <ul class="ingredients__list">
                <BuilderIngredientsSelector
                  v-for="(item, i) in ingredients"
                  class="ingredients__item"
                  :key="item.id"
                  :item="item"
                  :ingredientNamesId="ingredientsNames[i]"
                  @selectedIngredientAmount="changingIngredients"
                >
                </BuilderIngredientsSelector>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="content__pizza">
        <label class="input">
          <span class="visually-hidden">Название пиццы</span>
          <input
            type="text"
            name="pizza_name"
            placeholder="Введите название пиццы"
          />
        </label>
        <BuilderPizzaView
          :doughCssClass="doughCssClass"
          :sauceCssClass="sauceCssClass"
          :ingredientsImages="ingredientsImages"
        ></BuilderPizzaView>
        <div class="content__constructor"></div>
        <div class="content__result">
          <BuilderPriceCounter
            :totalIngredientsPrise="totalIngredientsPrise"
          ></BuilderPriceCounter>
          <button type="button" class="button" disabled>Готовьте!</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import BuilderSauceSelector from "@/modules/builder/BuilderSauceSelector";
import BuilderPriceCounter from "@/modules/builder/BuilderPriceCounter";

export default {
  name: "Index",
  components: {
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
    BuilderPizzaView,
    BuilderSauceSelector,
    BuilderPriceCounter,
  },

  data() {
    return {
      ingredients: pizza.ingredients,
      dough: pizza.dough,
      doughType: pizza.dough[1].name,
      sizesType: "normal",
      saucesType: pizza.sauces[0].name,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      siseMultiplier: pizza.sizes[1].multiplier,
      doughPrice: pizza.dough[1].price,
      saucePrice: pizza.sauces[0].price,
      ingredientsPrise: [],
      ingredientsImages: [],
    };
  },

  methods: {
    selectedSauceType(data) {
      this.saucePrice = data.prise;
      this.saucesType = data.saucesType;
    },

    selectedDoughPrice(data) {
      this.doughPrice = data.prise;
      this.doughType = data.doughType;
    },

    selectedSiseMultiplier(multiplier) {
      this.siseMultiplier = multiplier;
    },

    selectedIngredientAmount(ingredientArr) {
      return ingredientArr;
    },

    changingIngredients(val) {
      let ingredientData = this.selectedIngredientAmount(val);
      let ingredientDataId = ingredientData[0];
      let ingredientDataAmount = ingredientData[1] - 1;
      let ingredientNamesInArr = this.ingredientsNames[ingredientDataAmount];
      let myIndex = this.ingredientsImages.indexOf(ingredientNamesInArr);
      if (!this.ingredientsImages.includes(ingredientNamesInArr)) {
        this.ingredientsImages.push(ingredientNamesInArr);
        this.ingredientsPrise.push(
          ingredientData[0] * this.ingredients[ingredientDataAmount].price
        );
      } else if (myIndex !== -1 && ingredientDataId >= 1) {
        this.ingredientsPrise.splice(
          myIndex,
          1,
          ingredientDataId * this.ingredients[ingredientDataAmount].price
        );
      } else if (myIndex !== -1 && ingredientDataId < 1) {
        this.ingredientsImages.splice(myIndex, 1);
        this.ingredientsPrise.splice(myIndex, 1);
      }
    },

    extractImageName(url) {
      return url.map((item) => {
        let image = item.image;
        return image.split("/")[image.split("/").length - 1].split(".")[0];
      });
    },
  },

  computed: {
    totalIngredientsPrise() {
      let reduseIngredientPrise = this.ingredientsPrise.reduce(function (
        prev,
        item
      ) {
        return prev + item;
      },
      0);
      return (
        reduseIngredientPrise * this.siseMultiplier +
        this.doughPrice +
        this.saucePrice
      );
    },

    ingredientsNames() {
      return this.extractImageName(this.ingredients);
    },

    doughNames() {
      return this.extractImageName(this.dough);
    },

    doughCssClass() {
      let safeKeepingDough = "";
      switch (this.doughType) {
        case "Тонкое":
          safeKeepingDough = "small";
          break;
        case "Толстое":
          safeKeepingDough = "big";
          break;
      }
      return safeKeepingDough;
    },

    sauceCssClass() {
      let safeKeepingSauce = "";
      switch (this.saucesType) {
        case "Томатный":
          safeKeepingSauce = "tomato";
          break;
        case "Сливочный":
          safeKeepingSauce = "creamy";
          break;
      }
      return safeKeepingSauce;
    },

    sizesNames() {
      return this.sizes.map((item) => {
        switch (item.id) {
          case 1:
            return "small";
          case 2:
            return "normal";
          case 3:
            return "big";
        }
      });
    },
  },
};
</script>

<style>
@import "../assets/scss/layout/main.scss";
@import "../assets/scss/blocks/pizza.scss";
@import "../assets/scss/blocks/user.scss";
</style>
