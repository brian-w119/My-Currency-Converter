
//API Providers

const ipData = {  // get users local currency
    key: "4588a4af48694c3588591ea148aafc881ae5012e5afa28daf80a692d",
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

    // get users local currency
    async function getUserCurrency(){
        const response = await fetch(ipData.currency());
        const currency = await response.json();
        console.log(currency);
    }
    getUserCurrency();