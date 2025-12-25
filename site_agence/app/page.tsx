'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Menu, X, Instagram, Linkedin, Twitter } from 'lucide-react';

// --- DATA & CONFIGURATION ---
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Maison Blanche",
    category: "Architecture",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    desc: "Minimalisme et lumière naturelle."
  },
  {
    id: 2,
    title: "Neon Future",
    category: "Branding",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    desc: "Identité visuelle cyber-punk."
  },
  {
    id: 3,
    title: "Eco Resort",
    category: "Hôtellerie",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    desc: "Luxe durable en pleine nature."
  }
];

const SERVICES = [
  { title: "Stratégie Digitale", desc: "Audit et roadmap pour votre croissance.", icon: "🚀" },
  { title: "Design UI/UX", desc: "Interfaces centrées sur l'émotion utilisateur.", icon: "✨" },
  { title: "Développement", desc: "Solutions web robustes et scalables.", icon: "💻" },
  { title: "Création de Contenu", desc: "Photographie et vidéo haut de gamme.", icon: "📸" }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className={`text-2xl font-bold tracking-tighter ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
          LUMINA<span className="text-indigo-500">.</span>
        </h1>
        
        {/* Desktop Menu */}
        <div className={`hidden md:flex space-x-8 font-medium ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
          {['À propos', 'Services', 'Projets', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-500 transition-colors">
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-indigo-500">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col space-y-4"
          >
            {['À propos', 'Services', 'Projets', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-gray-800 font-medium text-lg">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Parallax */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
          alt="Office Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-semibold mb-6">
            AGENCE DIGITALE PREMIUM
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Nous transformons <br />
            vos idées en <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">réalité digitale</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
            Une approche sur-mesure pour les marques ambitieuses. Design, développement et stratégie sans compromis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
              Démarrer un projet <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white rounded-lg font-semibold transition-all">
              Voir nos réalisations
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Services = () => (
  <section id="services" className="py-24 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Expertise</h2>
        <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICES.map((service, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border border-gray-100"
          >
            <div className="text-4xl mb-6 bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Showcase = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="projets" className="py-24 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Projets Récents</h2>
          <p className="text-gray-400">Une sélection de nos meilleures collaborations.</p>
        </div>
        <div className="hidden md:flex gap-2">
           {/* Navigation buttons could go here */}
        </div>
      </div>

      <div className="relative w-full h-[500px] md:h-[600px]">
         <div className="absolute inset-0 flex items-center justify-center">
            {PORTFOLIO_ITEMS.map((item, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={item.id}
                  className={`absolute w-[80%] md:w-[60%] h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl ${isActive ? 'z-20' : 'z-10'}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: isActive ? 1 : 0.85, 
                    opacity: isActive ? 1 : 0.4,
                    x: isActive ? 0 : index < active ? -100 : 100 // Simple offset logic
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => setActive(index)}
                >
                  <Image src={item.src} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <span className="text-indigo-400 font-medium tracking-wider text-sm mb-2 uppercase">{item.category}</span>
                    <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
         </div>
         
         <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-30">
            {PORTFOLIO_ITEMS.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setActive(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === active ? 'bg-indigo-500 w-8' : 'bg-gray-600'}`}
              />
            ))}
         </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Contact Info */}
        <div className="lg:w-1/3 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Parlons de votre projet</h2>
            <p className="text-gray-600 text-lg">Nous sommes toujours à la recherche de nouveaux défis. Remplissez le formulaire et nous vous répondrons sous 24h.</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><Mail size={24}/></div>
              <div>
                <h4 className="font-bold text-gray-900">Email</h4>
                <p className="text-gray-600">hello@lumina.agency</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><Phone size={24}/></div>
              <div>
                <h4 className="font-bold text-gray-900">Téléphone</h4>
                <p className="text-gray-600">+33 1 23 45 67 89</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><MapPin size={24}/></div>
              <div>
                <h4 className="font-bold text-gray-900">Bureau</h4>
                <p className="text-gray-600">12 Avenue des Champs, Paris</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:w-2/3 bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Nom complet</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="Jean Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="jean@exemple.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Type de projet</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white">
                <option>Site Vitrine</option>
                <option>E-commerce</option>
                <option>Application Mobile</option>
                <option>Autre</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none" placeholder="Dites-nous en plus..." />
            </div>

            <button type="button" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1">
              Envoyer le message
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-white mb-2">LUMINA.</h2>
          <p className="text-sm">Créons l'exceptionnel ensemble.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Lumina Agency. Tous droits réservés. Template Premium.
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Showcase />
      <Contact />
      <Footer />
    </main>
  );
}