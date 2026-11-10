import React, { useEffect, useState } from 'react';
import { X, Check, Clock, MapPin, ArrowUpRight, Activity, User, Sparkles } from 'lucide-react';

import HERO_IMAGE from './assets/images/hero_melanin_clinic_1794232425188.jpg';
import DERM_IMAGE from './assets/images/block_medical_dermatology_1794232425848.jpg';
import LASER_IMAGE from './assets/images/block_laser_therapy_1794232427747.jpg';
import BRIDAL_IMAGE from './assets/images/block_bridal_glow_1794232429367.jpg';
import LAB_IMAGE from './assets/images/skin_diagnostics_lab_1794232430073.jpg';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

function AnimatedHeading({ text, className = '', as: Tag = 'h2' }: AnimatedHeadingProps) {
  const words = text.trim().split(/\s+/);
  return (
    <Tag className={className} data-animate-heading="">
      {words.map((word, idx) => (
        <React.Fragment key={idx}>
          <span
            className="char"
            style={{ transitionDelay: `${idx * 0.12}s` }}
          >
            {word}
          </span>
          {idx < words.length - 1 && <span>&nbsp;</span>}
        </React.Fragment>
      ))}
    </Tag>
  );
}

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  duration: string;
  price: string;
  metrics: string[];
  image: string;
  alt: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'hyperpigmentation',
    number: '01',
    title: 'Hyperpigmentation & Melasma',
    shortDesc: 'Targeted protocols that clear stubborn dark spots and uneven tone without rebound pigmentation.',
    fullDesc:
      'Custom-compounded tranexamic acid, Kojic-azelaic melanogenesis inhibitors, and low-fluence 1064nm Nd:YAG laser toning specifically calibrated for Fitzpatrick IV–VI skin to clear post-inflammatory hyperpigmentation (PIH), sun spots, and hormonal melasma.',
    duration: '60 Min Clinical Session',
    price: '₦145,000',
    metrics: ['Zero-Bleaching Barrier Safety', 'Sub-Dermal Melanin Index Tracking', 'Custom Home Compounding'],
    image: DERM_IMAGE,
    alt: 'Hyperpigmentation and melasma dermatology session',
  },
  {
    id: 'melanin-laser',
    number: '02',
    title: 'Melanin-Safe Laser Therapy',
    shortDesc: '650-microsecond Nd:YAG & picosecond technology engineered for deep skin tones with zero thermal burn risk.',
    fullDesc:
      'Utilizing FDA-cleared Aerolase Neo and picosecond 1064nm wavelengths that bypass epidermal melanin to treat active acne, keloid-prone scarring, razor bumps (pseudofolliculitis barbae), and unwanted hair safely.',
    duration: '45 Min Laser Session',
    price: '₦180,000',
    metrics: ['650-Microsecond Pulse Precision', 'Fitzpatrick IV–VI Certified', 'Zero Downtime Recovery'],
    image: LASER_IMAGE,
    alt: 'Melanin-safe laser therapy in Lagos clinic',
  },
  {
    id: 'bridal-glow',
    number: '03',
    title: 'Bridal & Red-Carpet Glow',
    shortDesc: 'Bespoke multi-week cellular hydration, hydro-dermabrasion, and body polishing for unmistakable radiance.',
    fullDesc:
      'Our signature pre-event and bridal skin architecture program. Combines Diamond Hydro-Infusion, oxygen dome therapy, enzymatic back & body brightening, and clinician-formulated antioxidant infusions for glass-skin luminosity.',
    duration: '90 Min Bespoke Ritual',
    price: '₦220,000',
    metrics: ['Transepidermal Hydration Boost', 'Full-Body Satin Finish', '6-to-12 Week Bridal Roadmaps'],
    image: BRIDAL_IMAGE,
    alt: 'Radiant Nigerian bridal skin glow',
  },
  {
    id: 'acne-remodeling',
    number: '04',
    title: 'Acne & Scar Remodeling',
    shortDesc: 'Medical-grade chemical peels, exosome microneedling, and sebum regulation built for tropical humidity.',
    fullDesc:
      'Resolves hormonal and humidity-triggered breakouts while rebuilding indented boxcar and icepick acne scars using radiofrequency microneedling, salmon DNA polynucleotides (PDRN), and controlled mandelic-salicylic resurfacing.',
    duration: '60 Min Resurfacing Session',
    price: '₦160,000',
    metrics: ['Sebaceous Gland Calibration', 'Exosome & PDRN Collagen Induction', 'PIH-Preventative Peel Buffers'],
    image: HERO_IMAGE,
    alt: 'Acne and scar remodeling suite',
  },
];

const FULL_MENU_EXTRAS = [
  {
    number: '05',
    title: '3D VISIA-MS Melanin & Barrier Diagnostic',
    category: 'Diagnostics',
    duration: '45 Min',
    price: '₦65,000',
    description: 'Multispectral sub-surface imaging of UV spots, porphyrins, hydration levels, and barrier integrity before starting any regimen.',
  },
  {
    number: '06',
    title: 'Follicular & Scalp Restoration (PRP + Exosomes)',
    category: 'Trichology',
    duration: '60 Min',
    price: '₦195,000',
    description: 'Medical restoration for traction alopecia, postpartum shedding, and androgenetic thinning common with protective styling.',
  },
  {
    number: '07',
    title: 'Non-Surgical Facial Balancing & Biostimulators',
    category: 'Medical Aesthetics',
    duration: '60 Min',
    price: '₦350,000',
    description: 'Subtle Polynucleotide (Rejuran), Profhilo bio-remodeling, and masseter refinement preserving natural African facial harmony.',
  },
];

const CLINICS = [
  {
    id: 'vi-lagos',
    city: 'Victoria Island',
    name: 'Victoria Island Flagship House',
    address: '14A Akin Olugbade Street, Off Adeola Odeku, Victoria Island, Lagos',
    hours: 'Mon – Sat · 08:00 – 19:00 | Sun · 12:00 – 18:00',
    phone: '+234 908 742 1100',
    lead: 'Dr. Adaeze Adebayo, MBBS, FMCP (Derm)',
    labs: ['3D VISIA-MS Skin Lab', 'Aerolase & Pico Laser Suite', 'Private Bridal Sanctuary'],
  },
  {
    id: 'lekki-lagos',
    city: 'Lekki Phase 1',
    name: 'Lekki Phase 1 Aesthetic Studio',
    address: '28 Admiralty Way, Beside Bisconveys, Lekki Phase 1, Lagos',
    hours: 'Mon – Sat · 08:30 – 19:30',
    phone: '+234 908 742 1102',
    lead: 'Dr. Teniola Balogun, MD, MSc Clinical Dermatology (KCL)',
    labs: ['Hydro-Dermabrasion Lounge', 'Acne & Chemical Peel Clinic', 'IV Cellular Glow Bar'],
  },
  {
    id: 'maitama-abuja',
    city: 'Maitama Abuja',
    name: 'Maitama Private Sanctuary',
    address: '7 Yedseram Street, Maitama, Abuja FCT',
    hours: 'Mon – Sat · 09:00 – 18:30',
    phone: '+234 908 742 1105',
    lead: 'Dr. Zainab Danjuma, MBBS, Fellow Aesthetic Medicine',
    labs: ['VIP Discreet Entry Suite', 'Laser & Scar Revision Bay', 'Trichology & Scalp Lab'],
  },
];

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'assessment' | 'specialist'>('assessment');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [labDemoOpen, setLabDemoOpen] = useState(false);
  const [activeClinicModal, setActiveClinicModal] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<'journal' | 'portal' | 'privacy' | 'terms' | null>(null);

  // Booking form state
  const [bookingClinic, setBookingClinic] = useState('Victoria Island Flagship House (Lagos)');
  const [bookingService, setBookingService] = useState('3D VISIA-MS Skin Barrier & Melanin Consultation');
  const [bookingDate, setBookingDate] = useState('2026-11-14');
  const [bookingTime, setBookingTime] = useState('11:00');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Interactive Lab Telemetry Simulator State
  const [selectedMetricTab, setSelectedMetricTab] = useState<'melanin' | 'barrier'>('melanin');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animation-on-scroll]');
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.classList.add('animate-on-scroll-hidden');

      if (htmlEl.dataset.animationDirection === 'left') {
        htmlEl.classList.add('animate-from-left');
      } else if (htmlEl.dataset.animationDirection === 'right') {
        htmlEl.classList.add('animate-from-right');
      }

      observer.observe(htmlEl);
    });

    return () => observer.disconnect();
  }, []);

  const openBooking = (type: 'assessment' | 'specialist', prefillService?: string, prefillClinic?: string) => {
    setBookingType(type);
    if (prefillService) setBookingService(prefillService);
    if (prefillClinic) setBookingClinic(prefillClinic);
    setBookingSubmitted(false);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientEmail.trim()) return;
    setBookingSubmitted(true);
  };

  return (
    <div
      id="app-root"
      className="font-primary bg-neutral-background text-text-primary overflow-x-hidden min-h-screen flex flex-col w-full relative"
    >
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 md:px-16 pointer-events-none">
        <nav className="w-full max-w-[1728px] pointer-events-auto">
          <div className="flex items-center justify-between gap-8 bg-brand-secondary/90 backdrop-blur-md rounded-full shadow-nav border border-border-soft px-4 py-2 h-[56px] w-full">
            {/* Logo */}
            <a href="#top" className="flex items-center ml-4 whitespace-nowrap shrink-0">
              <span className="text-brand-primary font-primary text-xl font-bold tracking-widest uppercase leading-tight">
                Lumina
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <a
                href="#method"
                className="nav-item-hover px-4 py-2 rounded-full text-brand-primary text-sm font-medium whitespace-nowrap shrink-0"
              >
                The Method
              </a>
              <a
                href="#services"
                className="nav-item-hover px-4 py-2 rounded-full text-brand-primary text-sm font-medium whitespace-nowrap shrink-0"
              >
                Treatments
              </a>
              <a
                href="#performance"
                className="nav-item-hover px-4 py-2 rounded-full text-brand-primary text-sm font-medium whitespace-nowrap shrink-0"
              >
                Skin Lab
              </a>
              <a
                href="#contact"
                className="nav-item-hover px-4 py-2 rounded-full text-brand-primary text-sm font-medium whitespace-nowrap shrink-0"
              >
                Clinics
              </a>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => openBooking('assessment')}
              className="bg-brand-primary text-brand-secondary rounded-full px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </nav>
      </header>

      <main id="top" className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center overflow-visible">
          {/* Background Hero Image */}
          <div className="absolute top-0 left-0 w-full h-[825px] z-10 overflow-hidden">
            {/* Increased overlay opacity for better text contrast */}
            <div className="absolute inset-0 bg-black/50 z-[11]"></div>
            <img
              src={HERO_IMAGE}
              alt="Lumina luxury medical dermatology and melanin skin clinic in Victoria Island, Lagos"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[1728px] h-[825px] pt-[75px] pb-[168px] px-6 md:px-16">
            <div className="max-w-[1100px] text-center mb-10" data-animation-on-scroll="">
              <AnimatedHeading
                as="h1"
                text="Clinical Aesthetics Crafted for Melanin Excellence"
                className="text-text-on-dark font-primary text-6xl md:text-8xl text-tight font-medium"
              />
              <p className="text-text-on-dark text-lg md:text-xl mt-8 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                Where consultant dermatology meets cellular luxury in Lagos and Abuja. Experience bespoke laser, hyperpigmentation, and barrier-repair protocols calibrated exclusively for melanin-rich skin.
              </p>
            </div>

            <div className="flex items-center gap-4" data-animation-on-scroll="">
              <button
                type="button"
                onClick={() => openBooking('assessment')}
                className="bg-brand-secondary text-brand-primary rounded-full px-8 py-4 text-base font-semibold hover:bg-white transition-colors shadow-cta cursor-pointer whitespace-nowrap"
              >
                Book Skin Analysis
              </button>
              <a
                href="#services"
                className="bg-transparent text-brand-secondary border border-brand-secondary rounded-full px-8 py-4 text-base font-semibold hover:bg-brand-secondary hover:text-brand-primary transition-all whitespace-nowrap"
              >
                The Treatments
              </a>
            </div>
          </div>

          {/* Action Blocks (Grid Overlay) */}
          <div className="relative z-30 w-full max-w-[1728px] px-6 md:px-16 -mt-32">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-brand-secondary rounded-xl overflow-hidden shadow-2xl min-h-[500px] w-full border border-border-soft">
              {/* Block 1: Medical Dermatology */}
              <a
                href="#method"
                className="action-block-hover flex flex-col border-b md:border-b-0 md:border-r border-border-soft group"
              >
                <div className="p-8 h-[180px] flex flex-col justify-between border-b border-border-soft">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-brand-primary text-xs uppercase tracking-widest font-bold">
                      Medical Dermatology
                    </span>
                    <svg
                      className="w-5 h-5 text-brand-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <h4 className="text-brand-primary text-[28px] leading-[1.1] tracking-tight font-medium max-w-[290px]">
                    Cellular Barrier Repair &amp; Melanin Science
                  </h4>
                </div>
                <div className="flex-grow overflow-hidden h-[340px] md:h-[380px]">
                  <img
                    src={DERM_IMAGE}
                    alt="Nigerian dermatologist performing skin barrier analysis"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

              {/* Block 2: Laser & Hyperpigmentation */}
              <a
                href="#performance"
                className="action-block-hover flex flex-col border-b md:border-b-0 md:border-r border-border-soft group"
              >
                <div className="p-8 h-[180px] flex flex-col justify-between border-b border-border-soft">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-brand-primary text-xs uppercase tracking-widest font-bold">
                      Laser &amp; Pigment
                    </span>
                    <svg
                      className="w-5 h-5 text-brand-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <h4 className="text-brand-primary text-[28px] leading-[1.1] tracking-tight font-medium max-w-[290px]">
                    Melanin-Safe Laser &amp; Clear Tone Protocols
                  </h4>
                </div>
                <div className="flex-grow overflow-hidden h-[340px] md:h-[380px]">
                  <img
                    src={LASER_IMAGE}
                    alt="Melanin-safe laser and hydro-glow therapy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>

              {/* Block 3: Bridal & Radiance */}
              <a href="#services" className="action-block-hover flex flex-col group">
                <div className="p-8 h-[180px] flex flex-col justify-between border-b border-border-soft">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-brand-primary text-xs uppercase tracking-widest font-bold">
                      Bridal &amp; Radiance
                    </span>
                    <svg
                      className="w-5 h-5 text-brand-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <h4 className="text-brand-primary text-[28px] leading-[1.1] tracking-tight font-medium max-w-[290px]">
                    Luminous Glass-Skin &amp; Event Architecture
                  </h4>
                </div>
                <div className="flex-grow overflow-hidden h-[340px] md:h-[380px]">
                  <img
                    src={BRIDAL_IMAGE}
                    alt="Radiant Nigerian woman with glowing dark melanin skin"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Our Philosophy Section - ZIG (LEFT) */}
        <section id="method" className="py-32 px-6 md:px-16 bg-white overflow-hidden">
          <div
            className="max-w-[1728px] mx-auto"
            data-animation-on-scroll=""
            data-animation-direction="left"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-brand-primary text-xs uppercase tracking-[0.3em] font-bold block mb-8">
                  The Lumina Skin Method
                </span>
                <AnimatedHeading
                  as="h2"
                  text="Precision Dermatology for Melanin-Rich Skin"
                  className="text-5xl md:text-7xl text-tight text-text-primary mb-10"
                />
                <div className="space-y-6 text-text-secondary text-lg leading-relaxed max-w-xl">
                  <p>
                    Melanin-rich skin possesses extraordinary structural resilience, yet requires exact clinical calibration. At Lumina, we reject harsh bleaching agents and generic one-size-fits-all laser parameters that trigger post-inflammatory hyperpigmentation.
                  </p>
                  <p>
                    Founded by UK- and Nigerian-trained consultant dermatologists, our houses in Victoria Island, Lekki, and Maitama unite 3D sub-dermal diagnostics with climate-intelligent formulations designed for West African humidity and UV exposure.
                  </p>
                </div>
                <div className="mt-12 flex flex-col sm:flex-row gap-8">
                  <div className="flex flex-col">
                    <span className="text-brand-primary text-3xl font-medium mb-1 tabular-nums">18+</span>
                    <span className="text-xs uppercase tracking-widest text-text-secondary">
                      Melanin-Safe Protocols
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-brand-primary text-3xl font-medium mb-1 tabular-nums">99.4%</span>
                    <span className="text-xs uppercase tracking-widest text-text-secondary">
                      Zero-PIH Safety Rate
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-brand-primary text-3xl font-medium mb-1 tabular-nums">03</span>
                    <span className="text-xs uppercase tracking-widest text-text-secondary">
                      Lagos &amp; Abuja Houses
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-lg overflow-hidden border border-border-soft">
                  <img
                    src={DERM_IMAGE}
                    alt="Dr. Adaeze Adebayo, Clinical Director at Lumina Lagos"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-12 -left-12 bg-brand-secondary p-10 rounded-lg border border-border-soft shadow-xl hidden md:block max-w-[320px]">
                  <p className="text-brand-primary italic text-lg leading-tight">
                    "True radiance is never stripped or forced—it is the natural reflection of a calm, deeply hydrated cellular barrier."
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-text-primary">
                    — Dr. Adaeze Adebayo, Clinical Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid - ZAG (RIGHT) */}
        <section
          id="services"
          className="relative z-20 py-32 px-6 md:px-16 bg-brand-secondary border-y border-border-soft overflow-hidden"
        >
          <div
            className="max-w-[1728px] mx-auto"
            data-animation-on-scroll=""
            data-animation-direction="right"
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="text-brand-primary text-xs uppercase tracking-[0.3em] font-bold block mb-8">
                  Clinical Treatments
                </span>
                <AnimatedHeading
                  as="h2"
                  text="Science-Backed Skin Interventions"
                  className="text-5xl md:text-7xl text-tight text-text-primary"
                />
              </div>
              <button
                type="button"
                onClick={() => setServiceMenuOpen(true)}
                className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-xs border-b border-brand-primary pb-2 group cursor-pointer whitespace-nowrap"
              >
                View Full Treatment Menu (NGN)
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border-soft border border-border-soft overflow-hidden rounded-lg">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedService(service);
                    }
                  }}
                  className="bg-white p-10 group hover:bg-brand-secondary transition-colors cursor-pointer flex flex-col justify-between text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-10">
                      <div className="w-12 h-12 rounded-full border border-border-soft flex items-center justify-center text-brand-primary tabular-nums">
                        {service.number}
                      </div>
                      <span className="text-xs text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity font-medium flex items-center gap-1">
                        View Protocol <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <h3 className="text-2xl font-medium mb-4 text-text-primary">{service.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-10">
                      {service.shortDesc}
                    </p>
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img
                      src={service.image}
                      alt={service.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Metric Section - ZIG (LEFT) */}
        <section
          id="performance"
          className="sticky top-0 z-10 min-h-screen flex items-center py-32 px-6 md:px-16 bg-text-primary text-white overflow-hidden"
        >
          <div
            className="max-w-[1728px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full"
            data-animation-on-scroll=""
            data-animation-direction="left"
          >
            <div>
              <span className="text-brand-secondary text-xs uppercase tracking-[0.3em] font-bold block mb-8">
                3D Cellular Diagnostics
              </span>
              <AnimatedHeading
                as="h2"
                text="Data-Driven Melanin Evolution"
                className="text-5xl md:text-7xl text-tight mb-8"
              />
              <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-xl">
                Before a single active compound or laser pulse touches your face, our VISIA-MS multispectral scanner maps your sub-surface melanin distribution, UV damage, transepidermal water loss, and follicular congestion—eliminating guesswork from your skincare investment.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                <div>
                  <h4 className="text-brand-secondary text-xl font-medium mb-2 uppercase tracking-widest">
                    Sub-Surface
                  </h4>
                  <p className="text-white/40 text-sm">
                    Cross-polarized UV &amp; RBX melanin mapping to target hidden hyperpigmentation early.
                  </p>
                </div>
                <div>
                  <h4 className="text-brand-secondary text-xl font-medium mb-2 uppercase tracking-widest">
                    Climate-Tuned
                  </h4>
                  <p className="text-white/40 text-sm">
                    Sebum, pH, and lipid barrier telemetry calibrated for Lagos &amp; Abuja humidity levels.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                onClick={() => setLabDemoOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLabDemoOpen(true);
                  }
                }}
                aria-label="Open 3D Skin Diagnostic Telemetry Preview"
                className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl relative group cursor-pointer"
              >
                <img
                  src={LAB_IMAGE}
                  alt="3D multispectral skin diagnostic scanner in Lumina lab"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/15 transition-colors">
                    <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-brand-secondary/90 font-medium bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-xs">
                    Inspect Sample 3D Skin Scan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / Appointment Section - ZAG (RIGHT) */}
        <section
          id="book"
          className="relative z-20 py-40 px-6 md:px-16 bg-neutral-surface text-center overflow-hidden border-y border-border-soft"
        >
          <div id="contact" className="absolute -top-20" />
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img
              src={HERO_IMAGE}
              alt="Lumina architectural texture"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="max-w-4xl mx-auto relative z-10"
            data-animation-on-scroll=""
            data-animation-direction="right"
          >
            <span className="text-brand-primary text-xs uppercase tracking-[0.4em] font-bold block mb-10">
              Invest in Your Skin Architecture
            </span>
            <AnimatedHeading
              as="h2"
              text="Reveal Your Most Luminous Skin"
              className="text-6xl md:text-8xl text-tight text-text-primary mb-12"
            />
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button
                type="button"
                onClick={() => openBooking('assessment')}
                className="bg-brand-primary text-white rounded-full px-12 py-5 text-lg font-semibold hover:opacity-90 transition-all shadow-cta w-full sm:w-auto cursor-pointer whitespace-nowrap"
              >
                Schedule 3D Skin Analysis
              </button>
              <button
                type="button"
                onClick={() => openBooking('specialist')}
                className="bg-transparent text-brand-primary border border-brand-primary/30 rounded-full px-12 py-5 text-lg font-semibold hover:bg-brand-primary/5 transition-all w-full sm:w-auto cursor-pointer whitespace-nowrap"
              >
                Speak to a Dermatologist
              </button>
            </div>
            <div className="mt-12 flex flex-wrap justify-center items-center gap-3 text-text-secondary/60 text-xs uppercase tracking-widest">
              <span>Clinics in</span>
              {CLINICS.map((clinic, idx) => (
                <React.Fragment key={clinic.id}>
                  <button
                    type="button"
                    onClick={() => setActiveClinicModal(clinic.id)}
                    className="text-brand-primary hover:underline font-semibold cursor-pointer uppercase tracking-widest"
                  >
                    {clinic.city}
                  </button>
                  {idx < CLINICS.length - 1 && <span aria-hidden="true">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-brand-primary text-brand-secondary pt-24 pb-12 overflow-hidden">
        <div className="max-w-[1728px] mx-auto px-6 md:px-16">
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16"
            data-animation-on-scroll=""
            data-animation-direction="left"
          >
            <div className="col-span-1 md:col-span-1">
              <AnimatedHeading
                as="h3"
                text="Lumina"
                className="text-2xl font-bold tracking-widest uppercase mb-6"
              />
              <AnimatedHeading
                as="p"
                text="Clinical dermatology and luxury skin aesthetics calibrated for melanin-rich skin. Serving discerning clients across Lagos and Abuja."
                className="text-brand-secondary/70 text-sm leading-relaxed max-w-xs"
              />
            </div>
            <div>
              <AnimatedHeading
                as="h4"
                text="Locations"
                className="font-bold text-sm uppercase mb-6 tracking-wider"
              />
              <ul className="space-y-4 text-sm text-brand-secondary/70">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveClinicModal('vi-lagos')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Victoria Island Flagship (Lagos)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveClinicModal('lekki-lagos')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Lekki Phase 1 Studio (Lagos)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveClinicModal('maitama-abuja')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Maitama Private Sanctuary (Abuja)
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <AnimatedHeading
                as="h4"
                text="Treatments"
                className="font-bold text-sm uppercase mb-6 tracking-wider"
              />
              <ul className="space-y-4 text-sm text-brand-secondary/70">
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedService(SERVICES[0])}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Hyperpigmentation &amp; Melasma
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedService(SERVICES[1])}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Melanin-Safe Laser Therapy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedService(SERVICES[2])}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Bridal &amp; Event Glow Rituals
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedService(SERVICES[3])}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Acne &amp; Scar Remodeling
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <AnimatedHeading
                as="h4"
                text="Connect"
                className="font-bold text-sm uppercase mb-6 tracking-wider"
              />
              <ul className="space-y-4 text-sm text-brand-secondary/70">
                <li>
                  <button
                    type="button"
                    onClick={() => setInfoModal('journal')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    The Melanin Journal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openBooking('specialist')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    WhatsApp Concierge Desk
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setInfoModal('portal')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Client Regimen Portal
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-medium text-brand-secondary/40"
            data-animation-on-scroll=""
            data-animation-direction="right"
          >
            <p>© 2026 Lumina Aesthetics &amp; Dermatology Nigeria Ltd. All Rights Reserved.</p>
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => setInfoModal('privacy')}
                className="hover:text-white transition-colors cursor-pointer uppercase tracking-[0.2em]"
              >
                NDPR Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setInfoModal('terms')}
                className="hover:text-white transition-colors cursor-pointer uppercase tracking-[0.2em]"
              >
                Terms of Clinical Care
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal 1: Book Consultation / Speak to a Dermatologist */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setBookingModalOpen(false)}
        >
          <div
            className="bg-brand-secondary text-text-primary border border-border-soft rounded-xl max-w-xl w-full p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setBookingModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border-soft flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-brand-primary text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              {bookingType === 'assessment' ? 'Private Clinical Intake' : 'Consultant Dermatologist Desk'}
            </span>
            <h3 className="text-3xl md:text-4xl text-tight font-medium text-text-primary mb-3">
              {bookingType === 'assessment'
                ? 'Reserve Your 3D Skin Consultation'
                : 'Speak With a Lead Dermatologist'}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              {bookingType === 'assessment'
                ? 'Begin with a 45-minute VISIA-MS 3D sub-dermal melanin & barrier scan, followed by a bespoke treatment roadmap at our Victoria Island, Lekki, or Maitama sanctuary.'
                : 'Request a private phone or WhatsApp video triage with our medical aesthetics team regarding bridal timelines, melasma protocols, or keloid-safe laser care.'}
            </p>

            {bookingSubmitted ? (
              <div className="bg-white border border-border-soft rounded-lg p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-medium text-text-primary mb-2">
                  Sanctuary Appointment Reserved
                </h4>
                <p className="text-text-secondary text-sm mb-6">
                  Our concierge desk has sent your confirmation and pre-visit skin prep guide to{' '}
                  <span className="font-semibold text-text-primary">{patientEmail}</span>
                  {patientPhone ? ` and WhatsApp (${patientPhone})` : ''} for{' '}
                  <span className="font-semibold text-text-primary">{bookingClinic}</span> on{' '}
                  <span className="font-semibold text-text-primary tabular-nums">{bookingDate}</span> at{' '}
                  <span className="font-semibold text-text-primary tabular-nums">{bookingTime}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="bg-brand-primary text-white rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Return to Lumina
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2">
                    Select Clinic Location
                  </label>
                  <select
                    value={bookingClinic}
                    onChange={(e) => setBookingClinic(e.target.value)}
                    className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Victoria Island Flagship House (Lagos)">
                      Victoria Island Flagship House — Akin Olugbade, Lagos
                    </option>
                    <option value="Lekki Phase 1 Aesthetic Studio (Lagos)">
                      Lekki Phase 1 Aesthetic Studio — Admiralty Way, Lagos
                    </option>
                    <option value="Maitama Private Sanctuary (Abuja)">
                      Maitama Private Sanctuary — Yedseram Street, Abuja
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2">
                    Treatment or Consultation Protocol
                  </label>
                  <select
                    value={bookingService}
                    onChange={(e) => setBookingService(e.target.value)}
                    className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-primary"
                  >
                    <option value="3D VISIA-MS Skin Barrier & Melanin Consultation">
                      3D VISIA-MS Skin Barrier &amp; Melanin Consultation (₦65,000)
                    </option>
                    <option value="Hyperpigmentation & Melasma">
                      01 · Hyperpigmentation &amp; Melasma Protocol (₦145,000)
                    </option>
                    <option value="Melanin-Safe Laser Therapy">
                      02 · Melanin-Safe Laser Therapy (₦180,000)
                    </option>
                    <option value="Bridal & Red-Carpet Glow">
                      03 · Bridal &amp; Red-Carpet Glow Ritual (₦220,000)
                    </option>
                    <option value="Acne & Scar Remodeling">
                      04 · Acne &amp; Scar Remodeling (₦160,000)
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-primary tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2">
                      Preferred Time
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-primary tabular-nums"
                    >
                      <option value="09:00">09:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="13:30">01:30 PM</option>
                      <option value="15:30">03:30 PM</option>
                      <option value="17:30">05:30 PM (After-Work Slot)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Chidinma Okafor"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 803 000 0000"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-primary tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="chidinma@domain.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2">
                    Primary Skin Concern or Upcoming Event Date (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Post-acne dark spots on cheeks, December bridal prep, sensitive barrier..."
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    className="w-full bg-white border border-border-soft rounded-sm px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-primary text-white rounded-full py-4 text-sm font-semibold hover:opacity-90 transition-opacity shadow-cta cursor-pointer"
                >
                  {bookingType === 'assessment'
                    ? 'Confirm Sanctuary Appointment'
                    : 'Request Dermatologist Triage'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Individual Treatment Detail */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white text-text-primary border border-border-soft rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedService.image}
                alt={selectedService.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Close service details"
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-brand-secondary/90 text-brand-primary flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between gap-4">
                <div>
                  <span className="text-brand-secondary/80 text-xs uppercase tracking-widest font-bold block mb-1">
                    Protocol {selectedService.number} · {selectedService.duration} · {selectedService.price}
                  </span>
                  <h3 className="text-3xl font-medium text-brand-secondary">
                    {selectedService.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-8">
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                {selectedService.fullDesc}
              </p>

              <div className="border-t border-border-soft pt-6 mb-8">
                <span className="text-xs uppercase tracking-widest text-brand-primary font-bold block mb-4">
                  Clinical Standards &amp; Safeguards
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedService.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="bg-brand-secondary p-4 rounded-sm border border-border-soft text-xs font-medium text-text-primary"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-6 py-3 rounded-full border border-border-soft text-xs uppercase tracking-widest font-bold text-text-secondary hover:text-text-primary cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    openBooking('assessment', title);
                  }}
                  className="bg-brand-primary text-white rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 transition-opacity shadow-cta cursor-pointer"
                >
                  Book {selectedService.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Full Treatment Menu */}
      {serviceMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setServiceMenuOpen(false)}
        >
          <div
            className="bg-brand-secondary text-text-primary border border-border-soft rounded-xl max-w-3xl w-full p-8 md:p-12 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setServiceMenuOpen(false)}
              aria-label="Close full treatment menu"
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border-soft flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-brand-primary text-xs uppercase tracking-[0.3em] font-bold block mb-3">
              Lagos &amp; Abuja Clinical Tariff
            </span>
            <h3 className="text-3xl md:text-5xl text-tight font-medium mb-8">
              Dermatology &amp; Aesthetic Menu
            </h3>

            <div className="divide-y divide-border-soft border-y border-border-soft mb-8">
              {[
                ...SERVICES.map((s) => ({
                  number: s.number,
                  title: s.title,
                  category: 'Signature Clinical',
                  duration: s.duration.replace(' Clinical Session', '').replace(' Laser Session', '').replace(' Bespoke Ritual', '').replace(' Resurfacing Session', ''),
                  price: s.price,
                  description: s.fullDesc,
                })),
                ...FULL_MENU_EXTRAS,
              ].map((item) => (
                <div
                  key={item.number}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="max-w-xl">
                    <div className="flex items-center gap-3 text-xs text-brand-primary font-bold uppercase tracking-widest mb-1">
                      <span className="tabular-nums">{item.number}</span>
                      <span>·</span>
                      <span>{item.category}</span>
                      <span>·</span>
                      <span className="tabular-nums">{item.duration}</span>
                      <span>·</span>
                      <span className="tabular-nums">{item.price}</span>
                    </div>
                    <h4 className="text-xl font-medium text-text-primary mb-1">{item.title}</h4>
                    <p className="text-text-secondary text-sm">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setServiceMenuOpen(false);
                      openBooking('assessment', item.title);
                    }}
                    className="self-start sm:self-center bg-white border border-border-soft hover:border-brand-primary text-brand-primary rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Reserve
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Interactive 3D Skin Lab Telemetry Demo */}
      {labDemoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setLabDemoOpen(false)}
        >
          <div
            className="bg-text-primary text-white border border-white/15 rounded-xl max-w-3xl w-full p-8 md:p-10 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLabDemoOpen(false)}
              aria-label="Close telemetry modal"
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-brand-secondary text-xs uppercase tracking-[0.3em] font-bold block mb-2">
              VISIA-MS 3D Skin Lab · Fitzpatrick V Sample Profile
            </span>
            <h3 className="text-3xl md:text-4xl text-tight font-medium mb-6">
              Multispectral Melanin &amp; Barrier Telemetry
            </h3>

            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setSelectedMetricTab('melanin')}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                  selectedMetricTab === 'melanin'
                    ? 'bg-brand-primary text-white'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                Sub-Surface Melanin Map
              </button>
              <button
                type="button"
                onClick={() => setSelectedMetricTab('barrier')}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer ${
                  selectedMetricTab === 'barrier'
                    ? 'bg-brand-primary text-white'
                    : 'bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                Lipid Barrier &amp; Hydration
              </button>
            </div>

            {selectedMetricTab === 'melanin' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <span className="text-xs text-white/50 uppercase tracking-widest block mb-2">
                    Tone Uniformity Index
                  </span>
                  <div className="text-3xl font-medium text-brand-secondary tabular-nums mb-1">
                    94.8%
                  </div>
                  <span className="text-xs text-white/60">+28% After 3 Nd:YAG Sessions</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <span className="text-xs text-white/50 uppercase tracking-widest block mb-2">
                    Latent UV / PIH Clusters
                  </span>
                  <div className="text-3xl font-medium text-brand-secondary tabular-nums mb-1">
                    -64%
                  </div>
                  <span className="text-xs text-white/60">RBX Sub-Surface Pigment Score</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <span className="text-xs text-white/50 uppercase tracking-widest block mb-2">
                    Thermal Safety Margin
                  </span>
                  <div className="text-3xl font-medium text-brand-secondary tabular-nums mb-1">
                    650 µs
                  </div>
                  <span className="text-xs text-white/60">Zero Epidermal Melanin Stress</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <span className="text-xs text-white/50 uppercase tracking-widest block mb-2">
                    Stratum Corneum Hydration
                  </span>
                  <div className="text-3xl font-medium text-brand-secondary tabular-nums mb-1">
                    88.5%
                  </div>
                  <span className="text-xs text-white/60">Optimal Glass-Skin Threshold</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <span className="text-xs text-white/50 uppercase tracking-widest block mb-2">
                    Transepidermal Water Loss
                  </span>
                  <div className="text-3xl font-medium text-brand-secondary tabular-nums mb-1">
                    6.2 g/m²h
                  </div>
                  <span className="text-xs text-white/60">Intact Ceramide Lipid Seal</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                  <span className="text-xs text-white/50 uppercase tracking-widest block mb-2">
                    Acid Mantle pH Balance
                  </span>
                  <div className="text-3xl font-medium text-brand-secondary tabular-nums mb-1">
                    4.85 pH
                  </div>
                  <span className="text-xs text-white/60">Calibrated for Tropical Humidity</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-xs text-white/60">
                Every first-time guest receives a full 3D VISIA-MS digital skin dossier to track progress session by session.
              </p>
              <button
                type="button"
                onClick={() => {
                  setLabDemoOpen(false);
                  openBooking('assessment', '3D VISIA-MS Skin Barrier & Melanin Consultation');
                }}
                className="bg-brand-secondary text-brand-primary rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors whitespace-nowrap cursor-pointer"
              >
                Book 3D Skin Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: Clinic Location Details */}
      {activeClinicModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setActiveClinicModal(null)}
        >
          {(() => {
            const clinic = CLINICS.find((c) => c.id === activeClinicModal) || CLINICS[0];
            return (
              <div
                className="bg-brand-secondary text-text-primary border border-border-soft rounded-xl max-w-lg w-full p-8 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveClinicModal(null)}
                  aria-label="Close clinic details"
                  className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border-soft flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="text-brand-primary text-xs uppercase tracking-[0.3em] font-bold block mb-2">
                  Lumina Sanctuary · {clinic.city}
                </span>
                <h3 className="text-3xl font-medium text-text-primary mb-6">{clinic.name}</h3>

                <div className="space-y-4 text-sm text-text-secondary bg-white p-6 rounded-lg border border-border-soft mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <span>{clinic.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <span className="tabular-nums">{clinic.hours}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <span>Lead Consultant: {clinic.lead}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-medium text-text-primary mb-1">
                        Dedicated Suites:
                      </span>
                      <span className="text-xs">{clinic.labs.join(' · ')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Activity className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <span className="tabular-nums">Concierge Direct: {clinic.phone}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const selectedName = `${clinic.name} (${clinic.city})`;
                      setActiveClinicModal(null);
                      openBooking('assessment', undefined, selectedName);
                    }}
                    className="bg-brand-primary text-white rounded-full px-8 py-3 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Book at {clinic.city}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Modal 6: Footer Information Modals (Journal, Client Portal, Privacy, Terms) */}
      {infoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setInfoModal(null)}
        >
          <div
            className="bg-brand-secondary text-text-primary border border-border-soft rounded-xl max-w-lg w-full p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setInfoModal(null)}
              aria-label="Close dialog"
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border-soft flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {infoModal === 'journal' && (
              <>
                <span className="text-brand-primary text-xs uppercase tracking-[0.3em] font-bold block mb-2">
                  Lumina Clinical Monograph
                </span>
                <h3 className="text-3xl font-medium mb-4">The Melanin Journal</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-border-soft">
                    <span className="text-xs text-brand-primary font-bold uppercase tracking-widest">
                      Issue 09 · Pigment Science
                    </span>
                    <h4 className="font-medium text-base mt-1">
                      Why Harsh Hydroquinone Creams Destroy the Stratum Corneum—And How Tranexamic + 1064nm Laser Restores It
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      Dr. Adaeze Adebayo — Victoria Island Clinical Study.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-border-soft">
                    <span className="text-xs text-brand-primary font-bold uppercase tracking-widest">
                      Issue 08 · Tropical Skincare
                    </span>
                    <h4 className="font-medium text-base mt-1">
                      Balancing Sebum and Sunscreen in Lagos Humidity Without Clogging Pores
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      Dr. Teniola Balogun — Lekki Phase 1 Dermatology Review.
                    </p>
                  </div>
                </div>
              </>
            )}

            {infoModal === 'portal' && (
              <>
                <span className="text-brand-primary text-xs uppercase tracking-[0.3em] font-bold block mb-2">
                  Private Digital Skin Dossier
                </span>
                <h3 className="text-3xl font-medium mb-4">Client Regimen Portal</h3>
                <p className="text-sm text-text-secondary mb-6">
                  View your 3D VISIA-MS scan comparisons, morning/evening prescription AM/PM routine, and upcoming laser or bridal glow sessions.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInfoModal(null);
                    openBooking('assessment');
                  }}
                  className="space-y-4"
                >
                  <input
                    type="email"
                    required
                    placeholder="Registered Client Email"
                    className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm"
                  />
                  <input
                    type="password"
                    required
                    placeholder="Sanctuary Passcode"
                    className="w-full bg-white border border-border-soft rounded-sm px-4 py-3 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-brand-primary text-white rounded-full py-3.5 text-sm font-semibold cursor-pointer"
                  >
                    Access Skin Dossier
                  </button>
                </form>
              </>
            )}

            {(infoModal === 'privacy' || infoModal === 'terms') && (
              <>
                <span className="text-brand-primary text-xs uppercase tracking-[0.3em] font-bold block mb-2">
                  Medical Governance &amp; Discretion
                </span>
                <h3 className="text-3xl font-medium mb-4">
                  {infoModal === 'privacy' ? 'NDPR Privacy Policy' : 'Terms of Clinical Care'}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {infoModal === 'privacy'
                    ? 'All 3D facial imaging, dermatology charts, and client records are strictly confidential and protected under the Nigeria Data Protection Regulation (NDPR). Photographs are never used for marketing without explicit written consent, and VIP private-entry scheduling is available at all locations.'
                    : 'All laser, injectable, and chemical resurfacing procedures are performed or directly supervised by MDCN-licensed dermatologists and aesthetic physicians across our Victoria Island, Lekki Phase 1, and Maitama clinics.'}
                </p>
                <button
                  type="button"
                  onClick={() => setInfoModal(null)}
                  className="bg-brand-primary text-white rounded-full px-8 py-3 text-xs uppercase tracking-widest font-bold cursor-pointer"
                >
                  Acknowledge
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
