import nodemailer from "nodemailer"

// Configuration du transporteur NodeMailer
let transporter: nodemailer.Transporter

// Initialisation du transporteur
export const initTransporter = () => {
  if (transporter) return transporter

  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass) {
    console.error("Identifiants Gmail manquants pour NodeMailer")
    throw new Error("Configuration email incomplète")
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false, // Important pour certains environnements de production
    },
  })

  return transporter
}

// Fonction pour créer le template HTML de l'email
export const createEmailTemplate = (data: any) => {
  const { name, email, phone, service, date, address, details } = data

  // Conversion du service en texte lisible
  const serviceMap: Record<string, string> = {
    menage: "Ménage débarras",
    copropriete: "Nettoyage copropriété",
    locaux: "Nettoyage locaux",
    vitres: "Nettoyage de vitres",
    chantier: "Nettoyage fin de chantier",
    debarras: "Débarras",
  }

  const serviceName = serviceMap[service] || service

  // Template optimisé pour les clients de messagerie mobile
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle demande de devis - CI NETTOYAGE</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f9f9f9;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td bgcolor="#FFCC00" style="padding: 40px 30px; text-align: center; color: #000000;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #000000;">CI NETTOYAGE</h1>
            <h2 style="margin: 10px 0 0 0; font-size: 22px; font-weight: bold; color: #000000;">Nouvelle demande de devis</h2>
          </td>
        </tr>
        <tr>
          <td bgcolor="#222222" style="padding: 10px 30px; text-align: center; color: #ffffff;">
            <p style="margin: 0; font-size: 16px;">Détails de la demande</p>
          </td>
        </tr>
        <tr>
          <td bgcolor="#222222" style="padding: 30px; color: #ffffff;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px; color: #ffffff;">Service demandé:</td>
              </tr>
              <tr>
                <td style="color: #ffffff;">${serviceName}</td>
              </tr>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px; color: #ffffff;">Informations du client:</td>
              </tr>
              <tr>
                <td style="color: #ffffff;">Nom: ${name}</td>
              </tr>
              <tr>
                <td style="color: #ffffff;">Email: ${email}</td>
              </tr>
              <tr>
                <td style="color: #ffffff;">Téléphone: ${phone}</td>
              </tr>
            </table>
            ${
              date
                ? `
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px; color: #ffffff;">Date souhaitée:</td>
              </tr>
              <tr>
                <td style="color: #ffffff;">${date}</td>
              </tr>
            </table>
            `
                : ""
            }
            ${
              address
                ? `
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px; color: #ffffff;">Adresse:</td>
              </tr>
              <tr>
                <td style="color: #ffffff;">${address}</td>
              </tr>
            </table>
            `
                : ""
            }
            ${
              details
                ? `
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
              <tr>
                <td style="font-weight: bold; padding-bottom: 5px; color: #ffffff;">Détails de la demande:</td>
              </tr>
              <tr>
                <td style="color: #ffffff;">${details}</td>
              </tr>
            </table>
            `
                : ""
            }
          </td>
        </tr>
        <tr>
          <td bgcolor="#f0f0f0" style="padding: 20px; text-align: center; font-size: 12px; color: #666666;">
            <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} CI NETTOYAGE - Tous droits réservés</p>
            <p style="margin: 0;">Ce message a été généré automatiquement, merci de ne pas y répondre.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

// Fonction pour envoyer un email via NodeMailer
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = initTransporter()

    // Définir les options d'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html,
    }

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions)

    console.log(`Email envoyé avec succès: ${info.messageId}`)
    return { success: true, id: info.messageId }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    throw error
  }
}
