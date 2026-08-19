// lib/validation.ts

const VALID_INDUSTRIES = [
  'restaurants',
  'bakeries',
  'factories',
  'hotels',
  'hajj',
  'healthy',
] as const;

const VALID_SERVICES = [
  'consultancy',
  'quality',
  'training',
] as const;

type Industry = typeof VALID_INDUSTRIES[number];
type Service = typeof VALID_SERVICES[number];

export interface ValidatedContactInput {
  name: string;
  email: string;
  company: string | null;
  industry: Industry | null;
  service: Service | null;
  message: string;
}

export function validateContactInput(data: unknown): ValidatedContactInput | null {
  if (typeof data !== "object" || data === null) return null;
  const { name, email, company, industry, service, message } = data as Record<string, unknown>;

  // Required fields
  if (typeof name !== "string" || name.trim().length < 2) return null;
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) return null;
  if (typeof message !== "string" || message.trim().length < 5) return null;

  // Optional: company (string if provided)
  let validatedCompany: string | null = null;
  if (company !== undefined && company !== null && company !== '') {
    if (typeof company !== "string") return null;
    validatedCompany = company.trim() || null;
  }

  // Optional: industry (must be a valid value if provided)
  let validatedIndustry: Industry | null = null;
  if (industry !== undefined && industry !== null && industry !== '') {
    if (typeof industry !== "string") return null;
    if (!(VALID_INDUSTRIES as readonly string[]).includes(industry)) return null;
    validatedIndustry = industry as Industry;
  }

  // Optional: service (must be a valid value if provided)
  let validatedService: Service | null = null;
  if (service !== undefined && service !== null && service !== '') {
    if (typeof service !== "string") return null;
    if (!(VALID_SERVICES as readonly string[]).includes(service)) return null;
    validatedService = service as Service;
  }

  return {
    name: name.trim(),
    email: email.trim(),
    company: validatedCompany,
    industry: validatedIndustry,
    service: validatedService,
    message: message.trim(),
  };
}