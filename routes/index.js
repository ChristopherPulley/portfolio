// routes for homepage and user registration/login functions

const gmail_user = process.env.gmail_user; // stored on heroku server for safety
const gmail_pass = process.env.gmail_pass;

//console.log(gmail_user + " : " + gmail_pass);

// required packages and files
const express = require("express"),
  router = express.Router({ mergeParams: true }), // must merge for email to work
  nodemailer = require("nodemailer");

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
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmail_user,
      pass: gmail_pass
    }
  });

  // Specify what the email will look like
  const mailOpts = {
    from: "cpulleywebdesign@gmail.com", // This is ignored by Gmail
    to: gmail_user,
    subject: "New message from contact form at cpulleywebdesign.com",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log("contact-failure"); // Show message indicating failure
      req.flash("error", "Message Transmission Failed - Please try again or obtain email from resume.");
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
