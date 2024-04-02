$(document).ready(function() {
    var customers;
    var pageSize = 2;

    $("#fetchCustomersBtn").click(function() {
        $.ajax({
            url: "https://firestore.googleapis.com/v1/projects/e-commerce-adbd7/databases/(default)/documents/Customer",
            type: "GET",
            success: function(response) {
                customers = response.documents;
                displayCustomers(1); // Display first page of customers
            },
            error: function(xhr, status, error) {
                console.error("Error fetching customers:", error);
            }
        });
    });

    $(document).on("click", ".pagination a", function(e) {
        e.preventDefault();
        var page = parseInt($(this).text());
        displayCustomers(page);
    });

    $(document).on("click", "#updateCreditBtn", function() {
        var newCreditValue = parseInt($("#newCreditValue").val());
        if (!isNaN(newCreditValue)) {
            // Update the credit of the selected customer
            var customerId = $("#updateCreditForm").data("customer-id");
            updateCustomerCredit(customerId, newCreditValue);
        } else {
            alert("Please enter a valid credit value.");
        }
    });

    $(document).on("click", ".update-credit-link", function() {
        var customerId = $(this).data("customer-id");
        $("#updateCreditForm").data("customer-id", customerId).show();
    });

    function displayCustomers(page) {
        var startIndex = (page - 1) * pageSize;
        var endIndex = startIndex + pageSize;
        var paginatedCustomers = customers.slice(startIndex, endIndex);

        var customerListHTML = "<table><tr><th>Name</th><th>Contact</th><th>Email</th><th>Credit</th><th>Action</th></tr>";
        paginatedCustomers.forEach(function(customer) {
            var fields = customer.fields;
            var fullName = fields.fullName.stringValue;
            var contact = fields.contact.stringValue;
            var email = fields.email.stringValue;
            var credit = fields.credit.integerValue;
            var customerId = customer.name.split("/").pop();
            customerListHTML += "<tr><td>" + fullName + "</td><td>" + contact + "</td><td>" + email + "</td><td>" + credit + "</td><td><a href='#' class='update-credit-link' data-customer-id='" + customerId + "'>Update Credit</a></td></tr>";
        });
        customerListHTML += "</table>";
        $("#customerList").html(customerListHTML);

        displayPagination(page);
    }

    function displayPagination(currentPage) {
        var totalPages = Math.ceil(customers.length / pageSize);
        var paginationHTML = "<div class='pagination'>";
        for (var i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHTML += "<a class='active' href='#'>" + i + "</a>";
            } else {
                paginationHTML += "<a href='#'>" + i + "</a>";
            }
        }
        paginationHTML += "</div>";
        $("#pagination").html(paginationHTML);
    }
// Function to update customer's credit
function updateCustomerCredit(customerId, remainingCredit) {
    // Fetch the existing customer data first
    $.ajax({
        url: `https://firestore.googleapis.com/v1/projects/e-commerce-adbd7/databases/(default)/documents/Customer/${customerId}`,
        type: 'GET',
        success: function(response) {
            const customerData = response.fields;
            const updatedCustomerData = {
                ...customerData,
                credit: { integerValue: remainingCredit }
            };
            // Perform the PATCH request with the updated credit value
            $.ajax({
                url: `https://firestore.googleapis.com/v1/projects/e-commerce-adbd7/databases/(default)/documents/Customer/${customerId}`,
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify({ fields: updatedCustomerData }),
                success: function(response) {
                    alert('Customer credit updated successfully.');
                },
                error: function(error) {
                    console.error('Error updating customer credit:', error);
                }
            });
        },
        error: function(error) {
            console.error('Error fetching customer information:', error);
        }
    });
}


});



