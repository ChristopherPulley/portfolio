// routes for homepage and user registration/login functions

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY; // stored on heroku server for safety
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;

//console.log(gmail_user + " : " + gmail_pass);

// required packages and files
const express = require("express"),
  router = express.Router({ mergeParams: true }); // must merge for email to work

//  main page routes
router.get("/", (req, res) => {
  console.log("Navigated to Root");
  res.render("landing");
});

router.get("/portfolio", (req, res) => {
  console.log("Navigated to Portfolio");
  res.render("portfolio");
});

router.get("/education", (req, res) => {
  console.log("Navigated to Education");
  res.render("education");
});

router.get("/about", (req, res) => {
  console.log("Navigated to About");
  res.render("about");
});

router.get("/contact", (req, res) => {
  console.log("Navigated to Contact");
  res.render("contact");
});

router.post("/contact", (req, res) => {
  var resetButton = req.body.contactReset;
  // Instantiate the MAILGUN API
  const mailgun = require("mailgun-js");
  const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

  // Specify what the email will look like
  const mailOpts = {
    from: `${req.body.email}`,
    to: GMAIL_ADDRESS,
    subject: `${req.body.subject} -from contact form at cpulleywebdesign.com`,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
  };

  // Attempt to send the email and display results for user

  mg.messages().send(mailOpts, (error, response) => {
    console.log(response);

    if (error) {
      console.log("contact-failure"); // Show message indicating failure
      req.flash(
        "error",
        "Message Transmission Failed - Please try again. Thank You."
      );
    } else {
      console.log("contact-success"); // Show message indicating success
      req.flash("success", "Message Transmitted Successfully - Thank you.");
    }
    res.redirect("/contact");
  });
});

// --------- Portfolio include site routes -----------

// creatorzone route
router.get("/portfolio/creatorzone", (req, res) => {
  console.log("Navigated to CreatorZone");
  res.render("creatorzone");
});

// ps_portfolio route
router.get("/portfolio/ps_portfolio", (req, res) => {
  console.log("Navigated to PhotoShop Portfolio");
  res.render("ps_portfolio");
});

// ----------- Catch-all for non-existent routes
router.get("*", (req, res) => {
  res.send("Sorry, that page does not exist. Please go back.");
});

// always export !!!
module.exports = router;
