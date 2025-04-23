import { NextResponse } from "next/server"
import { createEmailTemplate, sendEmail } from "@/lib/resend"

export async function POST(request: Request) {
  try {
    // Vérifier que la clé API Resend est définie
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY n'est pas définie dans les variables d'environnement")
      return NextResponse.json(
        {
          error: "Configuration du serveur d'email incomplète",
          details: "La clé API Resend n'est pas configurée",
        },
        { status: 500 },
      )
    }

    // Vérifier que l'email de destination est défini
    const emailTo = process.env.EMAIL_TO
    if (!emailTo) {
      console.error("EMAIL_TO n'est pas défini dans les variables d'environnement")
      return NextResponse.json(
        {
          error: "Configuration du serveur d'email incomplète",
          details: "L'adresse email de destination n'est pas configurée",
        },
        { status: 500 },
      )
    }

    // Récupérer et valider les données du formulaire
    const data = await request.json()
    const { name, email, phone, service, date, address, details } = data

    // Validation des champs requis
    if (!name || !email || !phone || !service) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs obligatoires" }, { status: 400 })
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format d'email invalide" }, { status: 400 })
    }

    console.log("Préparation de l'envoi d'email à:", emailTo)

    // Création du template d'email
    const emailHtml = createEmailTemplate({
      name,
      email,
      phone,
      service,
      date: date || "Non spécifiée",
      address: address || "Non spécifiée",
      details: details || "Aucun détail fourni",
    })

    // Envoi de l'email
    try {
      const result = await sendEmail(emailTo, `Nouvelle demande de devis - ${name}`, emailHtml)

      return NextResponse.json({
        success: true,
        message: "Votre demande de devis a été envoyée avec succès !",
      })
    } catch (emailError: any) {
      console.error("Erreur détaillée lors de l'envoi de l'email:", emailError)

      // Fournir des détails spécifiques pour les erreurs Resend courantes
      let errorDetails = emailError.message || "Erreur inconnue"

      if (errorDetails.includes("not verified")) {
        errorDetails =
          "L'adresse email de destination n'est pas vérifiée dans Resend. Veuillez vérifier votre compte Resend."
      } else if (errorDetails.includes("rate limit")) {
        errorDetails = "Limite de taux d'envoi dépassée. Veuillez réessayer plus tard."
      }

      return NextResponse.json(
        {
          error: "Une erreur est survenue lors de l'envoi de l'email",
          details: errorDetails,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Erreur lors du traitement de la demande:", error)
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors du traitement de votre demande",
        details: error.message || "Erreur inconnue",
      },
      { status: 500 },
    )
  }
}
