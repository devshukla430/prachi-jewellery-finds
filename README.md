# Prachi Jewellery Finds

An aesthetic, high-performance web application and affiliate curation storefront for Amazon jewellery finds. Built with Next.js App Router, React, TypeScript, and Tailwind CSS. The platform features automated subscriber email alerts, administrative inventory management, Google OAuth 2.0 authentication, Flipkart-style faceted search and filtering, and comprehensive legal and affiliate compliance modules.

---

## Table of Contents

1. Project Overview
2. Technology Stack
3. Core Features
4. System Architecture and API Endpoints
5. Environment Variables
6. Local Setup and Installation
7. Deployment Guide (GitHub and Vercel)
8. Legal, Compliance, and Intellectual Property

---

## 1. Project Overview

Prachi Jewellery Finds serves as a digital destination for discovering handpicked fashion, anti-tarnish, and fine jewellery available on Amazon. The application features an administrative CMS portal allowing the store owner to add products, track outbound affiliate clicks, configure social media profiles, manage subscribers, and broadcast automated launch notifications to buyers with zero third-party subscription fees.

---

## 2. Technology Stack

### Frontend Architecture
* Framework: Next.js (App Router, Server and Client Components)
* UI Library: React
* Language: TypeScript
* Styling: Tailwind CSS
* Iconography: Lucide React
* Responsive Design: Fluid layouts supporting Mobile Portrait, Mobile Landscape, Tablets, and Desktop viewports

### Backend and Serverless Services
* Runtime: Node.js (Next.js Serverless Route Handlers)
* Email Transport Engine: Nodemailer configured with Google Gmail SMTP
* Authentication: Google Cloud Identity Platform (OAuth 2.0 Web Client)
* Client Storage and State: React Context API with persistent browser storage synchronization
* Database Readiness: Architected for seamless pairing with Supabase (PostgreSQL)

---

## 3. Core Features

### Storefront Experience
* Category Slide Carousel: Touch-enabled, momentum-scrolling carousel with chevron navigation controls, designed specifically to eliminate clipping in phone landscape orientation.
* Dynamic Search and Faceted Filtering: Search by keyword, category, price tier (Under 99, 499, 999), brand, material, and rating.
* Flipkart-Style Sorting: Sort by relevance, popularity, price low-to-high, price high-to-low, newest arrivals, and customer ratings.
* Saved Wishlist Drawer: Local client-side bookmarking of favorite jewellery finds without requiring registration.
* Automated Email Subscription: Instant welcome confirmation email dispatched upon newsletter signup.

### Administrator Portal (/admin)
* Multi-Factor Administrative Gateway: Protected by owner passcode and 3-step Google Gmail OTP recovery.
* Product Catalogue Management: Add, edit, bulk import (JSON), and export (CSV/JSON) jewellery items.
* Outbound Link Tracking: Real-time logging of visitor clicks, referral sources (Instagram, Pinterest, Organic), and Amazon Associate tag attribution.
* Subscriber Notification Broadcaster: Automatically dispatches rich HTML email alerts to all subscribers when a new jewellery product is published.
* Configurable Settings: Dynamic updating of Amazon Associates tracking tags, owner display names, social profile URLs, and Google OAuth credentials.

---

## 4. System Architecture and API Endpoints

### API Route Specifications

1. POST /api/auth/send-otp
   Dispatches a cryptographically generated 6-digit verification code to the registered owner email address via Gmail SMTP for administrator passcode recovery.

2. POST /api/auth/google
   Exchanges authorization codes and validates Google OAuth 2.0 user credentials directly with Google Cloud servers.

3. POST /api/newsletter/subscribe
   Saves subscriber email addresses and dispatches an immediate welcome confirmation email through Google Gmail SMTP.

4. POST /api/newsletter/notify-new-product
   Accepts product metadata (title, price, MRP, discount, image, and Amazon link) and broadcasts an alert to active subscribers using blind carbon copy (BCC).

5. POST /api/contact
   Receives visitor messages, inquiries, and styling questions, forwarding them directly to the administrator email address.

---

## 5. Environment Variables

Create a file named `.env.local` in the project root directory and define the following variables:

```env
# Google Cloud OAuth 2.0 Credentials (Free Tier)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Automated Email Delivery (Google Gmail SMTP - Free Tier)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_16_character_google_app_password
```

---

## 6. Local Setup and Installation

### Prerequisites
* Node.js (version 18.17.0 or higher recommended)
* npm, yarn, or pnpm

### Installation Steps

1. Clone or extract the project directory:
   ```bash
   cd "Antigravity IDE"
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Access the application:
   * Storefront: http://localhost:3000
   * Administrative Portal: http://localhost:3000/admin

---

## 7. Deployment Guide

### Version Control (GitHub)
Ensure all sensitive files (.env, .env.local, node_modules) are excluded by .gitignore prior to committing source files to remote repositories.

### Production Hosting (Vercel)
The application is pre-configured for deployment on Vercel:
1. Connect the GitHub repository to Vercel.
2. Configure the project environment variables in the Vercel dashboard under Project Settings > Environment Variables.
3. Deploy the production branch.

---

## 8. Legal, Compliance, and Intellectual Property

### Amazon Associates Compliance
Prachi Jewellery Finds operates in compliance with the Amazon Associates Program Operating Agreement and FTC affiliate disclosure guidelines. All outbound product recommendations include clear attribution.

### Copyright Notice
All Rights Reserved. The brand name "Prachi Jewellery Finds", logo assets, curated listings, editorial content, and web interface are the intellectual property of Prachi Shukla. Unauthorized reproduction, scraping, or commercial exploitation is strictly prohibited.
