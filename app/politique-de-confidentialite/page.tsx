import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PolitiqueDeConfidentialite() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto py-16 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour à l'accueil</span>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p className="text-gray-300">
            CI.NETTOYAGE s'engage à protéger la vie privée des utilisateurs de son site web. Cette politique de
            confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations
            personnelles lorsque vous utilisez notre site web et nos services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Informations que nous collectons</h2>
          <p className="text-gray-300">Nous collectons les informations suivantes :</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>
              <strong>Informations personnelles</strong> : nom, adresse e-mail, numéro de téléphone, adresse postale
              lorsque vous remplissez notre formulaire de contact ou de devis.
            </li>
            <li>
              <strong>Informations de navigation</strong> : données collectées automatiquement lors de votre visite sur
              notre site, comme votre adresse IP, type de navigateur, pages visitées et durée de la visite.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Utilisation des informations</h2>
          <p className="text-gray-300">Nous utilisons vos informations pour :</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Vous fournir les services que vous avez demandés</li>
            <li>Répondre à vos demandes et questions</li>
            <li>Vous envoyer des devis personnalisés</li>
            <li>Améliorer notre site web et nos services</li>
            <li>Respecter nos obligations légales</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Protection des informations</h2>
          <p className="text-gray-300">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre
            tout accès non autorisé, altération, divulgation ou destruction. Cependant, aucune méthode de transmission
            sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une
            sécurité absolue.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Partage des informations</h2>
          <p className="text-gray-300">
            Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers sans votre
            consentement, sauf lorsque cela est nécessaire pour fournir un service que vous avez demandé ou lorsque nous
            sommes légalement tenus de le faire.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies</h2>
          <p className="text-gray-300">
            Notre site peut utiliser des cookies pour améliorer votre expérience. Vous pouvez configurer votre
            navigateur pour refuser tous les cookies ou pour être averti lorsqu'un cookie est envoyé. Cependant,
            certaines fonctionnalités du site peuvent ne pas fonctionner correctement si les cookies sont désactivés.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Vos droits</h2>
          <p className="text-gray-300">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants
            concernant vos données personnelles :
          </p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Modifications de la politique de confidentialité</h2>
          <p className="text-gray-300">
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute
            modification sera publiée sur cette page avec une date de mise à jour révisée.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Nous contacter</h2>
          <p className="text-gray-300">
            Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter à
            l'adresse email suivante : C.inettoyage83@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
