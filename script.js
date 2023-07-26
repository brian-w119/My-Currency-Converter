
const defaultBaseCurrencyCode = "JMD";
//let exchangeRate;

const defaultCurrency = document.querySelector(".defaultCurr");
const targetCurrency = document.querySelector(".targetCurr");
const toBeConverted = document.querySelector("#baseCurrency");
const isConvertedTo = document.querySelector("#outputCurrency");




//API Providers

const ipData = {  // get users local currency
    key: "4588a4af48694c3588591ea148aafc881ae5012e5afa28daf80a692d",
    baseURL: "https://api.ipdata.co",
    currency: function(){
        return `${this.baseURL}/currency?api-key=${this.key}`;
    },
};



const currencyLayer = { // get exchange rate and currency list
    baseUrl: 'https://api.currencylayer.com',
    key: '816aace5f867a203d108dde0987d9681',

    convert: function(from, to, amount) {//get exchange rate
        return `${this.baseUrl}/convert?from=${from}&to=${to}&amount=${amount}&access_key=${this.key}`;
      },

      list: function(){//list currencies
        return `${this.baseUrl}/list?access_key=${this.key}`;
      },
    };

    // get user's currency
    async function getUserCurrency(){
        const response = await fetch(ipData.currency());
        const userCurrency = await response.json();
        return userCurrency;
    }
    getUserCurrency();

    //get list of currencies

    async function getCurrencyList(){
        const response = await fetch(currencyLayer.list());
        const resultList = await response.json();
        return resultList.currencies;
    }
    getCurrencyList();

    //get sxchange rate

    async function getExchangeRate(from, to){
        const amount = 1;
        const result = await fetch(currencyLayer.convert(from, to, amount));
        const resultRate = await result.json();
        return resultRate;

    }
    getExchangeRate("USD", "GBP");

    async function renderExchangerate(fromCurrency, toCurrency){
       exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

       
       defaultCurrency.innerHTML = `1 ${fromCurrency} equals`;
       targetCurrency.innerHTML = `${exchangeRate.result} ${toCurrency}`;
       
    }

    function renderCurrencies(currencies, fromCurrency, toCurrency){ // populates currency select field
        for( const code in currencies){
           const name = currencies[code];

           selectedFromCurrency = code === fromCurrency? "selected": "";
           selectedToCurrency = code === toCurrency? "selected": "";
         
           toBeConverted.innerHTML += `<option value="${code}" ${selectedFromCurrency}>${code} - ${name}</option>`;
           isConvertedTo.innerHTML += `<option >${code} - ${name}</option>`;
        }
    }

    async function init(){
      const userCurrency = await getUserCurrency();
      currencies = await getCurrencyList();

      renderExchangerate(defaultBaseCurrencyCode, userCurrency.code);

      renderCurrencies(currencies, defaultBaseCurrencyCode, userCurrency.code);

      
    }
    init();






    

    