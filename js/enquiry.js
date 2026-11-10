
// ==========================================
// BREAD & BONE BAKERY
// STORY SUBMISSION AND COMMUNITY LOAF
// ==========================================

const bakeryEmail = "info@breadandbone.co.za";
const pricePerLoaf = 50;


// ==========================================
// 1. STORY SUBMISSION FORM
// ==========================================

const storyForm = document.getElementById("story-form");
const storyFeedback = document.getElementById("story-feedback");

if (storyForm && storyFeedback) {

    storyForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Collect the visitor's details
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const story = document.getElementById("story").value.trim();
        const permission = document.getElementById("permission").checked;

        // Validate the required fields
        if (!name || !email || !story) {

            storyFeedback.textContent =
                "Please complete all required fields before continuing.";

            return;
        }

        // Check the visitor's permission
        if (!permission) {

            storyFeedback.textContent =
                "Please give permission before submitting your story.";

            return;
        }

        // Prepare the email
        const emailSubject = encodeURIComponent(
            "Community Story Submission - " + name
        );

        const emailBody = encodeURIComponent(
            "Hello Bread & Bone Bakery,\n\n" +
            "I would like to submit my story for consideration.\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "My Story:\n" + story + "\n\n" +
            "Permission:\n" +
            "I agree to have my story considered for sharing on the website " +
            "and printing on bakery bags.\n\n" +
            "Thank you."
        );

        const emailLink =
            "mailto:" + bakeryEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        // Display feedback
        storyFeedback.replaceChildren();

        const message = document.createElement("p");

        message.textContent =
            "Your story is ready for review. Select the button below to open your email application.";

        const emailButton = document.createElement("a");

        emailButton.href = emailLink;
        emailButton.textContent = "Email My Story";
        emailButton.className = "btn";

        storyFeedback.appendChild(message);
        storyFeedback.appendChild(emailButton);

    });

}


// ==========================================
// 2. COMMUNITY LOAF DONATION CALCULATOR
// ==========================================

const donationForm = document.getElementById("donation-form");
const loavesInput = document.getElementById("loaves");
const donationTotal = document.getElementById("donation-total");
const donationFeedback = document.getElementById("donation-feedback");


// Calculate the donation amount
function calculateDonation() {

    const numberOfLoaves = Number(loavesInput.value);

    // Check for a valid whole number
    if (
        !Number.isInteger(numberOfLoaves) ||
        numberOfLoaves < 1
    ) {

        donationTotal.textContent =
            "Enter at least one loaf to calculate your donation.";

        return null;
    }

    // Calculate the total donation
    const totalDonation = numberOfLoaves * pricePerLoaf;

    donationTotal.textContent =
        numberOfLoaves + " loaf(s) = R" +
        totalDonation.toFixed(2);

    return {
        loaves: numberOfLoaves,
        total: totalDonation
    };

}


// Update the calculator whenever the visitor changes the number
if (loavesInput && donationTotal) {

    loavesInput.addEventListener("input", calculateDonation);

}


// ==========================================
// 3. DONATION REVIEW AND EMAIL
// ==========================================

if (donationForm && donationFeedback) {

    donationForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Collect the donor's information
        const name =
            document.getElementById("donation-name").value.trim();

        const email =
            document.getElementById("donation-email").value.trim();

        const donation = calculateDonation();

        // Validate the information
        if (!name || !email || !donation) {

            donationFeedback.textContent =
                "Please complete all fields and enter a valid number of loaves.";

            return;
        }

        // Prepare the donation email
        const emailSubject = encodeURIComponent(
            "Community Loaf Donation Request - " + name
        );

        const emailBody = encodeURIComponent(
            "Hello Bread & Bone Bakery,\n\n" +
            "I would like to support the Community Loaf Programme.\n\n" +
            "Donor Name: " + name + "\n" +
            "Donor Email: " + email + "\n" +
            "Number of Loaves: " + donation.loaves + "\n" +
            "Donation Amount: R" + donation.total.toFixed(2) + "\n\n" +
            "Please provide instructions on how I can complete this donation.\n\n" +
            "Thank you for supporting the community."
        );

        const emailLink =
            "mailto:" + bakeryEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        // Clear previous feedback
        donationFeedback.replaceChildren();

        // Create the donation summary
        const heading = document.createElement("h3");

        heading.textContent = "Your Donation Summary";

        const summary = document.createElement("p");

        summary.textContent =
            "You have selected " + donation.loaves +
            " loaf(s), with a total donation value of R" +
            donation.total.toFixed(2) + ".";

        const impact = document.createElement("p");

        impact.textContent =
            "Your donation could provide " + donation.loaves +
            " loaf(s) of bread to people in need.";

        const notice = document.createElement("p");

        notice.textContent =
            "This is a donation request only. No payment has been made or donation confirmed.";

        const emailButton = document.createElement("a");

        emailButton.href = emailLink;
        emailButton.textContent = "Email My Donation Request";
        emailButton.className = "btn";

        // Display the results
        donationFeedback.appendChild(heading);
        donationFeedback.appendChild(summary);
        donationFeedback.appendChild(impact);
        donationFeedback.appendChild(notice);
        donationFeedback.appendChild(emailButton);

    });

}
