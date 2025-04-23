import { Resend } from "resend"

// Initialiser Resend avec la clé API
const resendApiKey = process.env.RESEND_API_KEY

// Vérifier que la clé API est définie
if (!resendApiKey) {
  console.warn("ATTENTION: Clé API Resend non définie dans les variables d'environnement")
}

// Créer l'instance Resend
const resend = new Resend(resendApiKey)

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
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

// Fonction pour envoyer un email via Resend
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    if (!resendApiKey) {
      throw new Error("Clé API Resend non définie")
    }

    console.log("Tentative d'envoi d'email à:", to)

    const { data, error } = await resend.emails.send({
      from: "CI NETTOYAGE <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    })

    if (error) {
      console.error("Erreur Resend:", error)
      throw new Error(`Erreur Resend: ${error.message}`)
    }

    console.log(`Email envoyé avec succès à ${to}: ${data?.id}`)
    return { success: true, id: data?.id }
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    throw error
  }
}
