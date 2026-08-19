# API Reference

## Base URL

- **Production:** `https://humam.sa`
- **Development:** `http://localhost:3000`

## Authentication

Currently, no authentication is required for public endpoints.

Future admin endpoints will require authentication (planned).

---

## Endpoints

### POST /api/contact

Submit a contact form inquiry.

#### Request

**URL:** `/api/contact`  
**Method:** `POST`  
**Content-Type:** `application/json`

**Body Parameters:**

| Parameter  | Type   | Required | Validation                                    | Description                          |
|------------|--------|----------|-----------------------------------------------|--------------------------------------|
| `name`     | string | Yes      | Min 2 characters                              | Contact person's name                |
| `email`    | string | Yes      | Valid email format (`^\S+@\S+\.\S+$`)         | Contact email address                |
| `message`  | string | Yes      | Min 5 characters                              | Message content                      |
| `company`  | string | No       | Any string or null                            | Company name                         |
| `industry` | string | No       | One of: `restaurants`, `bakeries`, `factories`, `hotels`, `hajj`, `healthy` | Industry type |
| `service`  | string | No       | One of: `consultancy`, `quality`, `training`  | Service interested in                |

#### Examples

**Minimal Request:**

```bash
curl -X POST https://humam.sa/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "message": "I would like to know more about your services"
  }'
```

**Full Request:**

```bash
curl -X POST https://humam.sa/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "company": "Al-Noor Restaurant",
    "industry": "restaurants",
    "service": "consultancy",
    "message": "We need HACCP certification assistance for our restaurant chain"
  }'
```

**JavaScript/TypeScript:**

```typescript
const response = await fetch('https://humam.sa/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    company: 'Al-Noor Restaurant',
    industry: 'restaurants',
    service: 'consultancy',
    message: 'We need HACCP certification assistance'
  })
});

const data = await response.json();

if (response.ok) {
  console.log('Success:', data);
} else {
  console.error('Error:', data.error);
}
```

**React Example:**

```tsx
import { useState } from 'react';

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      company: formData.get('company') as string,
      industry: formData.get('industry') as string,
      service: formData.get('service') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

#### Responses

**Success Response (201 Created):**

```json
{
  "success": true
}
```

**Error Response (400 Bad Request):**

```json
{
  "error": "Invalid input"
}
```

Returned when validation fails:
- Missing required fields
- Invalid email format
- Name too short (< 2 chars)
- Message too short (< 5 chars)
- Invalid industry value
- Invalid service value

**Error Response (500 Internal Server Error):**

```json
{
  "error": "Database error message"
}
```

Returned when server encounters an error (rare).

#### Response Headers

```
Content-Type: application/json
```

#### Status Codes

| Code | Description                                    |
|------|------------------------------------------------|
| 201  | Created - Contact form submitted successfully  |
| 400  | Bad Request - Validation error                 |
| 500  | Internal Server Error - Server error           |

---

## Data Types

### Industry Enum

Valid values for the `industry` field:

```typescript
type Industry = 
  | 'restaurants'
  | 'bakeries'
  | 'factories'
  | 'hotels'
  | 'hajj'
  | 'healthy';
```

**English Labels:**
- `restaurants` - Restaurants
- `bakeries` - Bakeries & Pastries
- `factories` - Food Factories
- `hotels` - Hotels & Hospitality
- `hajj` - Hajj & Umrah Services
- `healthy` - Healthy Food Services

**Arabic Labels (العربية):**
- `restaurants` - المطاعم
- `bakeries` - المخابز والحلويات
- `factories` - المصانع الغذائية
- `hotels` - الفنادق والضيافة
- `hajj` - خدمات الحج والعمرة
- `healthy` - خدمات الغذاء الصحي

### Service Enum

Valid values for the `service` field:

```typescript
type Service =
  | 'consultancy'
  | 'quality'
  | 'training';
```

**English Labels:**
- `consultancy` - Consultancy Services
- `quality` - Quality Assurance
- `training` - Training Programs

**Arabic Labels (العربية):**
- `consultancy` - الاستشارات
- `quality` - ضمان الجودة
- `training` - البرامج التدريبية

---

## Error Handling

### Client-Side Validation

Before making API requests, implement client-side validation:

```typescript
function validateForm(data: {
  name: string;
  email: string;
  message: string;
  company?: string;
  industry?: string;
  service?: string;
}): string | null {
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }

  // Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return 'Please enter a valid email address';
  }

  // Message validation
  if (!data.message || data.message.trim().length < 5) {
    return 'Message must be at least 5 characters';
  }

  // Industry validation (if provided)
  const validIndustries = ['restaurants', 'bakeries', 'factories', 'hotels', 'hajj', 'healthy'];
  if (data.industry && !validIndustries.includes(data.industry)) {
    return 'Invalid industry selected';
  }

  // Service validation (if provided)
  const validServices = ['consultancy', 'quality', 'training'];
  if (data.service && !validServices.includes(data.service)) {
    return 'Invalid service selected';
  }

  return null; // No errors
}
```

### Error Response Handling

```typescript
try {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle validation error
    if (response.status === 400) {
      alert('Please check your input and try again');
    }
    // Handle server error
    else if (response.status === 500) {
      alert('Server error. Please try again later');
    }
    return;
  }

  // Success
  alert('Thank you! We will contact you soon.');
  
} catch (error) {
  // Handle network error
  console.error('Network error:', error);
  alert('Network error. Please check your connection and try again');
}
```

---

## Rate Limiting

Currently, there are no rate limits enforced at the application level.

Cloudflare's built-in DDoS protection provides automatic rate limiting for abusive traffic.

**Recommended best practices:**
- Implement client-side form submission throttling
- Add CAPTCHA for production (Cloudflare Turnstile)
- Disable submit button during API call

```typescript
// Example: Prevent double submissions
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  if (isSubmitting) return; // Prevent double submission
  
  setIsSubmitting(true);
  try {
    // Make API call
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## CORS

Cross-Origin Resource Sharing (CORS) is enabled for all origins.

**Allowed Methods:**
- `GET`
- `POST`
- `OPTIONS`

**Allowed Headers:**
- `Content-Type`
- `Authorization` (for future use)

---

## Versioning

Currently, the API does not use versioning.

Future breaking changes will be introduced via versioned endpoints:
- `/api/v1/contact`
- `/api/v2/contact`

The current `/api/contact` endpoint will remain backwards compatible.

---

## Testing

### Test Contact Submission

**Development:**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

**Production:**

```bash
curl -X POST https://humam.sa/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Expected Responses

**Valid submission:**
```json
{"success":true}
```
Status: `201`

**Invalid submission (missing name):**
```json
{"error":"Invalid input"}
```
Status: `400`

---

## TypeScript Types

For TypeScript projects, use these types:

```typescript
// Request payload
interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
  company?: string;
  industry?: 'restaurants' | 'bakeries' | 'factories' | 'hotels' | 'hajj' | 'healthy';
  service?: 'consultancy' | 'quality' | 'training';
}

// Success response
interface ContactSuccessResponse {
  success: true;
}

// Error response
interface ContactErrorResponse {
  error: string;
}

// Combined response type
type ContactResponse = ContactSuccessResponse | ContactErrorResponse;

// Usage
const submitContact = async (data: ContactFormRequest): Promise<ContactResponse> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  return response.json();
};
```

---

## Postman Collection

### Import to Postman

```json
{
  "info": {
    "name": "Humam API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Submit Contact Form",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Ahmed Ali\",\n  \"email\": \"ahmed@example.com\",\n  \"company\": \"Al-Noor Restaurant\",\n  \"industry\": \"restaurants\",\n  \"service\": \"consultancy\",\n  \"message\": \"We need HACCP certification assistance\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/contact",
          "host": ["{{baseUrl}}"],
          "path": ["api", "contact"]
        }
      },
      "response": []
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://humam.sa"
    }
  ]
}
```

---

## Webhooks

Currently not supported. Planned for future versions.

---

## Changelog

### Current Version (v1.0)

**Released:** August 2026

**Endpoints:**
- `POST /api/contact` - Contact form submission

**Features:**
- Input validation
- Industry and service enums
- Bilingual support (EN/AR)
- Cloudflare D1 storage

### Planned (v1.1)

- Rate limiting
- Email notifications
- CAPTCHA integration
- Response time improvements

---

## Support

For API issues or questions:

1. Check the [Backend Documentation](./BACKEND.md)
2. Check the [Troubleshooting Guide](./BACKEND.md#troubleshooting)
3. Contact the development team

---

**Last Updated:** August 19, 2026  
**API Version:** 1.0
