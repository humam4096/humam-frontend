'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import { ContactFormResponse } from '@/types/contact';
import styles from './Contact.module.css';

// Industries we serve
const INDUSTRIES = [
  'restaurants',      // Restaurants
  'bakeries',    // Bakeries
  'factories',   // Food Manufacturing
  'hotels',     // Hotels & Hospitality
  'hajj',      // Hajj & Umrah Services
  'healthy'    // Healthcare & Wellness
] as const;

// Services we offer
const SERVICES = [
  'consultancy', // Business Development & Consultancy
  'quality',     // Quality Systems & Certifications
  'training'     // Training Programs
] as const;

export default function Contact() {
  const t = useTranslations('ContactPage');
  
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    company: '',
    message: '',
    industry: '',
    service: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev: Record<string, string>) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitMessage(null);
    
    // Validate with Zod
    const result = formData;
  
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post<ContactFormResponse>('/api/contact', result.data);
      console.log(response)
      
      if (response.data.success) {
        setSubmitMessage({ type: 'success', text: response.data.message || 'Thank you! We will contact you soon.' });
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
          industry: '',
          service: '',
        });
      } else {
        setSubmitMessage({ type: 'error', text: response.data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        setSubmitMessage({ type: 'error', text: error.response.data.error });
      } else {
        setSubmitMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        
        {/* Left Column: Content */}
        <div className={styles.contentCol}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.description}>{t('description')}</p>
          <div className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoLabel}>{t('info.emailLabel')}</h3>
              <a href={`mailto:${t('info.email')}`} className={styles.infoLink}>{t('info.email')}</a>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoLabel}>{t('info.locationLabel')}</h3>
              <p className={styles.infoText}>{t('info.location')}</p>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <p className={styles.quote}>"{t('testimonial.quote')}"</p>
            <p className={styles.author}>{t('testimonial.role')} - {t('testimonial.company')}</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className={styles.formCol}>
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>{t('form.heading')}</h2>
            
            {submitMessage && (
              <div className={`${styles.message} ${styles[submitMessage.type]}`}>
                {submitMessage.text}
              </div>
            )}
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  {t('form.name')} <span className={styles.required}>*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.name ? styles.error : ''}`}
                  placeholder={t('form.namePlaceholder')}
                  disabled={isSubmitting}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  {t('form.email')} <span className={styles.required}>*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  placeholder={t('form.emailPlaceholder')}
                  disabled={isSubmitting}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="company" className={styles.label}>{t('form.company')}</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.company ? styles.error : ''}`}
                  placeholder={t('form.companyPlaceholder')}
                  disabled={isSubmitting}
                />
                {errors.company && <span className={styles.errorText}>{errors.company}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="industry" className={styles.label}>{t('form.industry')}</label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.industry ? styles.error : ''}`}
                  disabled={isSubmitting}
                >
                  <option value="">{t('form.industryOptions.select')}</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {t(`form.industryOptions.${industry}`)}
                    </option>
                  ))}
                </select>
                {errors.industry && <span className={styles.errorText}>{errors.industry}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="service" className={styles.label}>{t('form.service')}</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.service ? styles.error : ''}`}
                  disabled={isSubmitting}
                >
                  <option value="">{t('form.serviceOptions.select')}</option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {t(`form.serviceOptions.${service}`)}
                    </option>
                  ))}
                </select>
                {errors.service && <span className={styles.errorText}>{errors.service}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>
                  {t('form.message')} <span className={styles.required}>*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                  placeholder={t('form.messagePlaceholder')} 
                  rows={4}
                  disabled={isSubmitting}
                ></textarea>
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
