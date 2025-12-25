'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Dumbbell, HeartPulse, Users, Clock, CheckCircle2 } from 'lucide-react';

// --- DONNÉES DU SITE ---

// Données pour les tarifs
const PRICING = [
  {
    name: "Découverte",
    price: "49",
    period: "/mois",
    desc: "Pour débuter et apprendre les bases.",
    features: ["Accès illimité Open Gym", "2 cours collectifs / semaine", "Programme d'initiation", "Accès vestiaires & douches"],
    highlight: false,
  },
  {
    name: "Performance",
    price: "89",
    period: "/mois",
    desc: "Le best-seller pour des résultats rapides.",
    features: ["Accès illimité Open Gym", "Cours collectifs illimités", "Coaching personnalisé (1h/mois)", "Accès aux événements membres", "Nutrition guide de base"],
    highlight: true, // Celui-ci sera mis en avant en Jaune
  },
  {
    name: "Élite Athlete",
    price: "129",
    period: "/mois",
    desc: "Pour ceux qui ne visent que le sommet.",
    features: ["Tout inclus en illimité", "Programmation compétition", "Suivi nutritionnel complet", "Accès 24/7 (badge)", "Casier privé", "Invité gratuit 2x/mois"],
    highlight: false,
  },
];

// Données pour le planning simplifié
const SCHEDULE = [
    { day: "Lundi", classes: ["07:00 - WOD Morning", "12:30 - Strength", "18:00 - WOD Intense", "19:15 - Gymnastics"] },
    { day: "Mardi", classes: ["07:00 - Conditioning", "12:30 - WOD Lunch", "18:00 - WOD Intense", "19:15 - Mobility"] },
    { day: "Mercredi", classes: ["07:00 - WOD Morning", "12:30 - Strength", "18:00 - Weightlifting", "19:15 - Endurance"] },
    { day: "Jeudi", classes: ["Active Recovery / Open Gym toute la journée"] },
    { day: "Vendredi", classes: ["07:00 - WOD Morning", "12:30 - Team WOD", "18:00 - Friday Night Lights (Team)"] },
    { day: "Samedi", classes: ["09:00 - Team WOD XXL", "10:30 - Free Intro Class", "11:30 - Open Gym"] },
];


// --- COMPOSANTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#why", label: "Le Concept" },
    { href: "#schedule", label: "Planning" },
    { href: "#pricing", label: "Tarifs" },
  ];

  return (
    <>
      {/* Navbar : Fond noir au scroll, texte blanc et accents LIME */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/95 backdrop-blur-md py-4 shadow-lg border-b border-zinc-800' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="font-sans text-3xl md:text-4xl tracking-tighter uppercase font-black italic text-white cursor-pointer relative z-50">
            IRON<span className="text-lime-400">FORGE</span>
          </span>
          
          <div className="hidden md:flex space-x-8 font-bold text-sm tracking-widest uppercase text-zinc-300">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="hover:text-lime-400 transition-colors">{link.label}</a>
            ))}
          </div>
          {/* Bouton CTA en Lime fluo */}
          <button className="hidden md:block px-8 py-3 skew-x-[-10deg] bg-lime-400 text-zinc-950 hover:bg-lime-300 transition-all uppercase text-sm font-black tracking-widest">
            <span className="skew-x-[10deg] block">Séance d'essai gratuite</span>
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden relative z-50 p-2 mr-[-8px]">
            {isMobileMenuOpen ? <X size={28} className="text-lime-400" /> : <Menu size={28} className="text-lime-400" />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Fullscreen Noir et Lime */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-40 bg-zinc-950 flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-10 font-sans text-3xl text-white font-black italic uppercase tracking-wider">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-lime-400 transition-colors">
                  {link.label}
                </a>
              ))}
              <button onClick={() => setIsMobileMenuOpen(false)} className="mt-12 px-10 py-4 bg-lime-400 text-zinc-950 uppercase text-lg font-black tracking-widest skew-x-[-10deg]">
                 <span className="skew-x-[10deg] block">Essai Gratuit</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-start bg-zinc-950">
      {/* Overlay sombre et puissant */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />
      
      {/* Image de fond dynamique (Crossfit/Action) */}
      <Image
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop"
        alt="Athlète en plein effort intense avec de la magnésie"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="relative z-20 px-6 md:px-12 max-w-4xl mt-20">
        <motion.p
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="font-bold tracking-[0.3em] uppercase text-lime-400 mb-4 flex items-center gap-3"
        >
          <span className="h-[2px] w-12 bg-lime-400 inline-block"></span> Plus qu'une salle de sport
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          // Typographie très agressive : Black, Italic, Tighter spacing
          className="font-sans font-black text-6xl sm:text-7xl md:text-9xl mb-8 leading-[0.9] text-white uppercase italic tracking-tighter"
        >
          Forge ton <br/> <span className="text-transparent bg-clip-text bg-gradient-to-br from-lime-300 to-lime-500">Héritage</span>.
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="px-10 py-5 bg-lime-400 text-zinc-950 hover:bg-lime-300 transition-all uppercase text-lg font-black tracking-widest skew-x-[-10deg] flex items-center justify-center gap-2 group">
            <span className="skew-x-[10deg] flex items-center gap-3">Rejoindre la meute <ArrowRight className="group-hover:translate-x-2 transition-transform"/></span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Section "Why us" avec des icônes fortes
const WhyUs = () => {
    const features = [
        { icon: <Dumbbell size={40} />, title: "Équipement Pro", desc: "Pas de machines guidées inutiles. Juste du fer, des barres olympiques et de l'espace pour performer." },
        { icon: <Users size={40} />, title: "Communauté Forte", desc: "On souffre ensemble, on progresse ensemble. L'ego reste à la porte, seule l'entraide compte." },
        { icon: <HeartPulse size={40} />, title: "Coaching Expert", desc: "Des coachs certifiés qui corrigent chaque mouvement pour garantir sécurité et résultats optimaux." },
    ];

  return (
    <section id="why" className="py-24 bg-zinc-950 text-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
            <h2 className="font-sans font-black text-4xl md:text-6xl text-white mb-6 uppercase italic tracking-tighter">
                Pourquoi <span className="text-lime-400">Iron Forge</span> ?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
                Nous ne sommes pas une salle de fitness classique. Ici, on vient pour se dépasser, suer et construire une vraie force fonctionnelle.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                    className="bg-zinc-900/50 border border-zinc-800 p-10 hover:border-lime-400/50 transition-all duration-500 group relative overflow-hidden"
                >
                    {/* Effet de fond au survol */}
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                        <div className="text-lime-400 mb-6 bg-zinc-800 w-fit p-4 rounded-sm shadow-lg shadow-lime-400/10 group-hover:scale-110 transition-transform">{f.icon}</div>
                        <h3 className="font-sans font-black text-2xl mb-4 text-white uppercase italic tracking-wide">{f.title}</h3>
                        <p className="text-zinc-400 leading-relaxed font-medium">{f.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
      {/* Image de fond texturée pour le style */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0 pointer-events-none"></div>
    </section>
  );
};


// NOUVELLE SECTION : SCHEDULE (Planning)
const Schedule = () => {
    return (
      <section id="schedule" className="py-24 bg-zinc-900 text-white border-y border-zinc-800 relative">
        <div className="container mx-auto px-6 z-10 relative">
          <div className="text-center mb-16">
            <h2 className="font-sans font-black text-4xl md:text-5xl text-white mb-4 uppercase italic tracking-tighter flex items-center justify-center gap-3">
                <Clock className="text-lime-400" size={40}/> Planning de la semaine
            </h2>
            <p className="text-zinc-400 font-medium">Des créneaux adaptés à tous les emplois du temps.</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHEDULE.map((daySlot, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-zinc-950 border-l-4 border-lime-400 p-6 hover:bg-zinc-800 transition-colors"
              >
                <h3 className="font-sans font-black text-2xl mb-6 text-white uppercase italic">{daySlot.day}</h3>
                <ul className="space-y-4">
                    {daySlot.classes.map((cls, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-zinc-300 font-bold tracking-wide">
                            <span className="h-2 w-2 bg-lime-400 rounded-full"></span> {cls}
                        </li>
                    ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">*Open Gym accessible en dehors des heures de cours.</p>
          </div>
        </div>
      </section>
    );
  };

// NOUVELLE SECTION : PRICING (Tarifs)
const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Gros texte en arrière plan pour le style */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black italic uppercase text-zinc-900/40 pointer-events-none whitespace-nowrap">
                No Pain No Gain
            </span>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="font-sans font-black text-4xl md:text-6xl text-white mb-6 uppercase italic tracking-tighter">
                        Investis en <span className="text-lime-400">toi-même</span>.
                    </h2>
                    <p className="text-zinc-400 text-lg font-medium">Des formules simples, sans engagement caché.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PRICING.map((plan, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                            // Si c'est l'offre "highlight", on change le style (bordure lime, fond légèrement différent)
                            className={`flex flex-col p-8 md:p-12 relative ${plan.highlight ? 'bg-zinc-900 border-2 border-lime-400 scale-105 shadow-2xl shadow-lime-400/20 z-20' : 'bg-zinc-900/50 border border-zinc-800 z-10'}`}
                        >
                            {plan.highlight && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lime-400 text-zinc-950 px-6 py-2 uppercase text-xs font-black tracking-widest skew-x-[-10deg]">
                                    Le plus populaire
                                </span>
                            )}
                            <h3 className="font-sans font-black text-2xl mb-2 text-white uppercase italic">{plan.name}</h3>
                            <p className="text-zinc-400 text-sm mb-8 font-medium">{plan.desc}</p>

                            <div className="mb-10">
                                <span className="text-5xl md:text-6xl font-black text-white italic tracking-tighter">{plan.price}€</span>
                                <span className="text-zinc-500 font-bold">{plan.period}</span>
                            </div>

                            <ul className="space-y-4 mb-12 flex-grow">
                                {plan.features.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-zinc-300 font-bold">
                                        {/* Checkmark Lime si highlight, sinon gris */}
                                        <CheckCircle2 className={`${plan.highlight ? 'text-lime-400' : 'text-zinc-600'} flex-shrink-0`} size={20}/> 
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 uppercase text-sm font-black tracking-widest skew-x-[-10deg] transition-all ${plan.highlight ? 'bg-lime-400 text-zinc-950 hover:bg-lime-300' : 'bg-zinc-800 text-white hover:bg-zinc-700 hover:text-lime-400'}`}>
                                <span className="skew-x-[10deg] block">Choisir {plan.name}</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// CTA Final et Footer
const Footer = () => (
  <footer className="bg-zinc-900 pt-24 pb-12 border-t border-zinc-800">
    {/* Section CTA Finale */}
    <div className="container mx-auto px-6 mb-20 text-center">
        <h2 className="font-sans font-black text-4xl md:text-7xl text-white uppercase italic tracking-tighter mb-8">
            PRÊT À <span className="text-lime-400">PASSER AU NIVEAU SUPÉRIEUR</span> ?
        </h2>
        <button className="px-12 py-6 bg-lime-400 text-zinc-950 hover:bg-lime-300 transition-all uppercase text-xl font-black tracking-widest skew-x-[-10deg] inline-block hover:scale-105">
            <span className="skew-x-[10deg]">Réserver ma séance d'essai</span>
        </button>
    </div>

    {/* Infos Footer */}
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-800/50 pt-12 text-zinc-500 text-sm font-bold uppercase tracking-widest">
      <div className="text-center md:text-left">
          <span className="font-sans font-black text-2xl text-white block mb-2 italic">IRON<span className="text-lime-400">FORGE</span></span>
          <p>© {new Date().getFullYear()} - No excuses. Just results.</p>
      </div>
      
      <div className="flex gap-8 font-black text-white">
        <a href="#" className="hover:text-lime-400 transition-colors">Instagram</a>
        <a href="#" className="hover:text-lime-400 transition-colors">Facebook</a>
        <a href="#" className="hover:text-lime-400 transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    // Fond noir global, sélection de texte en lime
    <main className="min-h-screen bg-zinc-950 font-sans selection:bg-lime-400 selection:text-zinc-950 overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhyUs />
      <Schedule />
      <Pricing />
      <Footer />
    </main>
  );
}