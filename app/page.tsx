"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Award, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Shield, Star, Target, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Notification } from "@/components/notification"

// Types pour le formulaire
type FormData = {
  service: string
  name: string
  email: string
  phone: string
  date: string
  address: string
  details: string
}

type FormErrors = {
  [key in keyof FormData]?: string
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // État pour le carrousel
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      image: "/images/before-after-hallway.png",
      title: "Nettoyage de copropriété",
      description: "Transformation complète des parties communes pour un environnement propre et accueillant",
    },
    {
      image: "/images/before-after-car.png",
      title: "Nettoyage intérieur de véhicule",
      description: "Remise à neuf complète de l'intérieur de votre véhicule",
    },
    {
      image: "/images/before-after-room.png",
      title: "Débarras et nettoyage",
      description: "Service complet de débarras et nettoyage pour tous types de locaux",
    },
  ]

  // États pour le formulaire
  const [formData, setFormData] = useState<FormData>({
    service: "",
    name: "",
    email: "",
    phone: "",
    date: "",
    address: "",
    details: "",
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    let isValid = true

    if (!formData.service) {
      errors.service = "Veuillez sélectionner un service"
      isValid = false
    }
    if (!formData.name) {
      errors.name = "Veuillez entrer votre nom"
      isValid = false
    }
    if (!formData.email) {
      errors.email = "Veuillez entrer votre email"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide"
      isValid = false
    }
    if (!formData.phone) {
      errors.phone = "Veuillez entrer votre numéro de téléphone"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      console.log("Envoi du formulaire...")
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      let data
      try {
        data = await response.json()
      } catch (e) {
        throw new Error("Erreur lors de l'analyse de la réponse")
      }

      if (!response.ok) {
        const errorMessage = data?.details || data?.error || "Une erreur inconnue est survenue"
        throw new Error(errorMessage)
      }

      // Réinitialiser le formulaire
      setFormData({
        service: "",
        name: "",
        email: "",
        phone: "",
        date: "",
        address: "",
        details: "",
      })

      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error)
      setSubmitError(error instanceof Error ? error.message : "Une erreur est survenue")
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0A] text-white overflow-hidden">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrollY > 50 ? "backdrop-blur-xl bg-black/80 border-b border-yellow-500/10" : "bg-transparent",
        )}
      >
        <div className="container flex h-24 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200">
              CI.NETTOYAGE
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400">
              <Image
                src="https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/27093092/93a249a0.jpeg"
                alt="Logo CI.NETTOYAGE"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero avec image en arrière-plan positionnée à droite et dégradé de gauche à droite */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40 z-10"></div>
          <Image
            src="/images/ci-nettoyage-worker.png"
            alt="CI NETTOYAGE - Professionnel du nettoyage"
            fill
            className="object-cover"
            style={{ objectPosition: "right center" }}
            priority
          />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-sm">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-300">Service d'excellence dans tout le Var</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
                <span className="block">Redéfinir</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200">
                  l'art du nettoyage
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                CI.NETTOYAGE combine technologie avancée et expertise humaine pour des espaces impeccables dans tout le
                Var.
              </p>

              <div className="flex flex-wrap gap-4 pt-6">
                <Button
                  onClick={() => {
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="relative overflow-hidden group bg-yellow-400 text-black hover:bg-yellow-400 px-8 py-7 text-lg rounded-xl"
                >
                  <span className="relative z-10 font-medium">Demander un devis</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>

              {/* Stats grid with icons */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="flex justify-center mb-2">
                    <Award className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-300">Savoir-faire reconnu</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="flex justify-center mb-2">
                    <Shield className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-300">Clients fidèles</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="flex justify-center mb-2">
                    <Target className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-300">Résultats garantis</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} id="services" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-yellow-300">Nos expertises dans tout le Var</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 max-w-2xl">
              Des{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                solutions
              </span>{" "}
              adaptées à tous vos besoins
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl">
              Découvrez notre gamme complète de services de nettoyage professionnel dans le Var
            </p>
          </motion.div>

          {/* Services grid with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ménage débarras",
                description: "Service complet de nettoyage et débarras pour votre domicile dans tout le Var.",
              },
              {
                title: "Nettoyage copropriété",
                description: "Entretien régulier des parties communes de votre copropriété dans le Var.",
              },
              {
                title: "Nettoyage locaux",
                description: "Nettoyage professionnel de vos locaux commerciaux et bureaux dans tout le Var.",
              },
              {
                title: "Nettoyage de vitre",
                description: "Service spécialisé pour des vitres impeccables et étincelantes dans le Var.",
              },
              {
                title: "Nettoyage fin de chantier",
                description: "Remise en état après travaux pour un espace prêt à l'emploi dans toute la région PACA.",
              },
              {
                title: "Débarras",
                description: "Service de débarras complet incluant l'évacuation des déchets dans tout le Var.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-sm border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 hover:border-yellow-400/30 transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center overflow-hidden">
                    <CheckCircle className="h-7 w-7 text-yellow-400" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Why Choose Us avec carrousel */}
      <section className="py-32 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Carrousel */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-yellow-400/20 bg-black/40">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>

                    {/* Texte du slide */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                      <p className="text-sm text-gray-200">{slide.description}</p>
                    </div>
                  </div>
                ))}

                {/* Contrôles du carrousel */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  aria-label="Slide précédent"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  aria-label="Slide suivant"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Indicateurs */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-yellow-400 w-4" : "bg-white/50"}`}
                      aria-label={`Aller au slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-sm">
                <span className="text-sm font-medium text-yellow-300">Pourquoi nous choisir</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Une approche{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                  innovante
                </span>{" "}
                du nettoyage
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                Chez CI.NETTOYAGE, nous combinons expertise, technologie et engagement écologique pour offrir un service
                d'exception dans tout le Var.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Expertise professionnelle",
                    description: "Notre équipe est formée aux techniques les plus avancées du secteur.",
                  },
                  {
                    title: "Produits écologiques",
                    description: "Nous utilisons exclusivement des produits respectueux de l'environnement.",
                  },
                  {
                    title: "Technologie de pointe",
                    description: "Équipements modernes pour des résultats impeccables et durables.",
                  },
                  {
                    title: "Service personnalisé",
                    description: "Solutions adaptées à vos besoins spécifiques et à votre budget.",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="relative overflow-hidden group bg-yellow-400 text-black hover:bg-yellow-400 px-8 py-6 text-lg rounded-xl"
              >
                <span className="relative z-10 font-medium">Demander un devis</span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Devis */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-sm">
                <span className="text-sm font-medium text-yellow-300">Demande de devis</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Obtenez un{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                  devis gratuit
                </span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                Recevez une estimation précise et sans engagement pour vos besoins de nettoyage professionnel dans tout
                le Var.
              </p>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Devis rapide</h3>
                    <p className="text-gray-400">Réponse sous 24h pour tous vos projets</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Sans engagement</h3>
                    <p className="text-gray-400">Estimation gratuite et sans obligation</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Tarifs transparents</h3>
                    <p className="text-gray-400">Prix clairs et détaillés sans surprise</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-px bg-gradient-to-br from-yellow-400/30 via-yellow-300/20 to-yellow-500/30 rounded-2xl blur-md opacity-30"></div>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative backdrop-blur-sm border border-white/10 rounded-2xl bg-black/40 p-8 space-y-6"
              >
                {submitSuccess && (
                  <Notification
                    type="success"
                    message="Votre demande de devis a été envoyée avec succès !"
                    details="Un email contenant toutes les informations a été envoyé à notre équipe. Nous vous contacterons très rapidement."
                    onClose={() => setSubmitSuccess(false)}
                  />
                )}

                {submitError && (
                  <Notification
                    type="error"
                    message="Erreur lors de l'envoi du devis"
                    details={submitError}
                    onClose={() => setSubmitError("")}
                  />
                )}

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-gray-300">
                    Service souhaité <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border ${formErrors.service ? "border-red-500" : "border-white/10"} bg-white/5 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-all`}
                  >
                    <option value="" className="bg-gray-900">
                      Sélectionnez un service
                    </option>
                    <option value="menage" className="bg-gray-900">
                      Ménage débarras
                    </option>
                    <option value="copropriete" className="bg-gray-900">
                      Nettoyage copropriété
                    </option>
                    <option value="locaux" className="bg-gray-900">
                      Nettoyage locaux
                    </option>
                    <option value="vitres" className="bg-gray-900">
                      Nettoyage de vitres
                    </option>
                    <option value="chantier" className="bg-gray-900">
                      Nettoyage fin de chantier
                    </option>
                    <option value="debarras" className="bg-gray-900">
                      Débarras
                    </option>
                  </select>
                  {formErrors.service && <p className="text-red-400 text-sm mt-1">{formErrors.service}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Nom <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${formErrors.name ? "border-red-500" : "border-white/10"} bg-white/5 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-all`}
                      placeholder="Votre nom"
                    />
                    {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${formErrors.email ? "border-red-500" : "border-white/10"} bg-white/5 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-all`}
                      placeholder="Votre email"
                    />
                    {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                      Téléphone <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full rounded-xl border ${formErrors.phone ? "border-red-500" : "border-white/10"} bg-white/5 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-all`}
                      placeholder="Votre téléphone"
                    />
                    {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium text-gray-300">
                      Date souhaitée
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-gray-300">
                    Adresse
                  </label>
                  <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-all"
                    placeholder="Adresse complète"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="details" className="text-sm font-medium text-gray-300">
                    Détails de votre demande
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white min-h-[150px] focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-all"
                    placeholder="Précisez vos besoins (surface, fréquence, etc.)"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden group bg-yellow-400 text-black hover:bg-yellow-400 py-6 text-lg rounded-xl disabled:opacity-70"
                >
                  <span className="relative z-10 font-medium">
                    {isSubmitting ? "Envoi en cours..." : "Demander mon devis gratuit"}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Les champs marqués d'un <span className="text-red-400">*</span> sont obligatoires
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-yellow-300">Témoignages clients</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Ce que disent{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                nos clients
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl">
              Découvrez les expériences de nos clients satisfaits dans tout le Var
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Marie L.",
                role: "Syndic de copropriété",
                stars: 5,
                comment:
                  "Un service impeccable pour notre résidence. Les parties communes n'ont jamais été aussi propres. Je recommande vivement CI.NETTOYAGE pour leur professionnalisme et leur réactivité.",
              },
              {
                name: "Thomas D.",
                role: "Propriétaire de commerce",
                stars: 4,
                comment:
                  "Après des travaux dans ma boutique, l'équipe de CI.NETTOYAGE a fait un bon travail. Tout était propre pour l'ouverture. Quelques détails auraient pu être améliorés, mais dans l'ensemble je suis satisfait et je les recommande.",
              },
              {
                name: "Sophie M.",
                role: "Particulier",
                stars: 5,
                comment:
                  "Excellente prestation ! J'ai fait appel à CI.NETTOYAGE pour un nettoyage complet de ma maison avant emménagement. Travail minutieux, équipe ponctuelle et prix très compétitif. Je suis ravie du résultat !",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative backdrop-blur-sm border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent p-8"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/30 to-yellow-400/10 flex items-center justify-center text-xl font-bold text-yellow-300">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Sans images */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-yellow-300">FAQ</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Questions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                fréquentes
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl">Tout ce que vous devez savoir sur nos services</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Quels types de locaux nettoyez-vous ?",
                answer:
                  "Nous nettoyons tous types de locaux : bureaux, commerces, copropriétés, maisons, appartements, et locaux industriels dans tout le Var.",
              },
              {
                question: "Utilisez-vous des produits écologiques ?",
                answer:
                  "Oui, tous nos produits sont écologiques et respectueux de l'environnement, sans compromettre l'efficacité du nettoyage.",
              },
              {
                question: "Comment obtenir un devis ?",
                answer:
                  "Vous pouvez demander un devis gratuit via notre formulaire de contact ou en nous appelant directement.",
              },
              {
                question: "Quelle est votre zone d'intervention ?",
                answer: "Nous intervenons dans tout le Var et ses environs, dans un rayon de 50km.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl backdrop-blur-sm border border-white/5 bg-gradient-to-br from-white/5 to-white/[0.02] transition-all duration-300"
              >
                <div className="p-6 cursor-pointer flex justify-between items-center" onClick={() => toggleFaq(index)}>
                  <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-yellow-400 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </div>

                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 py-16 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">
                CI.NETTOYAGE
              </span>
              <p className="text-gray-400">
                Solutions professionnelles de nettoyage pour particuliers et entreprises dans tout le Var.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/c.i_nettoyage/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:border-yellow-400/30 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
              <ul className="space-y-4">
                {["Ménage débarras", "Nettoyage copropriété", "Nettoyage locaux", "Nettoyage de vitre"].map(
                  (item, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Zones d'intervention</h3>
              <ul className="space-y-4">
                {["Toulon", "La Seyne-sur-Mer", "Six-Fours", "Hyères"].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
              <ul className="space-y-4">
                <li className="text-gray-400">
                  <strong className="text-white">Adresse:</strong> Toulon, France
                </li>
                <li className="text-gray-400">
                  <strong className="text-white">Email:</strong> C.inettoyage83@gmail.com
                </li>
                <li className="text-gray-400">
                  <strong className="text-white">Téléphone:</strong> 06 27 04 03 05
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} CI.NETTOYAGE. Tous droits réservés.
            </div>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Mentions légales
              </Link>
              <Link
                href="/politique-de-confidentialite"
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
