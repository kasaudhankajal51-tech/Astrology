# DS Astro Requirement Match And Backend API Contract

Date: 2026-06-09

This document maps `projectrequirement.md` to the current frontend and lists the backend API/data contract needed to complete the system end to end.

## Requirement Match

| Requirement | Frontend status | Backend requirement |
| --- | --- | --- |
| Main navigation: Home, Live Courses, Recorded Courses, Consultations, Shop, Student Login, About/Contact | Aligned in header routes. Contact remains available from menu/footer. | No backend dependency. |
| Live courses listing | `/live-courses` filters courses where `courseType = Live`. Cards show course details and route to detail page. | `GET /api/courses` must return `courseType`, duration, instructor, price, thumbnail, description. |
| Live course detail | `/courses/:courseId` renders enquiry-only UI for `courseType = Live`. No coupon or payment CTA. | `GET /api/courses/:id` must return full live course details, curriculum/modules, batch details, FAQs if available. |
| Live enquiry form | Enquiry form captures name, phone, email, city, age, interest, notes. | `POST /api/leads` must store `leadType = LIVE COURSE LEAD`, `status = ENQUIRY RECEIVED`, `paymentStatus = NOT REQUIRED`. |
| Recorded courses listing | `/recorded-courses` filters recorded courses. Price is visible. | `GET /api/courses` must return recorded course price, modules count, level, duration. |
| Recorded course detail | Recorded paid courses show timer, coupon, price, and `Enroll Now`. | `GET /api/courses/:id` should include outcomes, modules, instructor, testimonials, price. |
| 5-hour offer timer | Integrated near recorded-course payment section. | No backend dependency unless timer must be server-controlled. |
| Coupon system | Coupon field appears only for recorded paid courses. | `POST /api/coupons/validate`; admin coupon CRUD already expected. |
| Recorded course payment | Frontend calls create order and verify endpoints. | Backend must create purchase/payment attempt, verify Razorpay, create student account, email credentials. |
| Failed recorded payment lead | Frontend reports Razorpay failure to `/api/leads/payment-failed`. | Backend must update the lead/order as `Recorded Course Lead - Failed Payment`. |
| Student login | `/login` supports login, forgot password, reset password. | Student auth endpoints required. |
| Student dashboard | `/dashboard` displays profile, purchased courses, validity, materials, banners, merchandise, launches, offers. Responsive layout implemented. | Student dashboard endpoints must return dynamic data, no hardcoded dashboard business content. |
| Secured video player | `/student/course/:id` uses authenticated endpoints, disables right-click, shows watermark grid, tracks progress. | Backend must use Bunny secure streaming URLs/tokens and enforce access/validity. |
| Free consultation CTA inside player | Text updated to `BOOK YOUR 1 FREE CONSULTATION` with required warning. | `POST /api/student/consultations` should store request. |
| Shop / merchandise | `/shop` is a Shopify handoff surface; category cards open Shopify collections. | `GET /api/settings` must include Shopify store URL. Shopify handles cart, inventory, delivery, checkout. |
| Consultation listing/detail | Listing and detail pages show service, duration, price, and payment CTA. | Consultation/service data can remain static or be moved to backend later. |
| Consultation payment | Frontend creates lead before Razorpay and verifies payment on success. No coupon UI. | `POST /api/leads` creates consultation lead/order. `POST /api/leads/verify-payment` marks paid and sends admin email. |
| Failed consultation payment | Frontend reports Razorpay failure to `/api/leads/payment-failed`. Lead already exists before payment opens. | Backend must mark `Consultation Lead - Not Paid` / `paymentStatus = FAILED`. |
| Universal lead capture | Frontend sends leads for course enquiry, consultation, contact/home enquiry, webinar/payment attempts, recorded payment attempts. | Backend must normalize statuses and preserve failed/abandoned attempts. |
| Admin leads | Admin leads page calls list, status update, delete APIs. | Backend must support filtering by type/status/payment status. |
| Admin courses | Admin courses page supports add/edit courses and video management. | Backend must support course CRUD and Bunny video upload/metadata/secure playback. |
| Admin coupons | Admin coupons page supports coupon CRUD. | Backend must implement discount rules and usage limits. |
| Admin banners/materials | Admin content manager expects banner/material endpoints. | Backend must expose banner and material CRUD. |
| Paid email notifications | Frontend triggers paid verification only. | Backend must email admin for recorded course purchases and paid consultation bookings. |

## Environment Variables Already Added

Backend `.env` should use:

```env
BUNNY_API_KEY=
BUNNY_LIBRARY_ID=
BUNNY_TOKEN_KEY=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
EMAIL_USER=
EMAIL_PASS=
NODE_ENV=
```

Recommended additional env vars:

```env
FRONTEND_URL=http://localhost:5173
EMAIL_FROM=DS Institute <no-reply@dsinstitute.com>
SHOPIFY_STORE_URL=https://your-store.myshopify.com
```

## API Response Shape

Use this common shape:

```json
{
  "success": true,
  "message": "Optional message",
  "data": {}
}
```

Existing frontend sometimes expects top-level fields such as `course`, `courses`, `leadId`, `orderId`, `keyId`, `amount`, and `currency`. Backend can either keep those top-level fields or include both top-level and `data` during migration.

## Public Course APIs

### `GET /api/courses`

Returns all active live and recorded courses.

```json
{
  "success": true,
  "courses": [
    {
      "_id": "course_id",
      "title": "Medical Astrology Mastery",
      "description": "Short course description",
      "thumbnailUrl": "https://...",
      "price": 7200,
      "courseType": "Live",
      "validityDays": 180,
      "level": "Beginner",
      "instructor": "Instructor name",
      "duration": "2 months",
      "modulesCount": 15,
      "isActive": true
    }
  ]
}
```

`courseType` must be exactly `Live` or `Recorded`.

### `GET /api/courses/:courseId`

```json
{
  "success": true,
  "course": {
    "_id": "course_id",
    "title": "Medical Astrology Mastery",
    "description": "Full description",
    "thumbnailUrl": "https://...",
    "price": 7200,
    "courseType": "Recorded",
    "validityDays": 180,
    "level": "Advanced",
    "instructor": {
      "name": "Instructor name",
      "bio": "Short bio",
      "image": "https://..."
    },
    "curriculum": [
      { "title": "Module 1", "lessons": ["Lesson 1", "Lesson 2"] }
    ],
    "learningOutcomes": ["Outcome 1", "Outcome 2"],
    "batchDetails": {
      "startDate": "2026-07-06",
      "classCount": 20,
      "classDuration": "1 hour",
      "platform": "Zoom"
    },
    "faqs": [
      { "question": "Question?", "answer": "Answer." }
    ],
    "testimonials": []
  }
}
```

## Lead APIs

### `POST /api/leads` - Universal Lead Create

Used by live course enquiries, consultation attempts, contact forms, webinar/course inquiry forms.

Live course enquiry payload:

```json
{
  "name": "Aniket Sharma",
  "phone": "9876543210",
  "email": "aniket@example.com",
  "type": "Course-Inquiry",
  "leadType": "LIVE COURSE LEAD",
  "status": "ENQUIRY RECEIVED",
  "paymentStatus": "NOT REQUIRED",
  "courseName": "Medical Astrology Mastery",
  "courseType": "Live",
  "dob": "28",
  "pob": "Delhi",
  "message": "Interest: Career astrology\nNotes: Please call after 6 PM"
}
```

Consultation paid attempt payload:

```json
{
  "name": "Aniket Sharma",
  "email": "aniket@example.com",
  "phone": "9876543210",
  "amount": 3600,
  "type": "Consultation",
  "consultationType": "Career Consultation",
  "dob": "1995-01-01",
  "tob": "10:30",
  "pob": "Delhi",
  "message": "Need career guidance"
}
```

For paid consultation attempts, response must include Razorpay order data:

```json
{
  "success": true,
  "leadId": "lead_id",
  "orderId": "order_razorpay_id",
  "keyId": "rzp_test_xxx",
  "amount": 360000,
  "currency": "INR",
  "name": "Aniket Sharma",
  "email": "aniket@example.com",
  "phone": "9876543210"
}
```

### `POST /api/leads/verify-payment`

Used for paid consultations and webinar-style leads.

```json
{
  "leadId": "lead_id",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_order_id": "order_xxx",
  "razorpay_signature": "signature"
}
```

Backend behavior:

- Verify Razorpay signature.
- Mark consultation lead as `Consultation Lead - Paid`.
- Set `paymentStatus = PAID`.
- Store transaction IDs.
- Send admin email for paid consultation.

### `POST /api/leads/payment-failed`

New endpoint required by frontend.

```json
{
  "leadId": "lead_id_optional",
  "orderId": "order_xxx",
  "courseId": "course_id_optional",
  "courseName": "Recorded Course Name",
  "consultationType": "Career Consultation",
  "paymentFor": "Recorded Course",
  "status": "Recorded Course Lead - Failed Payment",
  "paymentStatus": "FAILED",
  "failureReason": "Payment declined",
  "razorpayError": {
    "code": "BAD_REQUEST_ERROR",
    "description": "Payment failed",
    "source": "customer",
    "step": "payment_authentication",
    "reason": "payment_failed"
  }
}
```

Backend behavior:

- If `leadId` exists, update that lead.
- Else if `orderId` exists, find the lead/order by Razorpay order ID.
- Else create a minimal failed-payment lead if customer context exists.
- Do not send paid email.

## Recorded Course Payment APIs

### `POST /api/payment/create-order`

Headers:

```http
Authorization: Bearer <studentToken> optional
Content-Type: application/json
```

Payload:

```json
{
  "courseId": "course_id",
  "name": "Aniket Sharma",
  "email": "aniket@example.com",
  "mobile": "9876543210",
  "couponCode": "CREATOR20"
}
```

Response:

```json
{
  "success": true,
  "leadId": "lead_id",
  "purchaseId": "purchase_id",
  "orderId": "order_xxx",
  "keyId": "rzp_test_xxx",
  "amount": 720000,
  "currency": "INR",
  "name": "Aniket Sharma",
  "email": "aniket@example.com",
  "phone": "9876543210"
}
```

Backend behavior:

- Validate course exists and is `Recorded`.
- Apply coupon if valid.
- Create purchase/payment attempt with `paymentStatus = PENDING`.
- Create or update lead as `Recorded Course Lead - Payment Initiated`.
- Create Razorpay order.

### `POST /api/payment/verify`

```json
{
  "razorpay_payment_id": "pay_xxx",
  "razorpay_order_id": "order_xxx",
  "razorpay_signature": "signature",
  "email": "aniket@example.com",
  "name": "Aniket Sharma"
}
```

Backend behavior:

- Verify Razorpay signature.
- Mark purchase paid.
- Mark lead as `Recorded Course Lead - Paid`.
- Create student account if not exists.
- Generate username/password if this is a new student.
- Link purchased course to student with validity.
- Send student credentials by email.
- Send admin paid-purchase notification email.

## Coupon APIs

### `POST /api/coupons/validate`

```json
{
  "code": "CREATOR20",
  "courseId": "course_id",
  "purchaseAmount": 7200
}
```

```json
{
  "success": true,
  "coupon": {
    "code": "CREATOR20",
    "discountType": "percentage",
    "discountValue": 20,
    "discountAmount": 1440,
    "finalAmount": 5760
  }
}
```

Admin coupon endpoints already used by frontend:

- `GET /api/coupons`
- `POST /api/coupons`
- `PUT /api/coupons/:id`
- `DELETE /api/coupons/:id`

## Student APIs

### `POST /api/student/login`

```json
{
  "email": "aniket@example.com",
  "password": "generated-password"
}
```

```json
{
  "success": true,
  "token": "jwt",
  "student": {
    "_id": "student_id",
    "name": "Aniket Sharma",
    "email": "aniket@example.com",
    "mobile": "9876543210"
  }
}
```

### Dashboard endpoints

All require:

```http
Authorization: Bearer <studentToken>
```

- `GET /api/student/profile`
- `PUT /api/student/profile`
- `POST /api/student/logout`
- `GET /api/student/courses`
- `GET /api/student/banners`
- `GET /api/student/merchandise`
- `GET /api/student/new-courses`
- `GET /api/student/offers`

Example `GET /api/student/courses`:

```json
{
  "success": true,
  "courses": [
    {
      "_id": "course_id",
      "title": "Recorded Course",
      "thumbnailUrl": "https://...",
      "progress": 45,
      "validUntil": "2026-12-31",
      "totalVideos": 20,
      "completedVideos": 9
    }
  ]
}
```

### Course player endpoints

- `GET /api/student/course/:id`
- `GET /api/student/course/:id/videos`
- `GET /api/student/course/:id/validity`
- `GET /api/student/course/:id/materials`
- `POST /api/student/video/progress`
- `POST /api/student/consultations`

`GET /api/student/course/:id/videos` should return Bunny-secured playback URLs:

```json
{
  "success": true,
  "videos": [
    {
      "_id": "video_id",
      "title": "Lesson 1",
      "duration": 1800,
      "bunnyVideoId": "bunny_video_id",
      "playbackUrl": "https://iframe.mediadelivery.net/embed/library/video?token=secure_token",
      "expiresAt": "2026-06-09T12:30:00.000Z",
      "isCompleted": false,
      "progressSeconds": 120
    }
  ]
}
```

## Bunny Video/Admin Course APIs

Admin course endpoints used by frontend:

- `GET /api/courses`
- `POST /api/admin/courses`
- `PUT /api/admin/courses/:id`
- `DELETE /api/admin/courses/:id`
- `GET /api/admin/courses/:courseId/videos/:videoId/preview`
- `POST /api/admin/courses/:courseId/videos/upload`
- `PUT /api/admin/courses/:courseId/videos/:videoId`
- `DELETE /api/admin/courses/:courseId/videos/:videoId`

Recommended video model:

```json
{
  "_id": "video_id",
  "courseId": "course_id",
  "title": "Lesson 1",
  "description": "Intro",
  "sortOrder": 1,
  "bunnyVideoId": "bunny_video_id",
  "bunnyLibraryId": "library_id",
  "duration": 1800,
  "status": "ready"
}
```

Backend must use:

- `BUNNY_API_KEY` for admin upload/manage.
- `BUNNY_LIBRARY_ID` for library.
- `BUNNY_TOKEN_KEY` to generate signed playback URLs.

## Shopify Settings API

### `GET /api/settings`

```json
{
  "success": true,
  "settings": {
    "shopifyStoreUrl": "https://your-store.myshopify.com"
  }
}
```

### `PUT /api/settings`

Admin-only. Used to update Shopify URL and other site settings.

## Admin APIs

All admin endpoints require:

```http
Authorization: Bearer <adminToken>
```

### Auth

- `POST /api/auth/login`

Payload:

```json
{
  "email": "admin@example.com",
  "password": "password",
  "secret": "admin-secret"
}
```

### Dashboard

- `GET /api/admin/stats`

Should include:

```json
{
  "success": true,
  "stats": {
    "totalLeads": 120,
    "paidConsultations": 12,
    "recordedCoursePurchases": 20,
    "failedPayments": 5,
    "liveCourseEnquiries": 40
  }
}
```

### Leads

- `GET /api/leads?type=&status=&paymentStatus=&search=`
- `PUT /api/leads/:id/status`
- `DELETE /api/leads/:id`

Lead status values to support:

- `LIVE COURSE LEAD`
- `ENQUIRY RECEIVED`
- `Consultation Lead - Not Paid`
- `Consultation Lead - Paid`
- `Recorded Course Lead - Payment Initiated`
- `Recorded Course Lead - Paid`
- `Recorded Course Lead - Failed Payment`
- `Webinar Lead - Not Paid`
- `Webinar Lead - Paid`

### Content

- `GET /api/admin/banners`
- `POST /api/admin/banners`
- `PUT /api/admin/banners/:id`
- `DELETE /api/admin/banners/:id`
- `GET /api/admin/course-materials`
- `POST /api/admin/course-materials`
- `PUT /api/admin/course-materials/:id`
- `DELETE /api/admin/course-materials/:id`

## Email Notifications

Backend must send admin email only for paid actions:

1. Consultation booked and payment verified.
2. Recorded course purchased and payment verified.

Do not send instant email for normal live course enquiries unless the client later asks for it.

Recommended admin email content fields:

- Customer name
- Phone
- Email
- Product/service/course
- Amount
- Payment ID
- Order ID
- Timestamp

## Final Backend Priorities For Meeting

1. Confirm `courseType` values are exactly `Live` and `Recorded`.
2. Add or confirm `/api/leads/payment-failed`.
3. Ensure `POST /api/payment/create-order` returns `leadId` with `orderId`.
4. Ensure recorded-course payment verification creates/updates student login credentials and sends email.
5. Ensure Bunny playback URLs are signed and expire.
6. Ensure admin leads can filter by type/status/payment status.
7. Ensure `GET /api/settings` returns `shopifyStoreUrl`.
