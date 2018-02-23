(function(window){

    function myLibrary(){

        //execute code here
        let types = ['Electronics','Book','Clothing','Food'];
        let noProducts = 100;
        let maxPrice = 500;
        let catalog = createRandomCatalog(noProducts);

        return {
            searchProductById: searchProductId,
            searchProductByPrice: searchProductPrice,
            searchProductByType: searchProductType,
            searchAllProducts: searchAllProducts
        }

        //function definitions go here

        function createRandomProduct(){
            // let types = ['Electronics','Book','Clothing','Food'];
            let price =(Math.random()*maxPrice).toFixed(2);
            let type = types[Math.floor(Math.random()*4)];
            return {type: type, price: price};
        }

        function createRandomCatalog(num){
            let catalog = [];
            for (let i = 0; i < num; i++) {
                let obj = createRandomProduct();
                catalog.push({id: i, type: obj.type, price: obj.price});             
            }
            return catalog;
        }

        function searchAllProducts(){
            let promise = new Promise(function(resolve, reject) {
                setTimeout(() => {
                    resolve(catalog);
                },1000);
            });
            return promise;
        }

        function searchProductId(id){
            let promise = new Promise(function(resolve, reject) {
                let i = 0;
                setTimeout(() => {
                    while (i<catalog.length) {
                        if (catalog[i].id == id) {
                            resolve(catalog[i]);
                        }
                        i++;
                    }
                    reject("Invalid ID: " + id);
                },1000);
            });
            return promise;
        }

        function searchProductType(type){
            let promise = new Promise(function(resolve, reject) {
                let i = 0;
                let typeArray = [];
                if (!types.includes(type)) {    //global array
                    reject("Invalid type: " + type);
                } else {
                    setTimeout(() => {
                        while (i<catalog.length) {
                            if (catalog[i].type === type) {
                                typeArray.push(catalog[i]);
                            }
                            i++;
                        }
                        resolve(typeArray);
                    },1000);
                }
            });
            return promise;
        }

        function searchProductPrice(price, diff){
            let promise = new Promise(function(resolve, reject) {
                let i = 0;
                let priceArray = [];
                if ( !isFinite(price) || (price > maxPrice) ) {
                    reject("Invalid price: " + price);
                } else {
                    setTimeout(() => {
                        while (i<catalog.length) {
                            if ( Math.abs(price - catalog[i].price) <= diff) {
                                priceArray.push(catalog[i]);
                            }
                            i++;
                        }
                        resolve(priceArray);
                    },1000);
                }
            });
            return promise;
        }

    }


    if(typeof(window.api) === 'undefined'){
        window.api = myLibrary();
    }

})(window); 