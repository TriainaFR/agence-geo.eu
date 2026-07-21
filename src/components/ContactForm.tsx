"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

// Identifiants EmailJS — la Public Key est conçue pour être exposée côté client.
const SERVICE_ID = "service_w7bdow2";
const TEMPLATE_ID = "template_4n5km5l";
const PUBLIC_KEY = "E7cFvIw50eYZ8er2v";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot : les bots remplissent ce champ invisible, pas les humains.
    if (data.get("website")) return;

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("sending");
    try {
      // Les deux conventions de nommage EmailJS sont couvertes ; les
      // variables absentes du template sont simplement ignorées.
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name,
          email,
          subject,
          message,
          from_name: name,
          from_email: email,
          reply_to: email,
          title: subject,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="mx-auto max-w-xl border border-accent/40 bg-accent-soft px-6 py-10 text-center"
      >
        <p className="font-display text-2xl font-medium italic tracking-tight text-accent">
          Message envoyé
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Merci pour votre message — nous revenons vers vous rapidement.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-sweep mt-6 text-xs font-medium uppercase tracking-[0.2em] text-accent"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl text-left">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted"
          >
            Nom
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Votre nom"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted"
          >
            E-mail
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.fr"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="contact-subject"
          className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted"
        >
          Sujet
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          placeholder="Signaler une erreur, proposer un sujet…"
          className={inputClass}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="contact-message"
          className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Votre message…"
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Honeypot anti-spam, invisible pour les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Ne pas remplir</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
          L&apos;envoi a échoué. Merci de réessayer dans un instant.
        </p>
      )}

      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-3 border border-foreground bg-foreground px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-background transition-colors duration-300 hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-foreground disabled:hover:text-background"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
        </button>
      </div>
    </form>
  );
}
