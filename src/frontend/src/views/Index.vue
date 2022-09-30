<template>
  <body>
    <header class="header">
      <div class="header__logo">
        <!--      <a href="index.html" class="logo">-->
        <a href="#" class="logo">
          <img
            src="../assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </a>
      </div>
      <div class="header__cart">
        <!--      <a href="cart.html">1 ₽</a>-->
        <a href="#">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  v-for="(item, i) in dough"
                  class="dough__input"
                  :class="`dough__input--${doughNames[i].split('-')[1]}`"
                  :key="item.id"
                >
                  <RadioButton
                    v-model="doughType"
                    name="dought"
                    :value="item.name"
                  >
                  </RadioButton>
                  <b>{{ item.name }}</b>
                  <span>{{ item.description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>
              <div class="sheet__content diameter">
                <label
                  v-for="(size, i) in sizes"
                  class="diameter__input"
                  :class="`diameter__input--${sizesNames[i]}`"
                  :key="sizesNames[i]"
                >
                  <RadioButton
                    v-model="sizesType"
                    name="diameter"
                    :value="sizesNames[i]"
                  />
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    v-for="sauce in sauces"
                    class="radio ingredients__input"
                    :key="sauce.id"
                  >
                    <RadioButton
                      v-model="saucesType"
                      name="sauce"
                      :value="sauce.name"
                    >
                    </RadioButton>
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>
                  <ul class="ingredients__list">
                    <BuilderIngredientsSelector
                      v-for="(item, i) in ingredients"
                      class="ingredients__item"
                      :key="item.id"
                      :ingredientName="item.name"
                      :ingredientPrice="item.price"
                      :ingredientNamesId="`filling--${ingredientsNames[i]}`"
                      @selectedIngredientPrice="test"
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

            <div class="content__constructor">
              {{ ingredientsImages }}
              <div
                class="pizza"
                :class="`pizza--foundation--${doughCssClass}-${sauceCssClass}`"
              >
                <div class="pizza__wrapper">
                  <div
                    v-for="(picture, i) of ingredientsImages"
                    :key="i"
                    class="pizza__filling"
                    :class="`pizza__filling--${picture}`"
                  ></div>
                </div>
              </div>
            </div>
            <div class="content__result">
              {{ ingredientsIdArr }}
              <p>Итого: ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </body>
</template>

<script>
import pizza from "@/static/pizza.json";
import RadioButton from "@/common/components/RadioButton";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";

export default {
  name: "Index",
  components: {
    RadioButton,
    BuilderIngredientsSelector,
  },

  data() {
    return {
      ingredients: pizza.ingredients,
      dough: pizza.dough,
      pizzaImg: false,
      doughType: "Толстое",
      sizesType: "normal",
      saucesType: "Томатный",
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      ingredientsIdArr: [],
      ingredientsImages: [],
      selectedIngredientPrice(ingredientPrice) {
        return ingredientPrice;
      },
    };
  },

  methods: {
    extractImageName(url) {
      return url.map((item) => {
        let image = item.image;
        return image.split("/")[image.split("/").length - 1].split(".")[0];
      });
    },

    test(price) {
      console.log(this.selectedIngredientPrice(price));
    },
  },

  computed: {
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
