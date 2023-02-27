<template>
  <h3>Конвертер валют:</h3>
  <div class="converter" v-if="!overLimited">
    <strong>Базова валюта:</strong>
    <input
      v-model="inputConverterFrom"
      @change="exchangeRateFrom"
      @keyup="exchangeRateFrom"
      type="text"
      placeholder=""
    />
    <select v-model="converterFrom" @change="exchangeRateFrom">
      <option
        v-for="currency in converterCurrencies"
        :key="currency"
        :value="currency"
      >
        {{ currency }}
      </option>
    </select>
    <strong>Бажана валюта:</strong>
    <input
      v-model="inputConverterTo"
      @change="exchangeRateTo"
      @keyup="exchangeRateTo"
      type="text"
      placeholder=""
    />
    <select v-model="converterTo" @change="exchangeRateTo">
      <option
        v-for="currency in converterCurrencies"
        :key="currency"
        :value="currency"
      >
        {{ currency }}
      </option>
    </select>
  </div>
  <div v-if="overLimited" class="error">
    <p>Перевищено ліміт бажаної валюти, еквівалентний 10000$</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCurrencyService } from "@/services/useCurrencyService";
import { CurrencyModel } from "@/models/CurrencyModel";

const inputConverterFrom = ref<number>();
const inputConverterTo = ref<number>();
const converterFrom = ref<string>();
const converterTo = ref<string>();
const maxUSDLimit = 10000;
const currencyCourse = ref<CurrencyModel>(
  await useCurrencyService().getCurrencies()
);
const currencyCourseArray = Object.values(currencyCourse.value.data);

const converterCurrencies = [
  "USD",
  "EUR",
  "UAH",
  "GBP",
  "BTC",
  "ETH",
  "BNB",
  "XRP",
];

const overLimited = ref(false);

converterFrom.value = "USD";
converterTo.value = "BTC";
inputConverterFrom.value = 0;
inputConverterTo.value = 0;

function exchangeRateFrom() {
  if (currencyCourseArray.length > 0) {
    for (var i = 0; i < currencyCourseArray.length; i++) {
      if (currencyCourseArray[i].code === converterFrom.value) {
        for (var j = 0; j < currencyCourseArray.length; j++) {
          if (currencyCourseArray[j].code === converterTo.value) {
            let inputConverterUSD =
              inputConverterFrom.value / currencyCourseArray[i].value;
            if (inputConverterUSD > maxUSDLimit) {
              overLimited.value = true;
            } else {
              inputConverterTo.value =
                inputConverterFrom.value * currencyCourseArray[j].value;
            }
          }
        }
      }
    }
  }
}

function exchangeRateTo() {
  if (currencyCourseArray.length > 0) {
    for (var i = 0; i < currencyCourseArray.length; i++) {
      if (currencyCourseArray[i].code === converterFrom.value) {
        for (var j = 0; j < currencyCourseArray.length; j++) {
          if (currencyCourseArray[j].code === converterTo.value) {
            let inputConverterUSD =
              inputConverterTo.value / currencyCourseArray[j].value;
            if (inputConverterUSD > maxUSDLimit) {
              overLimited.value = true;
            } else {
              inputConverterFrom.value =
                inputConverterTo.value / currencyCourseArray[j].value;
            }
          }
        }
      }
    }
  }
}
</script>
