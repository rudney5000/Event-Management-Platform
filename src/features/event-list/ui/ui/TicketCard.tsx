import { useState } from "react";
import type {EventFull} from "../../../../entities/event/model";
import {RegistrationForm} from "../../../registration/ui/RegistrationForm.tsx";

export function TicketCard({ event }: { event: EventFull }) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const isSoldOut = event.availableSeats === 0;

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
    setTimeout(() => {
      setRegistrationSuccess(false);
    }, 3000);
  };

  return (
      <>
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          {isSoldOut ? (
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-2xl font-bold">
                      {event.price ? `${event.price} ${event.currencyId || '€'}` : 'Gratuit'}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">Rejoindre la liste d'attente</p>
                  </div>
                  <span className="text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 rounded-full px-2.5 py-1">
                COMPLET
              </span>
                </div>
                <button
                    className="w-full py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
                    onClick={() => setShowRegistrationForm(true)}
                >
                  Liste d'attente
                </button>
              </div>
          ) : (
              <div className="p-5">
                <p className="text-2xl font-bold mb-1">
                  {event.price ? `${event.price} ${event.currencyId || '€'}` : 'Gratuit'}
                </p>
                {event.availableSeats !== undefined && (
                    <p className="text-gray-400 text-sm mb-4">
                      {event.availableSeats} places restantes
                    </p>
                )}

                {registrationSuccess && (
                    <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm text-center">
                      ✓ Inscription confirmée ! Vérifiez vos emails.
                    </div>
                )}

                <button
                    className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors"
                    onClick={() => setShowRegistrationForm(true)}
                >
                  {event.price && event.price > 0 ? "Acheter un billet" : "S'inscrire gratuitement"}
                </button>
              </div>
          )}
        </div>

        <RegistrationForm
            eventId={event.id}
            event={event}
            visible={showRegistrationForm}
            onClose={() => setShowRegistrationForm(false)}
            onSuccess={handleRegistrationSuccess}
        />
      </>
  );
}