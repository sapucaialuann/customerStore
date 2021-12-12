const prompt = require('prompt-sync')();

const vendorsList = [
    {
        name: 'Raphael',
        totalSales: 0,
    },
    {
        name: 'Michelangelo',
        totalSales: 0,
    },
    {
        name: 'Leonardo',
        totalSales: 0,
    },
    {
        name: 'Donatelo',
        totalSales: 0,
    },
    {
        name: 'Splinter',
        totalSales: 0,
    }
]
const salesList = [
    {
        sellerName: vendorsList[2].name,
        customerName: 'mimi' ,
        productName: 'atari',
        date: '1/1/2020',
        productPrice: 55.2
    },
    {
        sellerName: vendorsList[4].name,
        customerName: 'ww' ,
        productName: 'qwe',
        date: '1/1/2020',
        productPrice: 60.2
    }
];
function main() {
    let keepAlive = true;
    while (keepAlive) {
        const selectOptions = () => {
            console.log('\n1- Insert new Sale');
            console.log('\n2- Edit Sale');
            console.log('\n3- Delete Sale');
            console.log('\n4- See the ranking');
            console.log('\n5- Check all the sales');
            console.log('\n6- Exit\n');
            let option = prompt('What would you like to do? ')
            switch (option) {
                case '1':
                    console.clear();
                    createSale();
                    break;
                case '2':
                    console.clear();
                    updateSaleItem();
                    break;
                case '3':
                    console.clear();
                    removeSell();
                    break;
                case '4':
                    console.clear();
                    rankVendors();
                    break;
                case '5':
                    console.clear();
                    listSales();
                    break;
                case '6':
                    console.clear();
                    console.log('\nSee you soon!');
                    keepAlive = false;
                    break;
                default:
                    console.clear();
                    console.log('\nInvalid value, please try again: ')
                    selectOptions();
                    break;
            }
        };
        const createSale = () => {
            const userValue =  getVendorName();
            const sale = inputSaleInfo(userValue);
            console.log('\n Selected Vendor: ', vendorsList[userValue].name);
            salesList.push(sale);
            console.log('\nProduct successfully added.\n')
            updateTotalSalesValue(sale, 1);
        };
        const inputSaleInfo = (userValue) => {
            const sale = {};
            sale.sellerName = vendorsList[getVendorName()].name;
            sale.customerName = prompt('Insert the customer name: ');
            sale.date = getDateOfSale();
            sale.productName = prompt('Insert the product name: ');
            sale.productPrice = parseFloat(prompt('Insert the product price: '), 10);
            return sale;
        };
        const getVendorName = () => {
            vendorsList.forEach((vendor, index) => {
                console.log(`\n${index}:  ${vendor.name}\n`)
            });
            const userInput = prompt("Select vendor's name: ");
            return throwError(vendorsList, getVendorName, userInput);
        };
        //todo
        const getDateOfSale= () => {
            const day = prompt('Insert the day of the sale (must be a number between 1 and 31): ');
            const month = prompt('Insert the month of the sale (must be a number between 1 and 12): ');
            const year =  prompt('Insert the year of the sale (must be a number between 2018 and 2021): ');
            const date = day + '/' + month + '/' + year;
            return date;
        };
        const checkuserInput = (userInput) => {
            if (userInput <= vendorsList.length) {
                return userInput;
            }
            else {
                console.log('\nInvalid value, please try again:')
                getVendorName()
            }
        };
        const updateTotalSalesValue = (sale, operationType) => {
            vendorsList.some(vendor => {
                if (sale.sellerName == vendor.name) {
                    switch (operationType) {
                        case 1:
                            vendor.totalSales += sale.productPrice
                            break;
                        case 0:
                            vendor.totalSales -= sale.productPrice;
                            break;
                    }
                    return true;
                };
            })
            rankVendors();
        };
        const rankVendors = () => {
            vendorsList.sort((a, b) =>  parseFloat(b.totalSales) - parseFloat(a.totalSales));
            salesList.sort((a, b) => vendorsList.indexOf(b) - vendorsList.indexOf(a));
            // vendorsList.forEach((vendor, index) => {
            //     console.log(index + 1, vendor.name, vendor.totalSales);
            // });
            // console.log('\n');
            // salesList.forEach((sale, index) => {
            //     console.log(index + 1, sale.sellerName, sale.productPrice, sale.productName);
            // });
        };   
        const listSales = () => {
            (salesList.length >= 1 ? salesList.forEach(sale => {console.log(
                `\nSeller: ${sale.sellerName}, Item: ${sale.productName}, Price: ${sale.productPrice}, Customer: ${sale.customerName}`);}) : 
                console.log("You don't have any registered sale!\n" ))
        };
        const removeSell = () => {
            const itemToRemove = selectSaleItem();

            updateTotalSalesValue(salesList[itemToRemove], 0);
            salesList.splice(itemToRemove, 1);
            console.clear();
            console.log('\nList successfully updated.\n');
            console.log('Your new List:\n')
            salesList.forEach(sale => {
                console.log(sale)
            })
        };
        const updateSaleItem = () => {
            const selectedItem = selectSaleItem();
            const editedItem = inputSaleInfo(selectSaleItem);
            salesList.splice(selectedItem, 1, editedItem);
        }
        const selectSaleItem = () => {
            console.log('Available items:\n');
            if(salesList.length > 0) {
                salesList.forEach((sale, index) => {
                    console.log(index, sale);
                })
                saleItem = prompt('Select an item: ');
                return throwError(salesList, selectSaleItem, saleItem);
            } else console.log("\nYou don't have any sales registred!\n");
        }
        const throwError= (list, callBackFunction, value) => {
            console.clear();
            console.log(isNaN(value))
            if (value >= list.length || isNaN(value)) {
                console.log('Invalid value. Please try again.\n');
                return callBackFunction();
            }
            else return value;
        }; 
        selectOptions();
        //Throw error for the received inputs
        //Sort SalesList
        //Clear console for better visualization
        //turn the code more readable
    }
}
main();