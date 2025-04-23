import { NextResponse } from "next/server"
import { createEmailTemplate, sendEmail } from "@/lib/nodemailer"

export async function POST(request: Request) {
  try {
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

    // Récupération de l'email de destination depuis les variables d'environnement
    const emailTo = process.env.EMAIL_TO || "c.inettoyage83@gmail.com"
    console.log("Email de destination:", emailTo)

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

    try {
      const result = await sendEmail(emailTo, `Nouvelle demande de devis - ${name}`, emailHtml)

      return NextResponse.json({
        success: true,
        message: "Votre demande de devis a été envoyée avec succès !",
      })
    } catch (emailError: any) {
      console.error("Erreur détaillée lors de l'envoi de l'email:", emailError)
      return NextResponse.json(
        {
          error: "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard.",
          details: emailError.message || "Erreur inconnue",
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
