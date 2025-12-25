'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Instagram, Facebook, Clock, ArrowRight, Menu, X } from 'lucide-react';

// --- DONNÉES DU SITE ---

const GALLERY = [
  { 
    // IMAGE 1 CORRIGÉE : Intérieur de boutique très fleuri et coloré
    src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop", 
    span: "md:row-span-2", 
    alt: "Étalage de fleurs fraîches colorées dans la boutique" 
  },
  { 
    // Image 2 conservée (fleurs blanches en boutique)
    src: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=800&auto=format&fit=crop", 
    span: "md:row-span-1", 
    alt: "Fleurs fraîches en boutique" 
  },
  { 
    // IMAGE 3 CORRIGÉE : Mains de fleuriste arrangeant un bouquet coloré
    src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop", 
    span: "md:row-span-1", 
    alt: "Fleuriste arrangeant un bouquet coloré" 
  },
  { 
    // Image 4 conservée (détail texture)
    src: "https://images.unsplash.com/photo-1589244159943-460088ed5c92?q=80&w=800&auto=format&fit=crop", 

    span: "md:row-span-2", 
    alt: "Détail floral texture" 
  },
  { 
    // Image 5 conservée (ambiance atelier)
    src: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=800&auto=format&fit=crop", 
    span: "md:row-span-1", 
    alt: "Ambiance atelier lumineuse" 
  },
];

const SERVICES = [
  { 
    title: "Mariages & Événements", 
    desc: "De la boutonnière à l'arche florale. Nous créons une scénographie végétale qui vous ressemble pour vos grands moments.",
    icon: "💍"
  },
  { 
    title: "Bouquets sur Mesure", 
    desc: "Passez en boutique composer votre bouquet avec nos fleurs de saison, ou laissez-nous carte blanche selon votre budget.",
    icon: "💐"
  },
  { 
    title: "Ateliers Découverte", 
    desc: "Venez apprendre les bases de l'art floral (couronnes, bouquets ronds) lors de nos soirées mensuelles à l'atelier.",
    icon: "✂️"
  },
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
    { href: "#about", label: "L'Esprit" },
    { href: "#gallery", label: "Galerie" },
    { href: "#services", label: "Prestations" },
    { href: "#contact", label: "Nous trouver" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm text-stone-800' : 'bg-transparent py-6 md:py-8 text-white'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="font-serif text-xl md:text-2xl tracking-widest uppercase font-bold cursor-pointer relative z-50">L&apos;Atelier Floral</span>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-light text-sm tracking-wide uppercase">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="hover:text-green-700 transition-colors">{link.label}</a>
            ))}
          </div>
          <button className={`hidden md:block px-6 py-2 rounded-none border transition-all uppercase text-xs tracking-widest ${isScrolled ? 'border-stone-800 hover:bg-stone-800 hover:text-white' : 'border-white hover:bg-white hover:text-stone-900'}`}>
            Prendre RDV
          </button>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden relative z-50 p-2 mr-[-8px]">
            {isMobileMenuOpen ? <X size={24} color={isScrolled ? '#292524' : 'white'} /> : <Menu size={24} color={isScrolled ? '#292524' : 'white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-8 font-serif text-2xl text-stone-800">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-green-800 transition-colors">
                  {link.label}
                </a>
              ))}
              <button onClick={() => setIsMobileMenuOpen(false)} className="mt-8 px-8 py-3 border border-stone-800 uppercase text-sm tracking-widest font-sans hover:bg-stone-800 hover:text-white transition-colors">
                Prendre RDV
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
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-stone-900">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <Image
        src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?q=80&w=1173&auto=format&fit=crop"
        alt="Intérieur boutique fleuriste sombre"
        fill
        className="object-cover"
        priority
      />

      <div className="relative z-20 text-center px-4 drop-shadow-xl mt-16 md:mt-0">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="font-light tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 text-xs md:text-sm text-stone-100"
        >
          Fleuriste Créateur • Paris
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl mb-8 leading-tight text-white"
        >
          Des fleurs,<br/> tout simplement.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        >
          <a href="#contact" className="inline-block border-b-2 border-white pb-1 text-white hover:text-green-200 hover:border-green-200 transition-colors uppercase text-xs md:text-sm tracking-widest font-semibold">
            Visiter la boutique
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#FDFCF8] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative h-[350px] md:h-[500px] w-full"
            >
              <Image 
                src="https://images.unsplash.com/photo-1593011951342-8426e949371f?w=800&auto=format&fit=crop" 
                alt="Artisan fleuriste au travail" 
                fill 
                className="object-cover shadow-xl"
              />
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 leading-tight">
              L&apos;artisanat au cœur de notre démarche.
            </h2>
            <div className="w-12 h-1 bg-green-800 mb-6 mx-auto md:mx-0"></div>
            <p className="text-stone-600 leading-relaxed text-base md:text-lg font-light">
              Nous ne sommes pas une chaîne, mais un atelier indépendant. 
              Chaque matin, nous sélectionnons nos fleurs pour leur caractère, leur parfum et leur tenue.
            </p>
            <p className="text-stone-600 leading-relaxed text-base md:text-lg font-light">
              Que ce soit pour célébrer un mariage, dire adieu, ou simplement embellir votre salon, 
              nous mettons la même passion dans chaque composition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    // CHANGEMENT ICI : bg-stone-100 (gris beige léger) au lieu de bg-white
    // Cela crée une vraie différence visuelle avec la section du dessus
    <section id="gallery" className="py-16 md:py-24 bg-stone-100">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           {/* J'ai ajouté un petit tiret décoratif au dessus du titre pour marquer le début */}
           <div className="w-8 h-1 bg-green-900 mb-4 md:hidden"></div>
           <h2 className="font-serif text-3xl text-stone-900 mb-2">Instants Capturés</h2>
           <p className="text-stone-500 font-light">Un aperçu de la vie à l&apos;atelier.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {GALLERY.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative group overflow-hidden ${item.span} bg-white shadow-md`}
            >
              <Image 
                src={item.src} 
                alt={item.alt} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
          ))}
          
          {/* CHANGEMENT ICI : Fond blanc (bg-white) pour contraster avec le fond gris de la section */}
          <div className="row-span-1 md:col-span-1 bg-white flex flex-col justify-center items-center p-6 text-center border border-stone-200 shadow-sm">
            <Instagram className="text-stone-800 mb-4" size={24} />
            <p className="font-serif text-stone-600 italic text-sm mb-4">&quot;Suivez nos aventures quotidiennes.&quot;</p>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-green-800 cursor-pointer transition-colors">@AtelierFloral</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => (
  <section id="services" className="py-16 md:py-24 bg-stone-900 text-stone-100">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Nos Prestations</h2>
        <p className="text-stone-400 font-light">Du simple bouquet aux grands décors.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {SERVICES.map((s, i) => (
          <div key={i} className="bg-stone-800/50 p-8 border border-stone-800 hover:border-green-900/50 transition-colors group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
            <h3 className="font-serif text-xl md:text-2xl mb-4 text-white">{s.title}</h3>
            <p className="text-stone-400 font-light leading-relaxed text-sm md:text-base">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FDFCF8]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          <div className="lg:w-1/3 space-y-10 order-2 lg:order-1">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">Contactez-nous</h2>
              <p className="text-stone-600 font-light leading-relaxed">
                Pour une commande spécifique, un devis mariage, ou juste pour dire bonjour, le mieux est de passer nous voir.
              </p>
            </div>
            
            <div className="space-y-8 py-6 border-t border-b border-stone-200">
              <div className="flex items-start gap-4">
                <MapPin className="text-green-900 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-stone-900 uppercase text-xs tracking-wide mb-1">L'Adresse</h4>
                  <p className="text-stone-600 font-serif text-lg">42 Rue des Lilas, Paris 75011</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-green-900 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-stone-900 uppercase text-xs tracking-wide mb-1">Horaires d'ouverture</h4>
                  <p className="text-stone-600 text-sm leading-relaxed">Mardi - Samedi : 10h - 19h30 <br/> Dimanche : 10h - 13h00 <br/> <span className="italic text-stone-400">Fermé le Lundi</span></p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-green-900 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-stone-900 uppercase text-xs tracking-wide mb-1">Nous appeler</h4>
                  <p className="text-stone-600 font-serif text-lg">01 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 order-1 lg:order-2">
            <form className="bg-white p-6 md:p-10 shadow-xl shadow-stone-200/40 border border-stone-50 rounded-sm">
               <h3 className="font-serif text-2xl text-stone-900 mb-8 md:hidden">Envoyez-nous un message</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-stone-500">Nom complet <span className="text-red-400">*</span></label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-stone-50 text-stone-900 border border-stone-200 p-4 focus:outline-none focus:border-stone-500 focus:bg-white transition-colors rounded-sm placeholder:text-stone-300" 
                      placeholder="Votre nom" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-stone-500">Email <span className="text-red-400">*</span></label>
                    <input 
                      type="email"
                      required 
                      className="w-full bg-stone-50 text-stone-900 border border-stone-200 p-4 focus:outline-none focus:border-stone-500 focus:bg-white transition-colors rounded-sm placeholder:text-stone-300" 
                      placeholder="votre@email.com" 
                    />
                  </div>
               </div>
               
               <div className="space-y-2 mb-6">
                  <label className="text-xs font-bold uppercase tracking-wide text-stone-500">Sujet</label>
                  <select className="w-full bg-stone-50 text-stone-900 border border-stone-200 p-4 focus:outline-none focus:border-stone-500 focus:bg-white transition-colors rounded-sm appearance-none">
                    <option>Renseignement Mariage</option>
                    <option>Commande Bouquets</option>
                    <option>Inscription Atelier</option>
                    <option>Autre demande</option>
                  </select>
               </div>

               <div className="space-y-2 mb-8">
                  <label className="text-xs font-bold uppercase tracking-wide text-stone-500">Message <span className="text-red-400">*</span></label>
                  <textarea 
                    rows={5}
                    required 
                    className="w-full bg-stone-50 text-stone-900 border border-stone-200 p-4 focus:outline-none focus:border-stone-500 focus:bg-white transition-colors resize-none rounded-sm placeholder:text-stone-300" 
                    placeholder="Comment pouvons-nous vous aider ?"
                  ></textarea>
               </div>
               
               <button type="submit" className="w-full md:w-auto px-8 bg-stone-900 text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-green-900 transition-colors flex justify-center items-center gap-3 rounded-sm">
                  Envoyer le message <ArrowRight size={18} />
               </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-stone-50 border-t border-stone-100 text-stone-500 py-12">
    <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
          <span className="font-serif text-lg text-stone-900 block mb-2">L&apos;Atelier Floral</span>
          <p className="text-sm font-light">© {new Date().getFullYear()}. Fait avec amour à Paris.</p>
      </div>
      
      <div className="flex gap-8">
        <a href="#" className="hover:text-green-900 hover:scale-110 transition-all"><Instagram size={22} /></a>
        <a href="#" className="hover:text-green-900 hover:scale-110 transition-all"><Facebook size={22} /></a>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}