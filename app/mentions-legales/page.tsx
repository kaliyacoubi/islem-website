import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MentionsLegales() {
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

        <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Informations légales</h2>
          <p className="text-gray-300">
            Le site web ci-nettoyage.fr est édité par CI.NETTOYAGE, entreprise de nettoyage basée à Toulon, France.
          </p>
          <ul className="list-none pl-0 text-gray-300 space-y-2">
            <li>
              <strong>Forme juridique</strong> : Entreprise individuelle
            </li>
            <li>
              <strong>Adresse</strong> : Toulon, France
            </li>
            <li>
              <strong>Email</strong> : C.inettoyage83@gmail.com
            </li>
            <li>
              <strong>Téléphone</strong> : 06 27 04 03 05
            </li>
            <li>
              <strong>SIRET</strong> : [Numéro SIRET]
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Hébergement</h2>
          <p className="text-gray-300">Ce site est hébergé par Vercel Inc., dont le siège social est situé à :</p>
          <p className="text-gray-300">
            Vercel Inc.
            <br />
            340 S Lemon Ave #4133
            <br />
            Walnut, CA 91789
            <br />
            États-Unis
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Propriété intellectuelle</h2>
          <p className="text-gray-300">
            L'ensemble du contenu de ce site (textes, images, logos, vidéos, etc.) est protégé par le droit d'auteur et
            est la propriété exclusive de CI.NETTOYAGE ou de ses partenaires. Toute reproduction, distribution,
            modification ou utilisation du contenu, en tout ou partie, sans autorisation écrite préalable, est
            strictement interdite.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Responsabilité</h2>
          <p className="text-gray-300">
            CI.NETTOYAGE s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur son site.
            Cependant, CI.NETTOYAGE ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises
            à disposition sur son site. En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa
            responsabilité exclusive.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Liens hypertextes</h2>
          <p className="text-gray-300">
            Le site peut contenir des liens vers d'autres sites internet. CI.NETTOYAGE n'exerce aucun contrôle sur ces
            sites et n'assume aucune responsabilité quant à leur contenu ou aux pratiques de confidentialité qu'ils
            appliquent.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Droit applicable et juridiction compétente</h2>
          <p className="text-gray-300">
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français
            seront seuls compétents.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Modifications</h2>
          <p className="text-gray-300">
            CI.NETTOYAGE se réserve le droit de modifier les présentes mentions légales à tout moment. L'utilisateur est
            invité à les consulter régulièrement.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact</h2>
          <p className="text-gray-300">
            Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse email suivante :
            C.inettoyage83@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
