import { useState } from "react";
import { X, Loader2, CheckCircle, CreditCard, Mail } from "lucide-react";
import {useRegisterMutation} from "../../../entities/registration/api";
import type {RegistrationResponse} from "../../../entities/registration/model/types.ts";
import type {EventFull} from "../../../entities/event/model";
import {eventsApi} from "../../../entities/event/api/eventsApi.ts";
import {useAppDispatch} from "../../../shared/hooks";

interface RegistrationFormValues {
    fullName: string;
    email: string;
    phone: string;
}

interface RegistrationFormProps {
    eventId: string;
    event: EventFull;
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function RegistrationForm({ eventId, event, visible, onClose, onSuccess }: RegistrationFormProps) {
    const [formData, setFormData] = useState<RegistrationFormValues>({
        fullName: "",
        email: "",
        phone: "",
    });
    const [errors, setErrors] = useState<Partial<RegistrationFormValues>>({});
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [register, { isLoading: isRegistering }] = useRegisterMutation();

    const isPaidEvent = event.price !== undefined && event.price > 0;
    const isLoading = isRegistering;

    const validateForm = (): boolean => {
        const newErrors: Partial<RegistrationFormValues> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Veuillez entrer votre nom";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Veuillez entrer votre email";
        } else if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email invalide";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Veuillez entrer votre téléphone";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof RegistrationFormValues]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const registrationResult: RegistrationResponse = await register({
                eventId: eventId,
                userName: formData.fullName,
                userEmail: formData.email,
                userPhone: formData.phone,
                userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            }).unwrap();

            const idKey = String(eventId);
            dispatch(
                eventsApi.endpoints.getEventById.initiate(idKey, { forceRefetch: true })
            );

            if (isPaidEvent && registrationResult.paymentRequired) {
                if (registrationResult.paymentLink) {
                    window.location.href = registrationResult.paymentLink;
                } else {
                    setCurrentStep(1);
                }
            } else {
                setRegistrationSuccess(true);
                onSuccess();

                setTimeout(() => {
                    onClose();
                    resetForm();
                }, 2000);
            }
        } catch (error: unknown) {
            const fromApi =
                error &&
                typeof error === "object" &&
                "data" in error &&
                error.data &&
                typeof error.data === "object" &&
                "message" in error.data &&
                typeof (error.data as { message: unknown }).message === "string"
                    ? (error.data as { message: string }).message
                    : null;
            const errorMessage =
                fromApi ??
                (error instanceof Error ? error.message : null) ??
                "Erreur lors de l'inscription. Veuillez réessayer.";
            console.error("Registration error:", error);
            alert(errorMessage);
        }
    };

    const resetForm = () => {
        setFormData({ fullName: "", email: "", phone: "" });
        setErrors({});
        setCurrentStep(0);
        setRegistrationSuccess(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!visible) return null;

    if (registrationSuccess && !isPaidEvent) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="relative w-full max-w-md bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8 text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Inscription confirmée !
                            </h3>
                            <p className="text-gray-400">
                                Votre inscription pour <span className="text-[#f5c518]">{event.title}</span> a bien été enregistrée.
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-center justify-center gap-2 text-gray-300">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">
                  Un email de confirmation a été envoyé à {formData.email}
                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-full px-6 py-3 bg-[#f5c518] hover:bg-[#f5c518]/90 text-black font-semibold rounded-lg transition-colors"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-black border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Inscription - {event.title}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {currentStep === 0
                                ? "Remplissez vos informations"
                                : isPaidEvent
                                    ? "Paiement en attente"
                                    : "Confirmation"}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {isPaidEvent && (
                    <div className="px-6 pt-6">
                        <div className="flex items-center gap-2">
                            <div className={`flex-1 h-1 rounded-full transition-all ${
                                currentStep >= 0 ? "bg-[#f5c518]" : "bg-white/20"
                            }`} />
                            <div className={`flex-1 h-1 rounded-full transition-all ${
                                currentStep >= 1 ? "bg-[#f5c518]" : "bg-white/20"
                            }`} />
                        </div>
                        <div className="flex justify-between mt-2 text-xs">
              <span className={currentStep >= 0 ? "text-[#f5c518]" : "text-gray-500"}>
                Informations
              </span>
                            <span className={currentStep >= 1 ? "text-[#f5c518]" : "text-gray-500"}>
                Paiement
              </span>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {currentStep === 0 ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Nom complet <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Jean Dupont"
                                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                                        errors.fullName ? "border-red-500" : "border-white/10"
                                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f5c518] transition-colors`}
                                />
                                {errors.fullName && (
                                    <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="jean@example.com"
                                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                                        errors.email ? "border-red-500" : "border-white/10"
                                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f5c518] transition-colors`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Téléphone <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+33 6 12 34 56 78"
                                    className={`w-full px-4 py-2.5 bg-white/5 border ${
                                        errors.phone ? "border-red-500" : "border-white/10"
                                    } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#f5c518] transition-colors`}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                                )}
                            </div>

                            {isPaidEvent ? (
                                <div className="bg-[#f5c518]/10 border border-[#f5c518]/20 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-[#f5c518]" />
                                            <span className="text-sm text-gray-300">Total à payer</span>
                                        </div>
                                        <span className="text-lg font-bold text-[#f5c518]">
                      {event.price} {event.currencyId ?? '€'}
                    </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Vous recevrez un lien de paiement par email après confirmation
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        <span className="text-sm text-gray-300">Événement gratuit</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Aucun paiement requis. Vous recevrez un email de confirmation.
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 px-4 py-2.5 border border-white/20 rounded-lg text-white hover:bg-white/5 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2.5 bg-[#f5c518] hover:bg-[#f5c518]/90 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Confirmation...</span>
                                        </>
                                    ) : (
                                        <span>Confirmer l'inscription</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-8 space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-[#f5c518]/20 rounded-full flex items-center justify-center">
                                    <Mail className="w-8 h-8 text-[#f5c518]" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    Inscription en attente de paiement
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Un email avec un lien de paiement a été envoyé à <span className="text-[#f5c518]">{formData.email}</span>.
                                </p>
                                <p className="text-gray-500 text-xs mt-2">
                                    Vous avez 24h pour finaliser votre paiement.
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="mt-4 px-6 py-2.5 bg-[#f5c518] hover:bg-[#f5c518]/90 text-black font-semibold rounded-lg transition-colors"
                            >
                                Fermer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}