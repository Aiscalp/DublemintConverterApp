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
  <h3>Курс валют:</h3>
  <div class="converter">
    <strong>Обрана валюта:</strong>
    <select v-model="convertTo" @change="selectedCurrencyValue">
      <option
        v-for="currency in selectedCurrencies"
        :key="currency.code"
        :value="currency.code"
      >
        {{ currency.code }}
      </option>
    </select>
  </div>
  <div class="v-table">
    <div class="v-table_header">
      <p class="row">Валюта (Позначення)</p>
      <p class="row">Ціна в {{ convertTo }}</p>
    </div>
    <div
      class="v-table_row"
      v-for="(row, index) in listCurrenciesWithValues"
      :key="index"
    >
      <div class="row">{{ row.code }}</div>
      <div class="row">
        {{ row.value / listExchangeValue }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCurrencyService } from "@/services/useCurrencyService";
import { CurrencyModel, listCurrenciesModel } from "@/models/CurrencyModel";

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

const convertTo = ref<string>();
const listExchangeValue = ref(1);

const listCurrencies = [
  {
    code: "USD",
    value: 1,
  },
  {
    code: "EUR",
    value: 0,
  },
  {
    code: "UAH",
    value: 0,
  },
  {
    code: "BTC",
    value: 0,
  },
  {
    code: "ETH",
    value: 0,
  },
];

const selectedCurrencies = [
  {
    code: "USD",
    value: 1,
  },
  {
    code: "EUR",
    value: 0,
  },
  {
    code: "UAH",
    value: 0,
  },
];

convertTo.value = "USD";

const listCurrenciesWithValues = ref<Array<listCurrenciesModel>>(
  await currencyValue()
);

async function currencyValue() {
  if (currencyCourseArray.length > 0) {
    for (var i = 0; i < currencyCourseArray.length; i++) {
      for (var j = 0; j < listCurrencies.length; j++) {
        if (currencyCourseArray[i].code === listCurrencies[j].code) {
          listCurrencies[j].value = currencyCourseArray[i].value;
          listCurrencies[j].value =
            listCurrencies[j].value / listExchangeValue.value;
        }
      }
    }
  }
  return listCurrencies;
}

function selectedCurrencyValue() {
  if (currencyCourseArray.length > 0) {
    for (var i = 0; i < currencyCourseArray.length; i++) {
      if (currencyCourseArray[i].code === convertTo.value) {
        listExchangeValue.value = currencyCourseArray[i].value;
      }
    }
  }
}
</script>

<style>
select {
  max-width: 600px;
  box-sizing: border-box;
  margin-bottom: 25px;
  margin-right: 25px;
  margin-left: 5px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 4px gray;
  border-radius: 5px;
}

input {
  box-sizing: border-box;
  margin-bottom: 25px;
  margin-right: 25px;
  margin-left: 25px;
  background-color: whitesmoke;
  box-shadow: 2px 2px 4px gray;
  border-radius: 5px;
}

.converter {
  margin-top: 25px;
  text-align: center;
}

.error {
  color: rgb(255, 0, 0);
  text-align: center;
}

strong {
  margin-left: 25px;
}

h3 {
  text-align: center;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  text-shadow: 1px 1px 1px #fff;
  background: #e8eaeb;
}

.v-table {
  overflow: hidden;
  border: 1px solid #d3d3d3;
  background: #fefefe;
  width: 70%;
  margin: 5% auto 0;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.v-table_header {
  display: flex;
  justify-content: space-around;
  text-shadow: 1px 1px 1px #fff;
  background: #e8eaeb;
}

.v-table_row {
  display: flex;
  justify-content: space-around;
  background: #f6f6f6;
  border-top: 1px solid #e0e0e0;
}

.row {
  flex-basis: 43.5%;
  padding: 8px 16px;
  text-align: center;
}
</style>
