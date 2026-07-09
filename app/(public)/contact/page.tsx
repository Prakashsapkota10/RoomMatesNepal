import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildMeta } from "@/lib/metadata";

export const metadata: Metadata = buildMeta({
  title: "Contact Us",
  description: "Get in touch with the RoomMate Nepal team. We're here to help.",
});

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@roommatenepal.com",
    href: "mailto:hello@roommatenepal.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977 9801-234567",
    href: "tel:+9779801234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Thamel, Kathmandu, Nepal",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Sun–Fri, 9AM–6PM NPT",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 lg:py-24 page-enter">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Get In Touch</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a question, suggestion, or issue? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <Card className="modal-enter">
            <CardContent className="p-6 lg:p-8">
              <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
              {/* 
                NOTE: This is a Server Component page. The form action should 
                point to a Server Action or API route for processing.
                Replace action="#" with your Server Action when ready.
              */}
              <form action="#" className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ram Shrestha"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="ram@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your question or issue..."
                    className="min-h-32 resize-none"
                    required
                  />
                </div>
                <Button type="submit" className="btn-primary-motion w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
              <p className="text-sm text-muted-foreground">
                Reach us directly or through any of the channels below.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="card-dashboard flex items-start gap-3 p-4 rounded-xl border bg-card">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium hover:text-primary transition-colors"
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Help Center CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-1">Looking for quick answers?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Browse our Help Center for guides, tutorials, and FAQs.
                </p>
                <a href="/help">
                  <Button variant="outline" size="sm" className="btn-secondary-motion">
                    Visit Help Center
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
