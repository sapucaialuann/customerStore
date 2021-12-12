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
const salesList = [];
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
            sale.sellerName = vendorsList[userValue].name;
            sale.customerName = prompt('Insert the customer name: ');
            sale.date = getDateOfSale();
            sale.productName = prompt('Insert the product name: ');
            sale.productPrice = parseFloat(prompt('Insert the product price: '), 10);
            sale.totalSales = vendorsList[userValue].totalSales;
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
            isValid = false;
            let date = '';
            while(!isValid) {
            const day = parseInt(prompt('Insert the day of the sale (must be a number between 1 and 31): '), 10);
            const month = parseInt(prompt('Insert the month of the sale (must be a number between 1 and 12): '), 10);
            const year =  parseInt(prompt('Insert the year of the sale (must be a number between 2018 and 2021): '), 10);
            date = day + '/' + month + '/' + year;
                function isValidDate(day, month, year)
                {
                    // Check the ranges of month and year
                    if(year < 1000 || year > 3000 || month == 0 || month > 12) {
                        console.log('Invalid Date! Please try again.')
                        return isValid = false; ;
                    }
                    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
                    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                        monthLength[1] = 29;
                    if (day > 0 && day <= monthLength[month - 1])
                    return isValid = true;
                    else {
                        console.log('Invalid Date! Please try again.')
                        return isValid = false;
                    }
                };
                isValidDate(day, month, year);
                console.log(date);
            }
            return date;
        };
        const updateTotalSalesValue = (sale, operationType) => {
            vendorsList.some(vendor => {
                if (sale.sellerName == vendor.name) {
                    switch (operationType) {
                        case 1:
                            vendor.totalSales += sale.productPrice;
                            sale.totalSales = vendor.totalSales;
                            break;
                        case 0:
                            vendor.totalSales -= sale.productPrice;
                            sale.totalSales = vendor.totalSales;
                            break;
                    }
                    return true;
                };
            })
            rankVendors();
        };
        const rankVendors = () => {
            vendorsList.sort((a, b) =>  parseFloat(b.totalSales) - parseFloat(a.totalSales));
            salesList.sort((a, b) => parseFloat(b.totalSales) - parseFloat(a.totalSales));
            console.log(vendorsList);
            console.log(salesList);
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
            if (value >= list.length || isNaN(value) || value === null) {
                console.log('Invalid value. Please try again.\n');
                return callBackFunction();
            }
            else return value;
        }; 
        selectOptions();
        //turn the code more readable
    }
}
main();