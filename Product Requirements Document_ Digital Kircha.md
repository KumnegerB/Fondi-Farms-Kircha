# Product Requirements Document: Digital Kircha

**Product:** Digital Kircha  
**Platform:** Telegram Mini App + Web Admin Dashboard  
**Initial Market:** Ambo, Ethiopia  
**Product Type:** Direct-to-consumer farm commerce  
**Primary Product:** Cattle Kircha  
**Secondary Products:** Eggs, yogurt, milk, chicken, and other farm products  
**Payment Gateway:** Chapa  
**Fulfillment:** Pickup only  
**PRD Scope:** MVP / Version 1

---

## 1. Product Overview

Digital Kircha is a Telegram Mini App that enables customers to purchase portions of cattle directly from a cattle breeder using the Ethiopian Kircha model.

Each available cattle is listed individually with its actual photos, short videos, description, price, slaughter schedule, and remaining Kircha availability.

Customers can reserve:

- ¼ Kircha
- ½ Kircha
- 1 Kircha
- Multiple Kircha
- The entire remaining Kircha

A reservation becomes valid after the customer pays a required non-refundable down payment through Chapa.

Before pickup, the customer must pay the remaining balance.

Customers are informed of the slaughter date and time and may come to observe the slaughter if they choose. After the meat has been divided into equal portions, customers can collect their portion from the designated pickup location.

Digital Kircha will also include a secondary farm shop where customers can purchase products such as eggs, yogurt, milk, chicken, and other products produced by the same business.

Kircha is the hero of the platform. The farm shop exists as a complementary service and as a way for customers to interact with the business more frequently.

---

# 2. Product Vision

Make traditional Ethiopian Kircha easier to access, trust, reserve, pay for, and manage digitally while preserving the physical and cultural experience of Kircha.

Digital Kircha should allow a customer to:

> **See the actual cattle → choose how much Kircha they want → pay a deposit → follow the slaughter schedule → complete payment → collect their meat.**

The platform should combine the trust and transparency of buying directly from a cattle breeder with the convenience of digital commerce.

---

# 3. Problem Statement

Traditional Kircha generally requires people to coordinate manually around:

- finding cattle;
- determining the price;
- finding enough participants;
- collecting money;
- recording who has paid;
- determining how many shares each person owns;
- communicating the slaughter date;
- reminding customers about outstanding payments;
- communicating pickup times; and
- tracking who has collected their portion.

For the cattle breeder, this creates administrative overhead and makes it difficult to reach customers beyond an existing personal network.

For customers, there may also be uncertainty around:

- what cattle they are buying;
- how much is still available;
- how much they have reserved;
- how much they have paid;
- how much they still owe;
- when slaughter will occur; and
- when and where they can collect their meat.

Digital Kircha digitizes these activities without attempting to digitize the physical division of the meat itself.

---

# 4. Goals

## 4.1 Primary Goals

The MVP shall:

1. Allow the business to list multiple cattle for Kircha simultaneously.
2. Allow customers to see the actual cattle through photos and videos.
3. Allow customers to purchase fractional or multiple Kircha portions.
4. Allow customers to reserve Kircha by paying a non-refundable deposit.
5. Automatically track remaining Kircha availability.
6. Allow customers to complete their balance payment before pickup.
7. Communicate slaughter schedules and pickup information.
8. Use SMS as the primary customer notification channel.
9. Also send important transactional notifications through Telegram.
10. Allow customers to purchase other farm products separately.
11. Give the business an administrative dashboard for managing the entire operation.
12. Maintain clear records of orders, payments, reservations, customers, and pickups.

---

# 5. Non-Goals for MVP

The MVP will **not** include:

- third-party farmers or sellers;
- multi-vendor marketplace functionality;
- home delivery;
- customer-selected pickup time slots;
- automated meat weighing or meat division;
- digital random allocation of meat portions;
- livestock auctions;
- bidding;
- subscription-based milk or egg ordering;
- loyalty points;
- product reviews;
- customer ratings;
- complex promotions;
- referral programs;
- AI recommendations;
- automated cattle pricing;
- automated Kircha portion quality assessment;
- automated cancellation of unpaid Kircha reservations.

These capabilities may be considered after validating the core business.

---

# 6. Target Users

## 6.1 Customer

A person who wants to:

- browse available cattle;
- participate in Kircha;
- purchase one or more Kircha portions;
- purchase ordinary farm products;
- make payments;
- monitor their orders;
- receive slaughter and pickup information; and
- collect their purchases from the business.

Customers primarily interact through the Telegram Mini App.

---

## 6.2 Administrator

The business owner or authorized staff member responsible for:

- adding cattle;
- creating Kircha listings;
- setting prices;
- setting deposits;
- uploading cattle media;
- setting slaughter schedules;
- managing reservations;
- viewing payments;
- managing customers;
- managing shop products;
- updating inventory;
- managing pickup;
- updating order states; and
- communicating important changes to customers.

Administrators primarily interact through a separate web dashboard.

---

# 7. Product Structure

The customer-facing product should consist of five primary areas:

1. **Home**
2. **Kircha**
3. **Shop**
4. **Orders**
5. **Profile**

Kircha must receive significantly greater visual prominence than the farm shop.

---

# 8. Home

The Home screen should immediately communicate that Digital Kircha is primarily a Kircha platform.

It should include:

## 8.1 Featured Kircha

Display one or more available cattle prominently.

Each card may show:

- cattle cover image;
- cattle/listing name or identifier;
- breed;
- price per Kircha;
- remaining Kircha;
- slaughter date, when available;
- availability indicator;
- CTA to view the listing.

Example:

> **Borana Ox K-024**  
> 3¼ Kircha remaining  
> 18,000 ETB / Kircha  
> Slaughter: September 5  
> **View Kircha**

---

## 8.2 Available Kircha

A section showing other active cattle.

Customers should be able to navigate to the complete Kircha catalog.

---

## 8.3 Farm Products

A secondary section such as:

**Fresh From Our Farm**

This may show:

- eggs;
- milk;
- yogurt;
- chicken;
- other currently available products.

The farm shop must remain visually secondary to Kircha.

---

# 9. Kircha Catalog

The Kircha section displays cattle that customers can currently or previously participate in.

Possible customer-facing filters:

- Available
- Upcoming
- Completed

The MVP does not require advanced filtering or search.

Each listing should clearly show its availability.

The interface must display Kircha availability based on the amount sold, not the number of customers.

Correct:

> **8¼ of 12 Kircha reserved**

Incorrect:

> 8 of 12 people joined

One person may purchase multiple Kircha.

---

# 10. Kircha Listing

Every Kircha listing corresponds to a specific cattle.

## 10.1 Cattle Information

The listing may contain:

- cattle ID/reference;
- cattle name/title;
- breed;
- approximate age;
- approximate/live weight;
- description;
- farm/source information;
- health/veterinary information where applicable;
- cover image;
- additional photos;
- short videos.

The customer must be able to see the actual cattle being offered.

Generic cattle images should not replace actual cattle media.

---

# 11. Kircha Pricing

The administrator determines the commercial selling price.

The platform does not determine the breeder's margin.

The administrator may consider:

- cattle cost;
- feed;
- transportation;
- slaughter;
- labor;
- operating expenses;
- other costs;
- desired margin.

The administrator then sets the intended selling value of the cattle.

The administrator also defines how many full Kircha portions make up the cattle.

Example:

**Total cattle selling price:** 240,000 ETB  
**Total Kircha:** 12

The system calculates:

**Price per 1 Kircha:** 20,000 ETB

Therefore:

- ¼ Kircha = 5,000 ETB
- ½ Kircha = 10,000 ETB
- 1 Kircha = 20,000 ETB
- 2 Kircha = 40,000 ETB

The system should perform these calculations automatically.

---

# 12. Kircha Inventory Model

The smallest purchasable Kircha quantity in the MVP is:

**¼ Kircha**

For internal inventory calculations:

- ¼ Kircha = 1 unit
- ½ Kircha = 2 units
- 1 Kircha = 4 units

Therefore:

**12 Kircha = 48 quarter-units**

This internal representation should not need to be exposed to customers.

The customer-facing interface should continue displaying quantities as:

- ¼
- ½
- ¾
- 1
- 1¼
- 1½
- etc.

---

# 13. Selecting Kircha Quantity

A customer may purchase:

- ¼ Kircha;
- ½ Kircha;
- 1 Kircha;
- multiple Kircha; or
- all remaining Kircha.

There is no artificial per-customer maximum.

The maximum available purchase is determined solely by the remaining available Kircha.

Example:

If only **2¾ Kircha** remain, a customer may purchase any valid quarter increment up to **2¾ Kircha**.

The application must prevent customers from purchasing more than the currently available quantity.

---

# 14. Kircha Reservation Flow

The primary customer journey is:

1. Customer opens Digital Kircha in Telegram.
2. Customer browses available cattle.
3. Customer opens a cattle listing.
4. Customer reviews:
   - photos;
   - videos;
   - cattle details;
   - price;
   - Kircha availability;
   - slaughter information, if scheduled.
5. Customer selects Kircha quantity.
6. Application displays:
   - selected quantity;
   - total price;
   - required deposit;
   - remaining balance.
7. Customer reviews the non-refundable deposit condition.
8. Customer proceeds to Chapa.
9. Customer completes the deposit payment.
10. Backend verifies successful payment.
11. Kircha quantity becomes reserved.
12. Remaining Kircha availability is reduced.
13. Customer receives confirmation through SMS and Telegram.
14. Reservation appears under My Orders.
15. Customer waits for the scheduled slaughter.
16. Customer may attend the slaughter if desired.
17. Customer completes the remaining balance payment.
18. Meat is prepared for pickup.
19. Customer arrives at the business location.
20. Staff verifies full payment.
21. Customer selects/receives the appropriate physical portion(s).
22. Staff marks the reservation as collected.
23. Order becomes completed.

---

# 15. Deposit

The required deposit is manually configured by the administrator for each Kircha listing.

The administrator sets the deposit amount corresponding to **1 full Kircha**.

The platform calculates proportional deposits automatically.

Example:

**Deposit per Kircha:** 4,000 ETB

Therefore:

- ¼ Kircha = 1,000 ETB deposit
- ½ Kircha = 2,000 ETB deposit
- 1 Kircha = 4,000 ETB deposit
- 2 Kircha = 8,000 ETB deposit

The deposit must be:

- paid through Chapa;
- successfully verified;
- non-refundable.

A Kircha portion is not considered reserved until the deposit payment has been successfully verified.

---

# 16. Non-Refundable Deposit Disclosure

The non-refundable condition must be clearly shown before payment.

The customer should see information similar to:

**Reservation Summary**

Quantity: 1 Kircha  
Total: 20,000 ETB  
Deposit: 4,000 ETB  
Remaining balance: 16,000 ETB

> By completing this payment, your selected Kircha will be reserved. The reservation deposit is non-refundable.

The user must explicitly proceed with payment after seeing this information.

---

# 17. Payment

All digital payments in the MVP will use **Chapa**.

There are three primary payment types:

### Kircha Deposit

Initial payment required to reserve Kircha.

### Kircha Balance

Remaining amount due after deposit.

### Shop Payment

Full payment for ordinary farm-product orders.

The system should maintain payment records independently from orders so that one Kircha reservation can contain multiple payments.

A payment should record at minimum:

- order/reservation reference;
- customer;
- payment type;
- amount;
- Chapa transaction reference;
- payment status;
- payment date/time.

Possible payment statuses:

- Pending
- Successful
- Failed

The application must not mark an order as paid based only on a customer-facing success screen.

Successful payments must be verified through the backend using the payment gateway's supported verification mechanism.

---

# 18. Remaining Balance

After paying the deposit, the customer should always be able to see:

- total Kircha price;
- deposit already paid;
- remaining balance;
- payment history;
- payment status.

Example:

**Your Kircha**

Quantity: 1½ Kircha  
Total: 30,000 ETB  
Paid: 6,000 ETB  
Remaining: **24,000 ETB**

**Pay Remaining Balance**

Customers may complete the remaining payment before the slaughter date if they choose.

The strict business rule is:

> **The complete balance must be paid before meat can be collected.**

---

# 19. Slaughter Scheduling

The administrator sets:

- slaughter date;
- slaughter time;
- slaughter location.

Customers with a valid reservation must be informed of the slaughter schedule.

Customers may attend if they wish.

Attendance is optional.

The application does not need to track whether a customer intends to attend in the MVP.

---

# 20. Changes to Slaughter Schedule

The administrator must be able to change the slaughter date or time.

When a schedule affecting active customers changes, the system should allow the administrator to notify affected customers.

Important schedule changes should generate:

- SMS notification; and
- Telegram notification.

---

# 21. Slaughter Does Not Depend on Selling Out

A Kircha does not need to reach 100% reservation before slaughter.

If:

**12 Kircha available**

but only:

**8 Kircha reserved**

the scheduled slaughter may still proceed.

The eight reserved Kircha remain allocated to their customers.

The remaining meat may be sold separately by the business.

The application must therefore not automatically cancel, postpone, or prevent slaughter because Kircha inventory remains unsold.

---

# 22. Meat Division

The physical meat division process remains outside the application's scope.

After slaughter:

- the business divides the cattle into approximately equal Kircha portions;
- customers do not receive digitally predetermined meat piles;
- no algorithm assigns specific physical piles to customers;
- customers simply receive/select their corresponding number of portions.

The system tracks **quantity ownership**, not specific meat cuts or piles.

---

# 23. Pickup

The MVP is pickup-only.

The administrator sets:

- pickup location;
- pickup date;
- pickup start time;
- pickup end time.

Example:

**Pickup**

Saturday, September 5  
2:00 PM – 6:00 PM  
Ambo, [Business/Farm Location]

No customer-selected pickup slot is required.

---

# 24. Pickup Window Behavior

The pickup window is primarily informational.

If a customer:

- has fully paid; and
- misses the stated pickup window;

their order does **not** automatically expire.

They may collect it afterward according to the business's operational arrangements.

The system should continue to show:

**Paid — Awaiting Pickup**

until staff marks the order as collected.

---

# 25. Unpaid Customers After Pickup Time

If the pickup window passes and the customer has not completed payment:

- the system should show that a balance remains due;
- the reservation should not automatically disappear;
- the administrator may contact the customer manually;
- the administrator may decide what action to take.

The MVP should not automatically forfeit the customer's reservation solely because the pickup window has ended.

The administrator may later manually mark a reservation as:

- cancelled; or
- forfeited;

when appropriate.

Future versions may introduce an automated payment deadline policy after sufficient operating experience.

---

# 26. Kircha Reservation Statuses

Customer Kircha reservations should support states such as:

### Awaiting Deposit

Reservation initiated but required deposit has not been successfully paid.

### Reserved

Deposit successfully paid and quantity locked.

### Balance Due

Reservation active and additional payment remains.

### Paid

Total required amount has been paid.

### Ready for Pickup

Order has been prepared and can be collected.

### Collected

Customer has received their Kircha.

### Cancelled

Reservation has been cancelled administratively.

### Forfeited

Business has explicitly marked the reservation as forfeited according to business policy.

---

# 27. Kircha Listing Statuses

A Kircha listing should have a lifecycle independent of individual customer reservations.

Suggested states:

### Draft

Not visible to customers.

### Open

Visible and accepting reservations.

### Slaughter Scheduled

Slaughter timing has been finalized.

### Slaughtered

Cattle has been slaughtered.

### Ready for Pickup

Customer portions are available.

### Completed

Kircha lifecycle has finished.

### Cancelled

Listing cancelled by the business.

Labels such as **Almost Full** should be calculated from remaining inventory and should not require a dedicated database lifecycle status.

---

# 28. Farm Shop

Digital Kircha will include a secondary farm shop.

Initial product types may include:

- eggs;
- yogurt;
- milk;
- chicken;
- other farm products.

All products are sold directly by the same business.

The MVP is not a marketplace.

---

# 29. Farm Shop Product

A product should support:

- product name;
- description;
- category;
- photo(s);
- unit;
- price;
- available quantity;
- availability status.

Examples of units may include:

- tray;
- piece;
- liter;
- bottle;
- kilogram;
- whole chicken;
- package.

The platform should not assume that every product uses the same unit.

---

# 30. Variable Farm Inventory

Farm production may change frequently.

For example:

- 60 trays of eggs may be available today;
- 35 may be available tomorrow;
- yogurt may be unavailable on another day;
- milk quantities may vary daily.

The administrator must therefore be able to easily update inventory.

The system should prevent customers from ordering more than the currently available quantity.

---

# 31. Shop Checkout

Kircha and ordinary farm products must use separate checkout flows.

A customer must not combine:

> 1 Kircha + eggs + yogurt

into a single payment transaction.

Kircha has:

> reservation → deposit → future balance → slaughter → pickup

while the shop has:

> cart → full payment → pickup

The customer may still have both types of orders under the same account and Orders screen.

---

# 32. Shop Cart

Customers should be able to:

- add products;
- change quantities;
- remove products;
- see subtotal;
- review the order;
- proceed to checkout.

Kircha products must not be added to the farm-product cart.

---

# 33. Shop Payment

Shop orders require full payment through Chapa.

After successful payment:

- inventory is reduced;
- order is confirmed;
- customer receives confirmation;
- order becomes available for business processing.

---

# 34. Shop Pickup

Shop orders are pickup-only in MVP.

The customer should see:

- pickup location;
- order status;
- pickup instructions where applicable.

Possible shop order statuses:

- Awaiting Payment
- Paid
- Preparing
- Ready for Pickup
- Collected
- Cancelled

---

# 35. Orders

The Orders area should clearly separate:

## My Kircha

Contains the customer's Kircha reservations.

Each should display:

- cattle;
- Kircha quantity;
- total value;
- paid amount;
- remaining balance;
- slaughter information;
- pickup information;
- reservation status.

## Shop Orders

Contains normal farm-product purchases.

Each should display:

- products;
- quantities;
- total amount;
- payment state;
- pickup state;
- order status.

---

# 36. Customer Identity and Registration

Telegram will provide the initial entry point and Telegram identity.

However, a valid phone number is required because SMS is the primary transactional notification channel.

The system should collect:

- name;
- phone number;
- Telegram user information where available.

The customer's phone number should be collected or confirmed before the customer's first purchase/reservation is completed.

---

# 37. Notifications

Notifications are a core product requirement.

## 37.1 Channels

### Primary

**SMS**

### Secondary

**Telegram bot notification**

### Persistent Reference

Current order status inside the Telegram Mini App.

Important customer events should generally be sent through both SMS and Telegram.

---

# 38. Notification Events

The MVP should support transactional notifications for events including:

### Kircha

- deposit successfully paid;
- reservation confirmed;
- slaughter date/time announced;
- slaughter date/time changed;
- slaughter reminder;
- remaining balance reminder;
- full payment confirmed;
- Kircha ready for pickup;
- pickup window reminder;
- unpaid balance after relevant deadline/window;
- reservation cancelled/forfeited when applicable.

### Shop

- payment confirmed;
- order confirmed;
- order ready for pickup;
- order cancelled where applicable.

Marketing messages are outside the MVP.

Examples of future marketing notifications include:

- new cattle available;
- fresh eggs available;
- yogurt restocked;
- promotions.

---

# 39. Notification Administration

Administrators should be able to resend relevant transactional notifications when necessary.

For important operational changes such as a changed slaughter time, the administrator should be able to notify all affected customers.

The exact SMS provider, retry strategy, message queue architecture, delivery-report handling, and message-template implementation belong in the technical design/LLD rather than this PRD.

---

# 40. Profile

The customer profile should contain basic functionality such as:

- name;
- phone number;
- Telegram account information where applicable;
- support/contact information;
- pickup location information;
- terms and policies;
- logout/close-related functionality where relevant.

The profile does not require extensive social functionality.

---

# 41. Admin Dashboard

A separate web-based administrative dashboard should be provided for the business.

It should not depend on Telegram for daily administration.

Suggested navigation:

### Dashboard

Operational overview.

### Kircha

- Cattle
- Listings
- Reservations

### Shop

- Products
- Inventory
- Orders

### Customers

Customer records and order history.

### Payments

Payment records and outstanding balances.

### Pickup

Orders awaiting collection.

### Settings

Business information and relevant configuration.

---

# 42. Admin Dashboard Overview

The dashboard should prioritize operational information rather than decorative analytics.

Important information includes:

- active Kircha listings;
- Kircha remaining per cattle;
- upcoming slaughter events;
- customers with outstanding balances;
- upcoming pickups;
- paid orders awaiting pickup;
- recent payments;
- active shop orders;
- low/out-of-stock products.

The MVP does not need complex business intelligence dashboards.

---

# 43. Cattle Management

Administrators must be able to:

- create cattle records;
- edit cattle information;
- upload photos;
- upload short videos;
- create a Kircha listing from cattle;
- archive cattle where appropriate.

---

# 44. Kircha Management

Administrators must be able to:

- create a Kircha listing;
- define total Kircha quantity;
- define cattle selling price;
- see calculated price per Kircha;
- define deposit per Kircha;
- set listing availability;
- publish/unpublish;
- see remaining Kircha;
- see reserved Kircha;
- schedule slaughter;
- update slaughter schedule;
- define pickup window;
- mark slaughter completed;
- mark portions ready for pickup;
- complete/archive the Kircha.

---

# 45. Reservation Management

Administrators must be able to view:

- customer;
- phone number;
- Telegram identity where applicable;
- cattle/Kircha;
- reserved quantity;
- total value;
- deposit paid;
- remaining balance;
- payment history;
- reservation state;
- pickup state.

Administrators should be able to perform appropriate manual state changes where necessary.

---

# 46. Pickup Management

Staff should have a simple way to verify a customer at pickup.

The screen should clearly show:

- customer;
- Kircha/order reference;
- purchased quantity;
- total amount;
- amount paid;
- outstanding balance;
- pickup eligibility.

If:

**Remaining balance > 0**

the interface should clearly indicate:

> Payment required before pickup.

If:

**Remaining balance = 0**

staff may mark:

**Collected**

---

# 47. Farm Product Management

Administrators must be able to:

- create products;
- edit products;
- upload images;
- set category;
- set unit;
- set price;
- set available quantity;
- set availability;
- increase/decrease stock;
- mark a product unavailable.

---

# 48. Business Rules

The following rules are mandatory for MVP:

1. A Kircha reservation requires a successful deposit.
2. Kircha deposits are non-refundable.
3. Deposit amounts are configured by the administrator per full Kircha.
4. Fractional deposits are calculated proportionally.
5. Minimum Kircha purchase is ¼.
6. Purchases are made in quarter-Kircha increments.
7. Customers may purchase multiple Kircha.
8. Customers may purchase the entire remaining Kircha.
9. A successful deposit immediately reduces available Kircha inventory.
10. Customers cannot reserve more Kircha than is available.
11. Remaining balances must be paid before pickup.
12. Customers may pay their balance earlier than the slaughter date.
13. Slaughter may proceed even if the cattle is not fully reserved.
14. Unsold portions may be sold separately.
15. Meat portions are treated as equal for purposes of the application.
16. The application does not assign specific physical meat portions.
17. Pickup is from the business location only.
18. Missing the pickup window does not automatically cancel a fully paid order.
19. Unpaid reservations are not automatically cancelled when the pickup window closes.
20. Administrators retain control over exceptional cases.
21. Kircha and shop purchases have separate checkout flows.
22. Shop products require full payment.
23. SMS is the primary transactional notification channel.
24. Telegram is the secondary transactional notification channel.
25. Customer phone numbers are required for purchasing.

---

# 49. Inventory Concurrency

The system must protect against two customers purchasing the same final Kircha quantity simultaneously.

Example:

If only:

**½ Kircha**

remains, two customers must not both successfully reserve **½ Kircha**.

Availability must be checked and locked appropriately during the payment/reservation process.

The detailed locking strategy belongs in the LLD, but preventing overselling is a product requirement.

---

# 50. Incomplete Payment Attempts

Beginning Chapa checkout must not permanently reserve Kircha indefinitely.

The system should support a temporary payment/reservation state while a customer completes the deposit.

If payment fails or the checkout expires according to the eventual technical policy, that quantity should become available again.

The exact reservation timeout should be defined during technical design based on Chapa behavior and the desired customer experience.

---

# 51. Media Requirements

Each cattle listing should support multiple photos and short videos.

The experience should be optimized for mobile networks.

The application should avoid forcing users to download unnecessarily large video files before interacting with a listing.

Media performance and compression requirements should be defined in technical design.

---

# 52. Location

The MVP launches in:

**Ambo, Ethiopia**

The business operates a predefined pickup location.

The product should be architected so additional pickup locations can be supported later, but multi-location support is not required for MVP.

---

# 53. User Experience Principles

## Kircha First

Kircha must be the strongest element of the product identity.

## Actual Cattle, Not Stock Imagery

Trust should be created through real photos and videos.

## Make Money Status Obvious

Customers should never have to calculate:

- total;
- deposit;
- amount paid;
- remaining balance.

The system should clearly show these amounts.

## Make Availability Obvious

Customers should always understand how much Kircha remains.

## Keep Cultural Processes Physical Where Appropriate

The system does not need to automate meat selection or portion assignment simply because it can.

## Keep Checkout Simple

Kircha reservation and ordinary shop checkout should remain separate.

## Operational Simplicity

The admin interface should help staff answer:

- What is selling?
- What is being slaughtered next?
- Who owes money?
- What is ready?
- Who has not picked up?

---

# 54. Functional Requirements Summary

## Customer

The customer must be able to:

- open the application from Telegram;
- create/complete a customer profile;
- provide a phone number;
- browse available Kircha;
- view cattle photos and videos;
- view cattle details;
- see available Kircha;
- select Kircha quantity;
- see calculated pricing;
- pay deposit through Chapa;
- see reservation status;
- pay remaining balance;
- see slaughter information;
- see pickup information;
- browse farm products;
- add farm products to cart;
- pay for shop orders through Chapa;
- see order history;
- receive SMS notifications;
- receive Telegram notifications.

## Administrator

The administrator must be able to:

- manage cattle;
- manage cattle media;
- manage Kircha listings;
- control prices;
- configure deposits;
- see reservations;
- see remaining inventory;
- schedule slaughter;
- configure pickup windows;
- manage payments;
- identify unpaid customers;
- manage pickup;
- manage farm products;
- manage farm inventory;
- manage shop orders;
- view customers;
- trigger/resend relevant notifications.

---

# 55. Non-Functional Requirements

## Mobile First

The Telegram Mini App must be designed primarily for smartphones.

## Performance

Core catalog pages should remain usable on typical Ethiopian mobile-network conditions.

## Reliability

Successful payment records and reservations must not be lost.

## Transaction Integrity

Kircha inventory and payment confirmation must remain consistent.

## Security

Sensitive operations and administrative functions must require proper authorization.

## Payment Security

Payment credentials and sensitive gateway operations must remain server-side where required.

## Media Efficiency

Photos and videos should be delivered efficiently.

## Usability

Core purchasing flows should require minimal technical knowledge.

## Auditability

Important administrative actions, payment changes, and reservation changes should be traceable.

## Localization Readiness

The product should be structured so additional languages, particularly Amharic and Afaan Oromo, can be supported even if the initial release uses a smaller language set.

---

# 56. Conceptual Data Entities

The PRD does not prescribe a database schema, but the product will likely require concepts including:

### Customer

Customer identity and contact information.

### Cattle

The physical animal and its information/media.

### Kircha Listing

Commercial offering associated with cattle.

### Kircha Reservation

A customer's ownership/reservation of Kircha quantity.

### Payment

Individual financial transaction.

### Slaughter Event

Date/time/location associated with a Kircha.

### Pickup

Collection information and status.

### Product

Normal farm product.

### Inventory

Available quantity of a farm product.

### Shop Order

Normal farm-product purchase.

### Shop Order Item

Individual product and quantity within an order.

### Notification

Transactional communication record.

These entities should be refined into an actual data model during system design/LLD.

---

# 57. Suggested MVP Screen Inventory

## Telegram Mini App

### General

1. Launch/Loading
2. First-Time Profile Setup
3. Home
4. Notifications/Status area if required
5. Profile

### Kircha

6. Kircha Listings
7. Kircha Detail
8. Kircha Quantity Selection
9. Reservation Review
10. Deposit Payment Initiation
11. Payment Result
12. My Kircha
13. Kircha Order Detail
14. Remaining Balance Payment
15. Slaughter/Pickup Information

### Shop

16. Shop
17. Product Category/List
18. Product Detail
19. Cart
20. Checkout
21. Payment Result
22. Shop Orders
23. Shop Order Detail

---

# 58. Suggested Admin Screens

1. Login
2. Dashboard
3. Cattle List
4. Add/Edit Cattle
5. Cattle Detail
6. Kircha Listings
7. Create/Edit Kircha
8. Kircha Detail
9. Reservation List
10. Reservation Detail
11. Slaughter Management
12. Pickup Management
13. Payments
14. Customers
15. Customer Detail
16. Products
17. Add/Edit Product
18. Inventory
19. Shop Orders
20. Shop Order Detail
21. Notification/Communication Actions
22. Business Settings

This is an indicative screen inventory rather than a mandatory one-screen-per-item implementation.

---

# 59. Success Metrics

Initial product success should be evaluated through business metrics rather than vanity metrics.

Potential measures include:

- number of cattle listed;
- Kircha reserved per cattle;
- percentage of cattle value reserved through Digital Kircha;
- number of Kircha customers;
- repeat Kircha customers;
- average Kircha quantity per reservation;
- deposit payment success rate;
- outstanding balance rate;
- percentage of customers paying before pickup;
- average time to sell Kircha;
- number of shop customers;
- repeat shop purchase rate;
- completed pickups;
- abandoned payment attempts.

No specific numerical targets are required before initial operating data exists.

---

# 60. MVP Acceptance Criteria

The MVP is considered product-functionally ready when the following complete scenario can be performed:

### Kircha Scenario

1. Administrator creates cattle.
2. Administrator uploads cattle photos/video.
3. Administrator creates a Kircha listing.
4. Administrator sets cattle sale value.
5. Administrator sets total Kircha quantity.
6. System calculates price per Kircha.
7. Administrator sets deposit per Kircha.
8. Administrator publishes listing.
9. Customer opens Telegram Mini App.
10. Customer sees listing.
11. Customer reviews actual cattle media.
12. Customer selects ¼, ½, 1, or multiple Kircha.
13. System calculates total, deposit, and balance.
14. Customer sees that deposit is non-refundable.
15. Customer pays through Chapa.
16. System verifies payment.
17. Reservation is created.
18. Available Kircha decreases correctly.
19. Customer receives SMS confirmation.
20. Customer receives Telegram confirmation.
21. Administrator schedules slaughter.
22. Customer receives slaughter details.
23. Customer can view outstanding balance.
24. Customer completes balance payment through Chapa.
25. System verifies full payment.
26. Administrator marks Kircha ready for pickup.
27. Customer receives pickup notification.
28. Staff sees that customer is fully paid.
29. Staff marks portion collected.
30. Reservation becomes completed.

### Shop Scenario

1. Administrator creates a farm product.
2. Administrator sets price and stock.
3. Customer sees product.
4. Customer adds product to cart.
5. Customer checks out separately from Kircha.
6. Customer pays full amount through Chapa.
7. System verifies payment.
8. Inventory updates.
9. Order appears in administration.
10. Customer receives confirmation.
11. Administrator marks order ready.
12. Customer receives pickup notification.
13. Staff marks order collected.

---

# 61. Future Opportunities

Once the MVP and business model are validated, future versions may consider:

### Commerce

- delivery;
- recurring farm-product subscriptions;
- bundles;
- promotions;
- loyalty;
- referrals.

### Kircha

- advance upcoming-cattle announcements;
- customer waitlists;
- richer cattle traceability;
- veterinary certificates;
- historical cattle information;
- digital weighing records;
- optional slaughter livestream/media updates.

### Operations

- multiple farm/pickup locations;
- employee roles;
- advanced reporting;
- automated customer follow-up;
- SMS delivery analytics.

### Marketplace

Potentially much later:

- third-party cattle breeders;
- farms;
- sellers;
- vendor onboarding;
- commissions;
- settlements.

Multi-vendor functionality should not be introduced until the single-business model has been validated.

---

# 62. Open Implementation Decisions

The following do not block the PRD and should be decided during product design or technical design:

1. SMS service provider.
2. Exact SMS message templates.
3. Exact Telegram bot message templates.
4. Chapa payment-session expiration behavior.
5. Temporary Kircha inventory-lock duration while payment is underway.
6. Exact media size/compression rules.
7. Backend technology.
8. Database technology.
9. Hosting infrastructure.
10. Exact admin authorization roles.
11. Initial application language(s).
12. Exact customer support workflow.

---

# 63. MVP Product Definition

**Digital Kircha V1 is a Telegram-first direct farm commerce platform centered around purchasing fractional portions of real cattle.**

Customers can inspect the actual cattle, reserve any available quarter-Kircha increment by paying a non-refundable Chapa deposit, receive SMS and Telegram updates about slaughter and pickup, complete their remaining payment, and collect their portion from the business in Ambo.

A secondary farm shop allows the same customers to purchase eggs, yogurt, milk, chicken, and other products through a separate full-payment and pickup flow.

The administrative web application gives the business control over cattle, Kircha inventory, reservations, payments, slaughter schedules, customers, farm products, shop inventory, orders, notifications, and pickups.

The central product promise is:

> **See the cattle. Choose your Kircha. Reserve it digitally. Follow the process. Pick up your share.**