let pizzaItems = [];
let wrapItems = [];

function addPizza() {
    let selectedPizza = ""; // Use let instead of const
    let quantity = ""; // Use let instead of const
    const pizzaSelect = document.getElementById('pizzaSelect');
    const pizzaQty = document.querySelector('.pizzaQty');

    // Assign the values correctly
    selectedPizza = pizzaSelect.value; // Get the selected pizza
    quantity = pizzaQty.value; // Get the quantity

    // Check if selectedPizza and quantity are valid
    if (!selectedPizza) {
        document.getElementById('pizzaError').innerHTML = "Please select a pizza.";
        return;
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
        document.getElementById('pizzaError').innerHTML = "Please enter a valid quantity.";
        return;
    }

    // Add pizza item and quantity to the array
    pizzaItems.push({ name: selectedPizza, qty: quantity });
    document.getElementById('pizzaError').innerHTML = '';
    console.log(`Added ${quantity} of ${selectedPizza}`);
}

function addWrap() {
    const wrapSelect = document.getElementById('wrapSelect');
    const wrapQty = document.querySelector('.wrapQty');

    const selectedWrap = wrapSelect.value; // Get the selected wrap
    const quantity = wrapQty.value; // Get the quantity

    // Check if selectedWrap and quantity are valid
    if (!selectedWrap) {
        document.getElementById('WrapError').innerHTML = "Please select a Wrap.";
        return;
    }
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
        document.getElementById('WrapError').innerHTML = "Please enter a valid quantity.";
        return;
    }

    // Add wrap item and quantity to the array
    wrapItems.push({ name: selectedWrap, qty: quantity });
    document.getElementById('WrapError').innerHTML = '';
    console.log(`Added ${quantity} of ${selectedWrap}`);
}

function checkForm() {
    let output = '';
    let fullName = document.getElementById('fullName').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let postcode = document.getElementById('postcode').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let province = document.getElementById('province').value;
    let creditCard = document.getElementById('creditCard').value;
    let cardExpiryMonth = document.getElementById('cardExpiryMonth').value;
    let cardExpiryYear = document.getElementById('cardExpiryYear').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let errors = ''; // To store errors

    // Mandatory field checks
    if (fullName == '') errors += 'Please enter Full Name<br>';
    if (phoneNumber == '') errors += 'Please enter Phone Number<br>';
    if (postcode == '') errors += 'Please enter Post Code<br>';
    if (address == '') errors += 'Please enter Address<br>';
    if (city == '') errors += 'Please enter City<br>';
    if (province == '') errors += 'Please enter Province<br>';
    if (creditCard == '') errors += 'Please enter Credit Card<br>';
    if (cardExpiryMonth == '') errors += 'Please enter Card Expiry Month<br>';
    if (cardExpiryYear == '') errors += 'Please enter Card Expiry Year<br>';
    if (email == '') errors += 'Please enter Email<br>';
    if (password == '') errors += 'Please enter Password<br>';
    if (confirmPassword == '') errors += 'Please enter Confirm Password<br>';
    if (password !== confirmPassword) errors += 'Passwords do not match<br>';

    // Check pizza and wrap quantities
    if (pizzaItems.length === 0) errors += 'Please add at least one Pizza<br>';
    if (wrapItems.length === 0) errors += 'Please add at least one Wrap<br>';

    // Regex
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/; // Phone number format: 123-123-1234
    if (!phoneRegex.test(phoneNumber)) errors += 'Phone number format is invalid. Use 123-123-1234<br>';

    const postcodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/; 
    if (!postcodeRegex.test(postcode)) errors += 'Postcode format is invalid. Use A1A 1A1<br>';

    const creditCardRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/; 
    if (!creditCardRegex.test(creditCard)) errors += 'Credit card format is invalid. Use 4111-1111-1111-1111<br>';

    const creditExpiryRegex = /^\d{4}$/; 
    if (!creditExpiryRegex.test(cardExpiryYear)) errors += 'Credit card Expiry year format is invalid. Use yyyy<br>';

    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/; 
    if (!emailRegex.test(email)) errors += 'Email format is invalid. Use a valid email address<br>';

    // Total purchase limit check
    const pizzaPrice = 12;
    const wrapPrice = 8;
    let totalAmount = (pizzaItems.reduce((sum, item) => sum + (item.qty * pizzaPrice), 0)) +
                      (wrapItems.reduce((sum, item) => sum + (item.qty * wrapPrice), 0));
    if (totalAmount < 10) {
        errors += 'Minimum purchase should be $10 or more<br>';
    }

    // Tax rates
    const taxAmount = {
        'Alberta': 0.05,
        'British Columbia': 0.12,
        'Manitoba': 0.12,
        'New Brunswick': 0.15,
        'Newfoundland and Labrador': 0.15,
        'Northwest Territories': 0.05,
        'Nova Scotia': 0.15,
        'Nunavut': 0.05,
        'Ontario': 0.13,
        'Prince Edward Island': 0.15,
        'Quebec': 0.14975,
        'Saskatchewan': 0.11,
        'Yukon': 0.05
    };

    let taxRate = taxAmount[province] || 0.05; // Default to 5% GST if province not found

    // Process data if no errors
    if (errors == '') {
        output = 'Receipt:<br>'
            + 'Full Name: ' + fullName 
            + '<br>Phone Number: ' + phoneNumber
            + '<br>Postcode: ' + postcode
            + '<br>Address: ' + address
            + '<br>City: ' + city
            + '<br>Province: ' + province
            + '<br>Credit Card: ' + creditCard
            + '<br>Card Expiry Month: ' + cardExpiryMonth
            + '<br>Card Expiry Year: ' + cardExpiryYear
            + '<br>Email: ' + email
            + '<br><br>Products:<br>';

        // Add products to receipt
        for (const qty of pizzaItems) {
            output += qty.name + ' x ' + qty.qty + ' = $' + (qty.qty * pizzaPrice).toFixed(2) + '<br>';
        }
        for (const qty of wrapItems) {
            output += qty.name + ' x ' + qty.qty + ' = $' + (qty.qty * wrapPrice).toFixed(2) + '<br>';
        }

        // Calculate total and tax
        let taxAmount = totalAmount * taxRate;
        let totalWithTax = totalAmount + taxAmount;

        output += '<br>Tax Amount: $' + taxAmount.toFixed(2);
        output += '<br>Total: $' + totalAmount.toFixed(2) + '<br>';
        output += 'Total with Tax (' + (taxRate * 100) + '%): $' + totalWithTax.toFixed(2) + '<br>';
        
        // No errors
        document.getElementById('formResult').innerHTML = output;
        document.getElementById('errors').innerHTML = '';
    } else {
        // Errors
        document.getElementById('errors').innerHTML = errors;
        document.getElementById('formResult').innerHTML = '';
    }

    return false;
}