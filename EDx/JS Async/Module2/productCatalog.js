//functions' calls
api.searchAllProducts().then( (result) => {
    updateTable("allTable", result);
});

document.getElementById("inputButton").addEventListener("click", () => {
    let searchId = document.getElementById("input").value;
    // console.log(searchId);
    processSearch(searchId);
})

document.getElementById("typeButton").addEventListener("click", () => {
    let searchType = document.getElementById("inType").value;
    // console.log(searchType);
    processType(searchType);
})

document.getElementById("priceButton").addEventListener("click", () => {
    let searchPrice = document.getElementById("inPrice").value;
    // console.log(searchPrice);
    processPrice(searchPrice, 50);
})

//functions' declarations
function createTableHeader(tableId){
    let tableHeaderRow = document.createElement("tr");
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    let th4 = document.createElement("th");
    th1.appendChild(document.createTextNode("ProductId"));
    th2.appendChild(document.createTextNode("Type"));
    th3.appendChild(document.createTextNode("Price"));
    th4.appendChild(document.createTextNode("Examine"));
    tableHeaderRow.appendChild(th1);
    tableHeaderRow.appendChild(th2);
    tableHeaderRow.appendChild(th3);
    tableHeaderRow.appendChild(th4);
    document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArray) {
    var tableBody = document.getElementById(tableId);
    //reset table
    while (tableBody.hasChildNodes()) {   
        tableBody.removeChild(tableBody.firstChild);
    }

    createTableHeader(tableId);
    for (let i = 0; i < productArray.length; i++) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("button");

        td4.addEventListener('click', ()=> {
            processSearch(productArray[i].id);
        });

        td1.appendChild(document.createTextNode(productArray[i].id));
        td2.appendChild(document.createTextNode(productArray[i].type));
        td3.appendChild(document.createTextNode(productArray[i].price));
        // td4.appendChild(document.createTextNode("Examine"))
        td4.innerHTML = "Examine";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        
        document.getElementById(tableId).appendChild(tr);
    }
}

function updateExaminedText(product){
    var outputString = "Product Id: " + product.id;
    outputString += "<br> Price: " + product.price;
    outputString += "<br> Type: " + product.type;
    document.getElementById("productText").innerHTML = outputString;
}

function getIntersection(arrA,arrB,searchedId){

    var samePrice = arrA;
    var sameType = arrB;
    var similarArray = [];
    samePrice.forEach(function(obj1){
        sameType.forEach(function(obj2){
            if(obj1.id == obj2.id && obj1.id != searchedId)
                similarArray.push(obj1);     
        });
    });

    return similarArray;
}

function processSearch(id) {
    console.log(id);
    api.searchProductById(id).then( (val) => {
        return Promise.all([api.searchProductByType(val.type), api.searchProductByPrice(val.price, 50), val])
    }).then( (val) => {
        updateExaminedText(val[2]);
        let similarArray = getIntersection(val[0], val[1], val[2].id);
        updateTable("similarTable", similarArray);
    }).catch( (e) => {
        console.log(e);
    });
}

function processType(type) {
    console.log(type);
    api.searchProductByType(type).then( (val) => {
        updateTable("similarTable", val);
    }).catch( (e) => {
        console.log(e);
    });
}

function processPrice(price) {
    console.log(price);
    api.searchProductByPrice(price, 50).then( (val) => {
        updateTable("similarTable", val);
    }).catch( (e) => {
        console.log(e);
    });
}