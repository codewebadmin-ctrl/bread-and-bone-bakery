
// ==========================================
// BREAD & BONE BAKERY
// CONTACT FORM AND PRE-ORDER FUNCTIONALITY
// ==========================================

// The bakery's email address
const bakeryEmail = "info@breadandbone.co.za";

// ==========================================
// 1. CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contact-form");
const contactFeedback = document.getElementById("contact-feedback");

if (contactForm && contactFeedback) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect the customer's information
        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("contact-subject").value;
        const message = document.getElementById("contact-message").value.trim();

        // Check that all required information is provided
        if (!name || !email || !message) {
            contactFeedback.textContent =
                "Please complete all required fields before continuing.";
            return;
        }

        // Prepare the email content
        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(
            "Hello Bread & Bone Bakery,\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message
        );

        const emailLink =
            "mailto:" + bakeryEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        // Display an email link for the customer
        contactFeedback.textContent =
            "Your message is ready. Select the link below to open your email application.";

        const emailButton = document.createElement("a");
        emailButton.href = emailLink;
        emailButton.textContent = "Open email application";
        emailButton.className = "btn";

        contactFeedback.appendChild(document.createElement("br"));
        contactFeedback.appendChild(emailButton);
    });
}


// ==========================================
// 2. PRE-ORDER FORM
// ==========================================

const orderForm = document.getElementById("order-form");
const productSelect = document.getElementById("order-loaf");
const quantityInput = document.getElementById("order-quantity");
const pickupDate = document.getElementById("order-date");
const orderTotal = document.getElementById("order-total");
const orderFeedback = document.getElementById("order-feedback");

// Calculate the order total
function calculateOrderTotal() {

    const selectedProduct =
        productSelect.options[productSelect.selectedIndex];

    const price = Number(selectedProduct.dataset.price);
    const quantity = Number(quantityInput.value);

    if (
        !selectedProduct.value ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        !Number.isFinite(price) ||
        price <= 0
    ) {
        orderTotal.textContent =
            "Select a product and enter a valid quantity to calculate your total.";
        return null;
    }

    const total = price * quantity;

    orderTotal.textContent =
        "Order Total: R" + total.toFixed(2);

    return {
        product: selectedProduct.value,
        price: price,
        quantity: quantity,
        total: total
    };
}


// Update the total whenever the product or quantity changes
if (productSelect && quantityInput && orderTotal) {

    productSelect.addEventListener("change", calculateOrderTotal);

    quantityInput.addEventListener("input", calculateOrderTotal);

}


// ==========================================
// 3. PREVENT PICKUP DATES IN THE PAST
// ==========================================

if (pickupDate) {

    // Get today's date using the visitor's local calendar date
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayString = `${year}-${month}-${day}`;

    pickupDate.min = todayString;
}


// ==========================================
// 4. REVIEW AND PREPARE THE ORDER EMAIL
// ==========================================

if (orderForm && orderFeedback) {

    orderForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Collect customer information
        const name =
            document.getElementById("order-name").value.trim();

        const email =
            document.getElementById("order-email").value.trim();

        const selectedOrder = calculateOrderTotal();

        const date = pickupDate.value;

        // Validate order information
        if (!name || !email || !selectedOrder || !date) {

            orderFeedback.textContent =
                "Please complete all fields and select a valid product, quantity and pickup date.";

            return;
        }

        // Check that the pickup date is not in the past
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        const todayString = `${year}-${month}-${day}`;

        if (date < todayString) {

            orderFeedback.textContent =
                "Please select today or a future pickup date.";

            return;
        }

        // Prepare the order details
        const emailSubject = encodeURIComponent(
            "Pre-Order Request - " + name
        );

        const emailBody = encodeURIComponent(
            "Hello Bread & Bone Bakery,\n\n" +
            "I would like to request the following pre-order:\n\n" +
            "Customer Name: " + name + "\n" +
            "Customer Email: " + email + "\n" +
            "Product: " + selectedOrder.product + "\n" +
            "Price per item: R" + selectedOrder.price.toFixed(2) + "\n" +
            "Quantity: " + selectedOrder.quantity + "\n" +
            "Order Total: R" + selectedOrder.total.toFixed(2) + "\n" +
            "Requested Pickup Date: " + date + "\n\n" +
            "Please confirm whether this order can be prepared.\n\n" +
            "Thank you!"
        );

        const emailLink =
            "mailto:" + bakeryEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        // Clear any previous order review
        orderFeedback.replaceChildren();

        // Create the order summary
        const heading = document.createElement("h3");
        heading.textContent = "Your Order Summary";

        const summary = document.createElement("p");
        summary.textContent =
            "Customer: " + name +
            " | Product: " + selectedOrder.product +
            " | Quantity: " + selectedOrder.quantity +
            " | Total: R" + selectedOrder.total.toFixed(2) +
            " | Pickup date: " + date;

        const notice = document.createElement("p");
        notice.textContent =
            "This is a pre-order request, not a confirmed order. " +
            "The bakery must confirm availability before your order is final.";

        const emailButton = document.createElement("a");
        emailButton.href = emailLink;
        emailButton.textContent = "Email My Pre-Order";
        emailButton.className = "btn";

        // Display the review and email link
        orderFeedback.appendChild(heading);
        orderFeedback.appendChild(summary);
        orderFeedback.appendChild(notice);
        orderFeedback.appendChild(emailButton);

    });

}
