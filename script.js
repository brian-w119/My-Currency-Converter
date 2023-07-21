
//API Providers

const ipData = {  // get users local currency
    key: "13913952c49cd907f6b9a168b62b0b2364ba3eb022e303cd6aec6afb8cd",
    baseURL: "https://api.ipdata.co",
    currency: function(){
        return `${this.baseURL}/currency?api-key=${this.key}`;
    },
};



const currencyLayer = {
    baseUrl: 'http://api.currencylayer.com',
    key: '816aace5f867a203d108dde0987d9681',

    convert: function(from, to, amount) {//get exchange rate
        return `${this.baseUrl}/convert?from=${from}&to=${to}&amount=${amount}&access_key=${this.key}`;
      },

      list: function(){//list currencies
        return `${this.baseUrl}/list?access_key=${this.key}`;
      },
      

    };