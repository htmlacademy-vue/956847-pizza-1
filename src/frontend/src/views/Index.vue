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
        <!--      <a href="cart.html">0 ₽</a>-->
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
                  <input
                    type="radio"
                    name="dought"
                    :value="item.name"
                    class="visually-hidden"
                    checked
                    v-model="doughType"
                  />
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
                  v-for="(size, i) in diameter"
                  class="diameter__input"
                  :class="`diameter__input--${sizesNames[i]}`"
                  :key="size.id"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="sizesNames[i]"
                    class="visually-hidden"
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
                    <input
                      type="radio"
                      name="sauce"
                      :value="sauce.name"
                      v-model="saucesType"
                      checked
                    />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      v-for="(item, i) in ingridients"
                      class="ingredients__item"
                      :key="item.id"
                    >
                      <span
                        class="filling"
                        :class="`filling--${ingridientsNames[i]}`"
                      >
                        {{ item.name }}
                      </span>
                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="counter__button counter__button--minus"
                          disabled
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
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
              <div
                class="pizza"
                :class="`pizza--foundation--${doughClasses}-${saucesClasses}`"
              >
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button" disabled>Готовьте!</button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </body>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import uzer from "@/static/user.json";

export default {
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      uzer,
      ingridients: pizza.ingredients,
      dough: pizza.dough,
      pizzaImg: false,
      doughType: "Толстое",
      sauces: pizza.sauces,
      saucesType: "Томатный",
      diameter: pizza.sizes,
    };
  },
  methods: {
    extractImageName(url) {
      let Result = [];
      url.forEach((item) => {
        let Image = item.image;
        let Name = Image.split("/")[Image.split("/").length - 1].split(".")[0];
        Result.push(Name);
      });
      return Result;
    },
  },
  computed: {
    ingridientsNames() {
      return this.extractImageName(this.ingridients);
    },
    doughNames() {
      return this.extractImageName(this.dough);
    },
    doughClasses() {
      let SafekeepingDough = "";
      switch (this.doughType) {
        case "Тонкое":
          SafekeepingDough = "small";
          break;
        case "Толстое":
          SafekeepingDough = "big";
          break;
      }
      return SafekeepingDough;
    },
    saucesClasses() {
      let SafekeepingSauce = "";
      switch (this.saucesType) {
        case "Томатный":
          SafekeepingSauce = "tomato";
          break;
        case "Сливочный":
          SafekeepingSauce = "creamy";
          break;
      }
      return SafekeepingSauce;
    },
    sizesNames() {
      let ArrSizes = [];
      this.diameter.forEach((item) => {
        switch (item.id) {
          case 1:
            ArrSizes.push("small");
            break;
          case 2:
            ArrSizes.push("normal");
            break;
          case 3:
            ArrSizes.push("big");
            break;
        }
      });
      return ArrSizes;
    },
  },
};
</script>

<style>
@import "~@/assets/scss/layout/main.scss";
@import "~@/assets/scss/blocks/pizza.scss";
@import "~@/assets/scss/blocks/user.scss";
</style>
