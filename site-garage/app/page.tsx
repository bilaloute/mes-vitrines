'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Instagram, Facebook, Clock, ArrowRight, Menu, X, Wrench, Car, Gauge, ShieldCheck } from 'lucide-react';

// --- DONNÉES DU SITE ---

const GALLERY = [
  { 
    // Image 1 : Mécanicien sur moteur
    src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800&auto=format&fit=crop", 
    span: "md:row-span-2", 
    alt: "Mécanique de précision moteur" 
  },
  { 
    // Image 2 : Voiture de sport
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop", 
    span: "md:row-span-1", 
    alt: "Véhicule de sport en atelier" 
  },
  { 
    // Image 3 : Diagnostic Électronique
    src: "https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=800&auto=format&fit=crop", 
    span: "md:row-span-1", 
    alt: "Diagnostic électronique valise" 
  },
  { 
    // Image 4 REMPLACÉE (Ton lien 'plus.unsplash.com')
    src: "https://plus.unsplash.com/premium_photo-1677009541707-c805a3ddf197?q=80&w=1170&auto=format&fit=crop", 
    span: "md:row-span-2", 
    alt: "Expertise mécanique avancée" 
  },
  { 
    // Image 5 REMPLACÉE (Ton lien 'images.unsplash.com')
    src: "https://images.unsplash.com/photo-1645445522156-9ac06bc7a767?q=80&w=1740&auto=format&fit=crop", 
    span: "md:row-span-1", 
    alt: "Entretien technique véhicule" 
  },
];

const SERVICES = [
  { 
    title: "Entretien & Vidange", 
    desc: "Révision constructeur, vidange huile premium et remplacement des filtres pour préserver votre moteur.",
    icon: <Wrench />
  },
  { 
    title: "Diagnostic Électronique", 
    desc: "Valise diagnostic dernière génération pour identifier et corriger les voyants et pannes complexes.",
    icon: <Gauge />
  },
  { 
    title: "Pneumatiques & Freinage", 
    desc: "Montage, équilibrage et géométrie. Remplacement plaquettes et disques pour votre sécurité.",
    icon: <Car />
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
    { href: "#about", label: "L'Atelier" },
    { href: "#gallery", label: "Réalisations" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Rendez-vous" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-900/95 backdrop-blur-md py-4 shadow-md border-b border-slate-800' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <span className="font-sans text-xl md:text-2xl tracking-tighter uppercase font-black text-white cursor-pointer relative z-50">
            MÉCA<span className="text-blue-500">PRO</span>
          </span>
          
          <div className="hidden md:flex space-x-8 font-medium text-sm tracking-wide uppercase text-slate-300">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
          <button className={`hidden md:block px-6 py-2 rounded-sm border transition-all uppercase text-xs font-bold tracking-widest ${isScrolled ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : 'border-white text-white hover:bg-white hover:text-slate-900'}`}>
            01 23 45 67 89
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden relative z-50 p-2 mr-[-8px]">
            {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900 flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col items-center space-y-8 font-sans text-2xl text-white font-bold uppercase tracking-wider">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-500 transition-colors">
                  {link.label}
                </a>
              ))}
              <button onClick={() => setIsMobileMenuOpen(false)} className="mt-8 px-8 py-3 bg-blue-600 uppercase text-sm tracking-widest font-sans rounded-sm">
                Appeler l'atelier
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
    <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-950/95 z-10" />
      
      <Image
        src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1920&auto=format&fit=crop"
        alt="Mécanicien travaillant sur un moteur dans un garage premium"
        fill
        className="object-cover"
        priority
      />

      <div className="relative z-20 text-center px-4 mt-16 md:mt-0 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="w-12 h-[2px] bg-blue-500"></span>
          <p className="font-bold tracking-[0.2em] uppercase text-xs md:text-sm text-blue-400">
            Expertise & Passion Automobile
          </p>
          <span className="w-12 h-[2px] bg-blue-500"></span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
          className="font-sans font-black text-4xl sm:text-6xl md:text-8xl mb-8 leading-none text-white uppercase italic"
        >
          Performance <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Assurée</span>.
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row justify-center gap-4"
        >
          <a href="#contact" className="px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors uppercase text-sm font-bold tracking-widest rounded-sm">
            Prendre rendez-vous
          </a>
          <a href="#services" className="px-8 py-4 border border-slate-500 text-slate-300 hover:border-white hover:text-white transition-colors uppercase text-sm font-bold tracking-widest rounded-sm">
            Nos Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-100 z-0 hidden md:block"></div>
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="relative h-[300px] md:h-[450px] w-full z-10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=800&auto=format&fit=crop" 
                alt="Mécanicien expert" 
                fill 
                className="object-cover shadow-2xl rounded-sm"
              />
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-slate-900 uppercase leading-tight">
              La mécanique,<br/> une affaire de confiance.
            </h2>
            <div className="w-16 h-1 bg-blue-600"></div>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              Bien plus qu'un simple garage, <strong>MÉCAPRO</strong> est un centre technique dédié à la longévité de votre véhicule. 
              Installés depuis 10 ans, nous traitons chaque voiture comme si c'était la nôtre.
            </p>
            <ul className="space-y-3 text-slate-700 font-medium">
              <li className="flex items-center gap-2"><ShieldCheck className="text-blue-600" size={20}/> Garantie constructeur préservée</li>
              <li className="flex items-center gap-2"><ShieldCheck className="text-blue-600" size={20}/> Pièces d'origine ou équivalentes</li>
              <li className="flex items-center gap-2"><ShieldCheck className="text-blue-600" size={20}/> Transparence totale sur les devis</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <h2 className="font-sans font-bold text-3xl text-slate-900 mb-2 uppercase">L&apos;Atelier en action</h2>
           <p className="text-slate-500">Rigueur, propreté et technicité.</p>
        </div>
        <button className="text-blue-600 font-bold uppercase text-xs tracking-widest hover:text-blue-800 transition-colors flex items-center gap-2">
            Voir sur Instagram <ArrowRight size={16}/>
        </button>
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
              className={`relative group overflow-hidden ${item.span} bg-slate-200 shadow-md rounded-sm`}
            >
              <Image 
                src={item.src} 
                alt={item.alt} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-[0.5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-bold uppercase text-xs tracking-wider">{item.alt}</span>
              </div>
            </motion.div>
          ))}
          
          <div className="row-span-1 md:col-span-1 bg-slate-900 flex flex-col justify-center items-center p-6 text-center shadow-md rounded-sm">
            <Instagram className="text-white mb-4" size={28} />
            <p className="font-sans font-bold text-white text-sm mb-2 uppercase">Suivez nos chantiers</p>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">@MecaPro_Garage</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => (
  <section id="services" className="py-16 md:py-24 bg-slate-900 text-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-white mb-4 uppercase">Nos Prestations</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Nous intervenons sur toutes marques de véhicules, des citadines aux sportives, avec le même niveau d'exigence.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {SERVICES.map((s, i) => (
          <div key={i} className="bg-slate-800 p-8 border-b-4 border-transparent hover:border-blue-500 transition-all duration-300 group hover:-translate-y-2 rounded-sm">
            <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(s.icon, { size: 48, strokeWidth: 1.5 })}
            </div>
            <h3 className="font-sans font-bold text-xl mb-4 text-white uppercase tracking-wide">{s.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          <div className="lg:w-1/3 space-y-10 order-2 lg:order-1">
            <div>
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-slate-900 mb-6 uppercase">Contact & Accès</h2>
              <p className="text-slate-600 leading-relaxed">
                Une panne ? Un bruit suspect ? Passez nous voir directement sans rendez-vous pour un pré-diagnostic rapide.
              </p>
            </div>
            
            <div className="space-y-8 py-8 border-t border-b border-slate-100">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-slate-100 rounded-full group-hover:bg-blue-100 transition-colors">
                    <MapPin className="text-slate-900 group-hover:text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wide mb-1">L'Atelier</h4>
                  <p className="text-slate-600 font-medium">12 Zone Industrielle Nord,<br/>75000 Ville-Exemple</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-slate-100 rounded-full group-hover:bg-blue-100 transition-colors">
                    <Clock className="text-slate-900 group-hover:text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wide mb-1">Horaires</h4>
                  <p className="text-slate-600 font-medium text-sm">Lun - Ven : 08h00 - 18h30 <br/> Samedi : 09h00 - 12h00</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-slate-100 rounded-full group-hover:bg-blue-100 transition-colors">
                    <Phone className="text-slate-900 group-hover:text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wide mb-1">Urgence / RDV</h4>
                  <p className="text-slate-900 font-bold text-xl">01 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 order-1 lg:order-2">
            <form className="bg-slate-50 p-6 md:p-10 border border-slate-200 rounded-sm shadow-sm">
               <h3 className="font-sans font-bold text-2xl text-slate-900 mb-8 uppercase flex items-center gap-2">
                 <Wrench size={20} className="text-blue-600"/> Demande de devis
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Nom complet</label>
                    <input type="text" className="w-full bg-white text-slate-900 border border-slate-300 p-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all rounded-sm font-medium" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Email</label>
                    <input type="email" className="w-full bg-white text-slate-900 border border-slate-300 p-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all rounded-sm font-medium" placeholder="votre@email.com" />
                  </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Immatriculation (Optionnel)</label>
                        <input type="text" className="w-full bg-white text-slate-900 border border-slate-300 p-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all rounded-sm font-medium uppercase" placeholder="AB-123-CD" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Type d'intervention</label>
                        <select className="w-full bg-white text-slate-900 border border-slate-300 p-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all rounded-sm font-medium">
                            <option>Révision / Vidange</option>
                            <option>Freinage</option>
                            <option>Pneumatiques</option>
                            <option>Diagnostic Panne</option>
                            <option>Carrosserie</option>
                            <option>Autre demande</option>
                        </select>
                    </div>
               </div>

               <div className="space-y-2 mb-8">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Détails du problème</label>
                  <textarea rows={4} className="w-full bg-white text-slate-900 border border-slate-300 p-4 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none rounded-sm font-medium" placeholder="Décrivez les symptômes (bruit, voyant allumé, etc.)"></textarea>
               </div>
               
               <button type="button" className="w-full md:w-auto px-10 bg-blue-600 text-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-200 flex justify-center items-center gap-3 rounded-sm">
                  Envoyer ma demande <ArrowRight size={18} />
               </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
          <span className="font-sans font-bold text-xl text-white block mb-2 uppercase">MécaPro</span>
          <p className="text-sm">© {new Date().getFullYear()} Garage MécaPro. Tous droits réservés.</p>
      </div>
      
      <div className="flex gap-6">
        <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
            <Instagram size={20} />
        </div>
        <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
            <Facebook size={20} />
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
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