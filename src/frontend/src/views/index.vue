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
                  class="dough__input"
                  :class="`dough__input--${doughName[i]}`"
                  v-for="(item, i) in dough"
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
                  class="diameter__input"
                  :class="`diameter__input--${sizesNames[i]}`"
                  v-for="(size, i) in diameter"
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
                    class="radio ingredients__input"
                    v-for="sauce in sauces"
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
                      class="ingredients__item"
                      v-for="(item, i) in ingridients"
                      :key="item.id"
                    >
                      <span
                        class="filling"
                        :class="`filling--${ingridientsName[i]}`"
                      >
                        {{ item.name }}</span
                      >
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
  name: "IndexHome",
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
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    ingridientsName() {
      // eslint-disable-next-line no-unused-vars
      let result = [];
      this.ingridients.forEach((item) => {
        let image = item.image;
        let name = image.split("/")[image.split("/").length - 1].split(".")[0];
        result.push(name);
      });
      return result;
    },
    doughName() {
      // eslint-disable-next-line no-unused-vars
      let result = [];
      this.dough.forEach((item) => {
        let image = item.image;
        let name = image
          .split("/")
          [image.split("/").length - 1].split(".")[0]
          .split("-")[1];
        result.push(name);
      });
      return result;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    doughClasses() {
      if (this.doughType === "Тонкое") {
        return "small";
      }
      if (this.doughType === "Толстое") {
        return "big";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    saucesClasses() {
      if (this.saucesType === "Томатный") {
        return "tomato";
      }
      if (this.saucesType === "Сливочный") {
        return "creamy";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    sizesNames() {
      let arrSizes = [];
      this.diameter.forEach((item) => {
        let sizeID = item.id;
        if (sizeID === 1) {
          arrSizes.push("small");
        } else if (sizeID === 2) {
          arrSizes.push("normal");
        } else if (sizeID === 3) {
          arrSizes.push("big");
        }
      });
      console.log(arrSizes);
      return arrSizes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/main.scss";
@import "~@/assets/scss/blocks/pizza.scss";
@import "~@/assets/scss/blocks/user.scss";
</style>
