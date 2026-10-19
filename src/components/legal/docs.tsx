import type { ReactNode } from "react";
import Link from "next/link";
import { COOKIE_NOTICE_KEY, legalUpdated, owner, processors, retention } from "@/data/legal";
import { maintenancePrice } from "@/data/plans";

/**
 * The four legal documents: aviso legal, privacidad, cookies, términos.
 *
 * Written for a small Spanish studio under RGPD, LOPDGDD and LSSI-CE, and
 * kept accurate to what the site actually does: no analytics, no advertising
 * cookies, one contact form whose data goes by email. If the site starts
 * using analytics, ads or anything that stores data in the browser, the
 * cookie policy and the privacy policy must change with it — and a consent
 * banner becomes mandatory.
 *
 * Not legal advice. Have them reviewed before relying on them commercially.
 */

export type LegalDoc = {
  title: string;
  intro: string;
  sections: { heading: string; body: ReactNode }[];
};

/** Visible marker for owner data that hasn't been provided yet. */
function Pending({ what }: { what: string }) {
  return (
    <span className="rounded bg-ember/10 px-1.5 py-0.5 font-mono text-[0.8125em] text-ember-deep">
      [pendiente: {what}]
    </span>
  );
}

const ownerName = owner.name || <Pending what="nombre o razón social del titular" />;
const ownerTaxId = owner.taxId || <Pending what="NIF / CIF" />;
const ownerAddress = owner.address || <Pending what="domicilio" />;

const Mail = () => (
  <a href={`mailto:${owner.email}`} className="text-ink underline underline-offset-4 hover:text-ember">
    {owner.email}
  </a>
);

const L = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="text-ink underline underline-offset-4 hover:text-ember">
    {children}
  </Link>
);

const Ext = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer noopener" className="text-ink underline underline-offset-4 hover:text-ember">
    {children}
  </a>
);

export const docs: Record<"notice" | "privacy" | "cookies" | "terms", LegalDoc> = {
  /* ── Aviso legal ─────────────────────────────────────────────────── */
  notice: {
    title: "Aviso legal",
    intro: `Información sobre el titular de esta web y las condiciones para usarla. Última actualización: ${legalUpdated}.`,
    sections: [
      {
        heading: "Titular de la web",
        body: (
          <>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de
              la Sociedad de la Información y de Comercio Electrónico (LSSI-CE),
              se informa de los datos del titular de este sitio web:
            </p>
            <ul>
              <li>Titular: {ownerName}</li>
              <li>NIF / CIF: {ownerTaxId}</li>
              <li>Domicilio: {ownerAddress}</li>
              <li>Nombre comercial: {owner.brand}</li>
              <li>Correo electrónico: <Mail /></li>
              <li>Actividad: diseño y desarrollo web, identidad de marca, tiendas online y marketing digital.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Condiciones de uso",
        body: (
          <p>
            El acceso a esta web es libre y gratuito, y atribuye la condición de
            usuario a quien la visita. El usuario se compromete a usarla de forma
            lícita, sin dañar su funcionamiento ni los derechos de terceros, y a
            no introducir en el formulario de contacto información falsa o de
            otras personas sin su autorización.
          </p>
        ),
      },
      {
        heading: "Propiedad intelectual e industrial",
        body: (
          <p>
            Los textos, diseños, imágenes, logotipos, código y demás contenidos de
            esta web pertenecen a {owner.brand} o a terceros que han autorizado su
            uso, y están protegidos por la normativa de propiedad intelectual e
            industrial. No se permite su reproducción, distribución o
            transformación sin autorización expresa, salvo para uso personal y
            privado. Las marcas y logotipos de terceros que aparecen en la web
            (por ejemplo, las herramientas con las que trabajamos o los proyectos
            de clientes) pertenecen a sus respectivos titulares.
          </p>
        ),
      },
      {
        heading: "Responsabilidad",
        body: (
          <>
            <p>
              Trabajamos para que la información de la web sea correcta y esté al
              día, pero no garantizamos la ausencia de errores ni la disponibilidad
              continua del sitio. Los precios publicados son orientativos y no
              constituyen una oferta vinculante: cada proyecto se presupuesta de
              forma individual.
            </p>
            <p>
              La web puede contener enlaces a sitios de terceros. No somos
              responsables de sus contenidos ni de sus políticas, que conviene
              revisar al visitarlos.
            </p>
          </>
        ),
      },
      {
        heading: "Protección de datos y cookies",
        body: (
          <p>
            El tratamiento de los datos personales se explica en la{" "}
            <L href="/legal/privacy">política de privacidad</L>, y el uso de
            cookies en la <L href="/legal/cookies">política de cookies</L>.
          </p>
        ),
      },
      {
        heading: "Legislación aplicable",
        body: (
          <p>
            Este aviso legal se rige por la legislación española. Para cualquier
            controversia, las partes se someten a los juzgados y tribunales que
            correspondan conforme a la ley; cuando el usuario sea consumidor, los
            de su domicilio.
          </p>
        ),
      },
    ],
  },

  /* ── Política de privacidad ──────────────────────────────────────── */
  privacy: {
    title: "Política de privacidad",
    intro: `Qué datos tratamos, para qué y cuáles son tus derechos. Última actualización: ${legalUpdated}.`,
    sections: [
      {
        heading: "Responsable del tratamiento",
        body: (
          <ul>
            <li>Responsable: {ownerName}</li>
            <li>NIF / CIF: {ownerTaxId}</li>
            <li>Domicilio: {ownerAddress}</li>
            <li>Contacto para cualquier tema de privacidad: <Mail /></li>
          </ul>
        ),
      },
      {
        heading: "Qué datos tratamos",
        body: (
          <>
            <p>
              <strong>Si nos escribes por el cuestionario o el formulario de
              contacto:</strong> tu nombre, tu correo electrónico y, si decides
              darlos, tu teléfono, las respuestas sobre tu negocio y tu proyecto, y
              el mensaje que añadas. No pedimos datos especialmente protegidos;
              por favor, no los incluyas.
            </p>
            <p>
              <strong>Si solo navegas:</strong> el servidor que aloja la web
              registra datos técnicos de la conexión (como la dirección IP, el
              navegador y la hora de la visita) para poder servir la página y
              protegerla frente a abusos. No usamos herramientas de analítica ni
              de publicidad, y no creamos perfiles de los visitantes.
            </p>
          </>
        ),
      },
      {
        heading: "Para qué los usamos y con qué base legal",
        body: (
          <ul>
            <li>
              <strong>Responder a tu solicitud y enviarte una propuesta o
              presupuesto.</strong> Base legal: tu consentimiento al enviar el
              formulario y la aplicación de medidas precontractuales a petición
              tuya (art. 6.1.a y 6.1.b del RGPD).
            </li>
            <li>
              <strong>Gestionar el proyecto si llegamos a trabajar juntos</strong>,
              incluida la facturación. Base legal: la ejecución del contrato y el
              cumplimiento de obligaciones legales (art. 6.1.b y 6.1.c del RGPD).
            </li>
            <li>
              <strong>Mantener la web segura</strong> y evitar envíos automáticos
              o abusivos del formulario. Base legal: nuestro interés legítimo en
              proteger el sitio (art. 6.1.f del RGPD).
            </li>
          </ul>
        ),
      },
      {
        heading: "Cuánto tiempo los conservamos",
        body: (
          <p>
            Si no llegamos a trabajar juntos, conservamos los datos de tu
            solicitud durante {retention} desde el último contacto, por si
            retomamos la conversación, y después los eliminamos. Si contratas un
            proyecto, los conservamos mientras dure la relación y, después,
            durante los plazos que exige la ley (por ejemplo, la normativa fiscal).
            Puedes pedirnos que los borremos antes en cualquier momento.
          </p>
        ),
      },
      {
        heading: "Con quién los compartimos",
        body: (
          <>
            <p>
              No vendemos ni cedemos tus datos a terceros. Para funcionar, la web
              usa proveedores que tratan datos por cuenta nuestra (encargados del
              tratamiento), con contrato y solo para prestar su servicio:
            </p>
            <ul>
              {processors.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong> — {p.role}. Datos: {p.data}.
                  Ubicación: {p.country}.
                </li>
              ))}
            </ul>
            <p>
              Estos proveedores están en Estados Unidos. Las transferencias se
              realizan con las garantías previstas en el RGPD, como el Marco de
              Privacidad de Datos UE-EE. UU. o las cláusulas contractuales tipo
              aprobadas por la Comisión Europea. Solo comunicaremos datos a
              autoridades cuando una ley lo exija.
            </p>
          </>
        ),
      },
      {
        heading: "Tus derechos",
        body: (
          <>
            <p>
              Puedes ejercer en cualquier momento tus derechos de acceso,
              rectificación, supresión, oposición, limitación del tratamiento y
              portabilidad, y retirar el consentimiento que nos diste, escribiendo
              a <Mail />. Te responderemos en el plazo máximo de un mes.
            </p>
            <p>
              Si consideras que no hemos tratado tus datos correctamente, puedes
              presentar una reclamación ante la Agencia Española de Protección de
              Datos (<Ext href="https://www.aepd.es">www.aepd.es</Ext>).
            </p>
          </>
        ),
      },
      {
        heading: "Otros puntos",
        body: (
          <ul>
            <li>
              La web no está dirigida a menores de 14 años, y no tratamos
              conscientemente sus datos.
            </li>
            <li>
              No tomamos decisiones automatizadas ni elaboramos perfiles con tus
              datos.
            </li>
            <li>
              Si cambiamos esta política, publicaremos aquí la nueva versión con
              su fecha.
            </li>
          </ul>
        ),
      },
    ],
  },

  /* ── Política de cookies ─────────────────────────────────────────── */
  cookies: {
    title: "Política de cookies",
    intro: `Qué cookies usa esta web (resumen: ninguna para seguirte). Última actualización: ${legalUpdated}.`,
    sections: [
      {
        heading: "Qué son las cookies",
        body: (
          <p>
            Las cookies son pequeños archivos que una web guarda en tu navegador
            para recordar información entre visitas, por ejemplo para analizar
            cómo se usa o para mostrar publicidad. Otras tecnologías parecidas,
            como el almacenamiento local del navegador, siguen las mismas reglas.
          </p>
        ),
      },
      {
        heading: "Qué cookies usa esta web",
        body: (
          <>
            <p>
              <strong>Ninguna de analítica, publicidad ni redes sociales.</strong>{" "}
              Esta web no instala cookies propias ni de terceros para medir
              visitas, crear perfiles o mostrarte anuncios, ni guarda información
              en tu navegador para seguirte.
            </p>
            <p>
              Solo guardamos un dato en el almacenamiento local de tu navegador,
              y únicamente si cierras el aviso de cookies:
            </p>
            <ul>
              <li>
                <strong>{COOKIE_NOTICE_KEY}</strong> — propia, de preferencia.
                Recuerda que ya has cerrado el aviso para no volver a mostrártelo.
                Guarda solo el valor «dismissed», no te identifica y no caduca
                hasta que borres los datos del navegador.
              </li>
            </ul>
            <p>
              Las tipografías se sirven desde nuestro propio servidor, sin
              conectar con Google, y no hay vídeos, mapas ni botones sociales
              incrustados de terceros.
            </p>
            <p>
              Por eso el aviso que ves al entrar es informativo y no te pide que
              aceptes nada: la ley solo exige tu consentimiento para las cookies
              que no son necesarias, y guardar una preferencia que tú mismo has
              indicado no lo requiere.
            </p>
          </>
        ),
      },
      {
        heading: "Si esto cambia",
        body: (
          <p>
            Si en el futuro incorporamos herramientas que usen cookies no
            necesarias (por ejemplo, analítica), actualizaremos esta política y te
            pediremos tu consentimiento antes de instalarlas, con la opción de
            rechazarlas tan fácilmente como aceptarlas.
          </p>
        ),
      },
      {
        heading: "Cómo gestionar las cookies en tu navegador",
        body: (
          <>
            <p>
              Aunque esta web no las utilice, puedes revisar y borrar las cookies
              de cualquier sitio desde la configuración de tu navegador:
            </p>
            <ul>
              <li><Ext href="https://support.google.com/chrome/answer/95647">Google Chrome</Ext></li>
              <li><Ext href="https://support.mozilla.org/es/kb/Borrar%20cookies">Mozilla Firefox</Ext></li>
              <li><Ext href="https://support.apple.com/es-es/guide/safari/sfri11471/mac">Safari</Ext></li>
              <li><Ext href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09">Microsoft Edge</Ext></li>
            </ul>
          </>
        ),
      },
      {
        heading: "Más información",
        body: (
          <p>
            Para cualquier duda sobre esta política o sobre tus datos, escríbenos
            a <Mail /> o consulta la{" "}
            <L href="/legal/privacy">política de privacidad</L>.
          </p>
        ),
      },
    ],
  },

  /* ── Términos y condiciones ──────────────────────────────────────── */
  terms: {
    title: "Términos y condiciones",
    intro: `Condiciones generales para los servicios de diseño y desarrollo que contratas con nosotros. Última actualización: ${legalUpdated}.`,
    sections: [
      {
        heading: "Objeto",
        body: (
          <p>
            Estas condiciones regulan la contratación de los servicios de{" "}
            {owner.brand} (diseño y desarrollo web, tiendas online, identidad de
            marca, SEO, publicidad digital y desarrollo a medida). Las condiciones
            concretas de cada proyecto —alcance, precio, plazos y entregables— se
            recogen en el presupuesto o propuesta que aceptes, que prevalece sobre
            estas condiciones generales en lo que las contradiga.
          </p>
        ),
      },
      {
        heading: "Presupuestos y contratación",
        body: (
          <>
            <p>
              Los precios que aparecen en la web son orientativos («desde») y no
              son una oferta vinculante. Tras conocer tu proyecto te enviamos un
              presupuesto detallado, válido durante 30 días salvo que indique otro
              plazo.
            </p>
            <p>
              El contrato se perfecciona cuando aceptas el presupuesto por escrito
              (un correo electrónico es suficiente) y, en su caso, abonas el pago
              inicial indicado en él.
            </p>
          </>
        ),
      },
      {
        heading: "Precio y pagos",
        body: (
          <p>
            Salvo que el presupuesto diga otra cosa, los precios no incluyen IVA
            ni costes de terceros (dominio, alojamiento, licencias, plantillas de
            pago, tarifas de pasarelas de pago o inversión publicitaria), que se
            indicarán por separado. La forma y los plazos de pago se fijan en cada
            presupuesto; es habitual un pago inicial para empezar y el resto a la
            entrega.
          </p>
        ),
      },
      {
        heading: "Plazos y colaboración",
        body: (
          <p>
            Los plazos de entrega se indican en el presupuesto y dependen de que
            recibamos a tiempo los contenidos, accesos y aprobaciones que
            necesitamos de ti. Los retrasos por esta causa amplían el plazo en la
            misma medida. Cada proyecto incluye las rondas de revisión indicadas en
            el presupuesto; los cambios fuera de ese alcance se presupuestan
            aparte.
          </p>
        ),
      },
      {
        heading: "Tus obligaciones",
        body: (
          <p>
            Te comprometes a facilitar información veraz y a disponer de los
            derechos sobre los textos, imágenes, logotipos y demás materiales que
            nos entregues para el proyecto, respondiendo frente a reclamaciones de
            terceros por su uso.
          </p>
        ),
      },
      {
        heading: "Propiedad del trabajo",
        body: (
          <p>
            Una vez abonado el importe total, te pertenecen los derechos de uso y
            explotación sobre el diseño y los desarrollos realizados
            específicamente para tu proyecto. Quedan excluidos los componentes de
            terceros, que se rigen por sus propias licencias, y las herramientas o
            código genérico propios que reutilizamos entre proyectos, sobre los
            que te concedemos una licencia de uso indefinida. Salvo que nos digas
            lo contrario, podremos mostrar el proyecto terminado en nuestro
            portfolio.
          </p>
        ),
      },
      {
        heading: "Garantía y mantenimiento",
        body: (
          <p>
            Corregimos sin coste los errores de funcionamiento atribuibles a
            nuestro trabajo que nos comuniques durante los 30 días siguientes a la
            entrega, salvo que el presupuesto indique otro plazo. Las nuevas
            funcionalidades se presupuestan aparte. El mantenimiento continuado
            (actualizaciones, copias de seguridad, seguridad y pequeños cambios) es
            opcional y se contrata aparte mediante una cuota mensual, desde{" "}
            {maintenancePrice("es")} (IVA no incluido), con el importe y las
            condiciones que se indiquen en su propuesta.
          </p>
        ),
      },
      {
        heading: "Responsabilidad",
        body: (
          <p>
            Ponemos todos los medios razonables para que el resultado funcione
            correctamente, pero no garantizamos resultados comerciales concretos
            (como un número de ventas o una posición en Google), ya que dependen de
            factores ajenos a nosotros. No respondemos de las caídas o fallos de
            servicios de terceros (alojamiento, pasarelas de pago, plataformas
            publicitarias).
          </p>
        ),
      },
      {
        heading: "Desistimiento (consumidores)",
        body: (
          <p>
            Si contratas como consumidor y a distancia, dispones de 14 días
            naturales desde la aceptación para desistir sin necesidad de
            justificación, escribiéndonos a <Mail />. Si nos pides expresamente
            que empecemos a trabajar antes de que termine ese plazo, deberás abonar
            la parte del servicio ya prestada, y perderás el derecho de
            desistimiento una vez el servicio se haya completado.
          </p>
        ),
      },
      {
        heading: "Protección de datos",
        body: (
          <p>
            Tratamos tus datos según la{" "}
            <L href="/legal/privacy">política de privacidad</L>. Si para el
            proyecto tenemos que acceder a datos personales de tus clientes,
            firmaremos el correspondiente contrato de encargo del tratamiento.
          </p>
        ),
      },
      {
        heading: "Legislación aplicable",
        body: (
          <p>
            Estas condiciones se rigen por la legislación española. Si eres
            consumidor, serán competentes los juzgados de tu domicilio.
          </p>
        ),
      },
    ],
  },
};
