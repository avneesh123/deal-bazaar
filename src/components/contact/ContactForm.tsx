"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { getWhatsAppUrl, WHATSAPP_NUMBER } from "@/lib/utils";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage: ${form.message}`;
    window.open(
      getWhatsAppUrl(WHATSAPP_NUMBER).replace(
        /text=[^&]*/,
        `text=${encodeURIComponent(text)}`
      ),
      "_blank"
    );
  };

  const inputClass =
    "w-full bg-dark-card border border-dark-border rounded-sm px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-text-secondary text-sm mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          placeholder="Your name"
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-text-secondary text-sm mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="your@email.com"
          className={inputClass}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-text-secondary text-sm mb-2">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="+1 (555) 000-0000"
          className={inputClass}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-text-secondary text-sm mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tell us what you're looking for..."
          className={`${inputClass} resize-none`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <Button type="submit" variant="primary" className="w-full">
        Send via WhatsApp
      </Button>
    </form>
  );
}
