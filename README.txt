MORAY MediaPlayer — static sign-on page
=======================================

FILES
-----
index.html        Main page
styles.css        Responsive styling
app.js            Password toggle + optional authentication hook
assets/hero.png   MORAY hero background supplied in the conversation

DEPLOYMENT
----------
Upload the entire contents of this folder to the document root of any normal
static web server. index.html should be served as the default page.

PAYPAL
------
The activation button and caption both point to:
https://paypal.me/FBADMurray

No fixed payment amount is encoded because none was specified.

SIGN-IN BACKEND
---------------
The email/password UI is present, but no authentication server URL was supplied.
For safety, the page does not pretend to authenticate locally and does not store
passwords in the browser.

When your account/licensing backend exists, edit app.js and set:

  const AUTH_ENDPOINT = "/api/login";

or use the full HTTPS endpoint.

Expected POST JSON:
  { "email": "user@example.com", "password": "..." }

Optional successful JSON response:
  { "redirect": "/account" }

FONT
----
The page requests Orbitron from Google Fonts because it is a close web-font
match to the futuristic ORAY lettering in the generated MORAY artwork. Rajdhani
is used for supporting copy. System fallbacks are included.
