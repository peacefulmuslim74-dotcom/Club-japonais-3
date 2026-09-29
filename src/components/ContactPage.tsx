import React, { useState } from 'react';
import { ClubSettings, ContactMessage } from '../types/club';
import { Phone, Instagram, Facebook, Send, CheckCircle2, MessageSquare, MapPin } from 'lucide-react';

interface ContactPageProps {
  settings: ClubSettings;
  onSubmitMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  settings,
  onSubmitMessage,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Renseignement général');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    onSubmitMessage({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contact Channels (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF4F93] mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>CANAUX OFFICIELS</span>
                <span className="text-neutral-400">/</span>
                <span className="font-jp">連絡窓口</span>
              </div>

              <h1 className="font-horrendo text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
                CONTACTER LE CLUB
              </h1>

              <p className="text-xs sm:text-sm text-neutral-600 font-light mt-3 leading-relaxed">
                Pour toute question sur nos ateliers, inscriptions ou propositions culturelles,
                contactez directement le bureau du Senegal ISM Japan Club.
              </p>
            </div>

            {/* Direct Official Coordinates */}
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-3xl space-y-6">
              {/* Telephone */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  Ligne Téléphonique Officielle
                </span>
                <a
                  href={`tel:${settings.officialPhone.replace(/\s+/g, '')}`}
                  className="font-horrendo text-2xl font-bold text-neutral-950 hover:text-[#FF4F93] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-[#FF4F93]" />
                  <span>{settings.officialPhone}</span>
                </a>
                <span className="text-[11px] text-neutral-500 font-mono">Appel direct & WhatsApp</span>
              </div>

              {/* Instagram */}
              <div className="space-y-1 pt-4 border-t border-neutral-200">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  Instagram Officiel
                </span>
                <a
                  href="https://instagram.com/thenihongoclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-base text-neutral-950 hover:text-[#FF4F93] transition-colors flex items-center gap-2 font-mono"
                >
                  <Instagram className="w-5 h-5 text-[#FF4F93]" />
                  <span>{settings.instagramHandle}</span>
                </a>
              </div>

              {/* Facebook */}
              <div className="space-y-1 pt-4 border-t border-neutral-200">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  Page Facebook
                </span>
                <div className="font-semibold text-xs sm:text-sm text-neutral-950 flex items-center gap-2">
                  <Facebook className="w-5 h-5 text-[#FF4F93] shrink-0" />
                  <span>{settings.facebookPage}</span>
                </div>
              </div>

              {/* Activity Venue */}
              <div className="space-y-1 pt-4 border-t border-neutral-200 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  Lieu d'Activité Régulier
                </span>
                <div className="flex items-center gap-2 text-neutral-900 font-medium">
                  <MapPin className="w-4 h-4 text-[#FF4F93] shrink-0" />
                  <span>{settings.activityVenueName} (Point E, Dakar)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Contact Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-950 text-white border border-neutral-900 rounded-3xl p-8 sm:p-12 shadow-2xl">
              <h2 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                TRANSMETTRE UN MESSAGE
              </h2>
              <p className="text-xs text-neutral-400 font-light mb-8">
                Votre demande sera transmise de manière sécurisée aux responsables du club.
              </p>

              {submitted ? (
                <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#FF4F93] mx-auto" />
                  <h3 className="font-horrendo text-xl text-white">Message Transmis avec Succès</h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    Merci {fullName}. Les coordinateurs du Senegal ISM Japan Club prendront connaissance
                    de votre message et vous contacteront si nécessaire.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs text-white rounded-lg transition-colors font-mono"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF4F93]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Téléphone (optionnel)
                      </label>
                      <input
                        type="tel"
                        placeholder="+221 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF4F93]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Adresse E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@domaine.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF4F93]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Objet de la demande
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF4F93] cursor-pointer"
                    >
                      <option value="Renseignement général">Renseignement général sur le club</option>
                      <option value="Inscription atelier">Participation à un atelier (Shodō, Origami...)</option>
                      <option value="Proposition de collaboration">Proposition de partenariat / événement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Votre Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Détaillez votre message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF4F93]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#FF4F93] hover:bg-[#D91D69] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#FF4F93]/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmettre le Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
