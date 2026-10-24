FORME — WOMEN'S DRESSES / GEN Z FASHION PROTOTYPE
==================================================

SIX PAGES
1. index.html        Home + style overview (acts as the dashboard; there is no separate dashboard page)
2. collections.html  Dress collection with filters, sorting, favorites and quick add-to-bag
3. trending.html     Editorial trend stories
4. style-journal.html Styling inspiration with save-for-later interactions
5. about.html        Brand point of view
6. bag.html          Shopping bag, quantity recap, remove items and recommended looks

DESIGN
- Fashion editorial typography: Playfair Display + DM Sans
- Warm paper, ink black, statement red, soft pink and lilac, with lime accent
- Gen Z editorial voice, runway-inspired photography, asymmetric layouts, responsive navigation
- Gentle entrance animations; respects reduced-motion preferences
- Login/sign-up modal can be opened from the person icon or account links

FUNCTIONAL DEMO
- Product cards, category filters, sorting, favorites, add/remove from bag
- Local browser storage is used for bag and saved looks
- Login/signup validates the form only; no user account is created
- Newsletter form does not send email
- Checkout does not process payment
- Home page includes Recent Looks, The Now, and Recommended Picks to act as a dashboard without adding a dashboard page

RUN
Extract the ZIP and open index.html in a modern browser.
Internet is needed for Google Fonts and Unsplash photos.

PRODUCTION NOTES
This is a static front-end prototype, not a live store. Product names/prices are demo content.
For production, connect a secure backend, real authentication, product inventory, customer account,
order history, privacy/consent flows, shipping/tax rules and a payment provider. Don't store passwords
in browser localStorage. Photos load from Unsplash URLs and require internet access.
