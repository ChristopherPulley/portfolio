// routes for homepage and user registration/login functions

// required packages and files
const express = require("express"),
  router = express.Router({ mergeParams: true }),
  nodemailer = require("nodemailer");

//  root route
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
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: res.locals._user,
      pass: res.locals._pass
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
    var resetButton = req.body.contactReset;

    if (error) {
      console.log("contact-failure"); // Show message indicating failure
      req.flash("error", "Message Transmission Failed - Please try again.");
      res.redirect("/contact");
    } else {
      console.log("contact-success"); // Show message indicating success
      req.flash("success", "Message Transmitted Successfully - Thank you.");
      res.redirect("/contact");
    }
  });
});

router.get("*", (req, res) => {
  res.send("Sorry, that page does not exist. Please go back.");
});

// always export !!!
module.exports = router;
