/**
 * Four fictional site previews — one per plan, each in its plan's colour.
 *
 * Built from real DOM rather than screenshots: they weigh nothing, stay sharp
 * at any density and can be edited like any component. Every size is in `cqw`
 * (a share of the frame's own width), so the same markup reads correctly in the
 * wide desktop viewer and in the narrow phone stack. The brands are invented
 * to show range; none of them is a real client.
 */

const root = "h-full w-full [container-type:inline-size] overflow-hidden";

/* ── Plan 1 · Landing — PULSO, a training app ───────────────────── */
export function PreviewLanding() {
  return (
    <div className={`${root} relative bg-[#ffe45c] text-[#14130f]`}>
      <span className="absolute -right-[8cqw] -top-[14cqw] size-[46cqw] rounded-full bg-white/35" />
      <span className="absolute -bottom-[18cqw] left-[22cqw] size-[34cqw] rounded-full bg-[#ff9d3d]/45" />

      <div className="relative flex items-center justify-between px-[4cqw] pt-[2.6cqw]">
        <span className="flex items-center gap-[0.7cqw] text-[2.5cqw] font-extrabold tracking-[-0.04em]">
          <span className="size-[2.2cqw] rounded-full bg-[#14130f]" />
          pulso
        </span>
        <span className="hidden gap-[2.6cqw] text-[1.5cqw] font-medium text-[#14130f]/70 sm:flex">
          <span>Cómo funciona</span>
          <span>Planes</span>
          <span>Opiniones</span>
        </span>
        <span className="rounded-full bg-[#14130f] px-[2cqw] py-[0.9cqw] text-[1.4cqw] font-semibold text-white">
          Descargar
        </span>
      </div>

      <div className="relative grid grid-cols-12 px-[4cqw] pt-[4cqw]">
        <div className="col-span-7">
          <span className="inline-block rounded-full bg-white/70 px-[1.6cqw] py-[0.6cqw] text-[1.3cqw] font-semibold">
            Nueva app de entrenos
          </span>
          <p className="mt-[1.8cqw] text-[7.4cqw] leading-[0.92] font-extrabold tracking-[-0.06em]">
            Entrena
            <br />
            sin excusas.
          </p>
          <p className="mt-[1.8cqw] max-w-[34cqw] text-[1.7cqw] leading-snug text-[#14130f]/70">
            Rutinas de 20 minutos que se adaptan a tu semana. Sin gimnasio, sin
            complicaciones.
          </p>
          <div className="mt-[2.4cqw] flex items-center gap-[1.6cqw]">
            <span className="rounded-full bg-[#14130f] px-[2.6cqw] py-[1.3cqw] text-[1.6cqw] font-semibold text-white">
              Empezar gratis
            </span>
            <span className="text-[1.6cqw] font-semibold underline underline-offset-4">Ver cómo funciona</span>
          </div>
        </div>

        {/* A phone with a progress ring, and two floating stats. */}
        <div className="relative col-span-5">
          <div className="absolute left-[4cqw] top-[-1cqw] h-[42cqw] w-[20cqw] rotate-[6deg] rounded-[3cqw] bg-[#14130f] p-[1cqw] shadow-[0_3cqw_5cqw_-2cqw_rgba(0,0,0,0.5)]">
            <div className="flex h-full flex-col items-center rounded-[2.3cqw] bg-gradient-to-b from-[#2a2a31] to-[#14130f] pt-[3cqw]">
              <span className="relative grid size-[11cqw] place-items-center rounded-full bg-[conic-gradient(#ffe45c_0_72%,rgba(255,255,255,0.14)_72%)]">
                <span className="grid size-[8.4cqw] place-items-center rounded-full bg-[#1b1b21] text-center text-white">
                  <span className="text-[2.2cqw] leading-none font-bold">72%</span>
                </span>
              </span>
              <span className="mt-[1.6cqw] text-[1.3cqw] font-semibold text-white">Hoy</span>
              <span className="mt-[0.6cqw] h-[1.2cqw] w-[11cqw] rounded-full bg-white/15" />
              <span className="mt-[0.8cqw] h-[1.2cqw] w-[9cqw] rounded-full bg-white/10" />
              <span className="mt-[2cqw] rounded-full bg-[#ffe45c] px-[2cqw] py-[0.8cqw] text-[1.2cqw] font-bold text-[#14130f]">
                Empezar
              </span>
            </div>
          </div>
          <span className="absolute left-[-2cqw] top-[10cqw] rounded-[1.6cqw] bg-white px-[1.8cqw] py-[1.2cqw] shadow-[0_1.6cqw_3cqw_-1.4cqw_rgba(0,0,0,0.4)]">
            <span className="block text-[2.2cqw] leading-none font-extrabold">12</span>
            <span className="block text-[1.1cqw] text-[#14130f]/60">días seguidos</span>
          </span>
          <span className="absolute right-[-1cqw] top-[24cqw] rounded-[1.6cqw] bg-[#ff5a8a] px-[1.8cqw] py-[1.2cqw] text-white shadow-[0_1.6cqw_3cqw_-1.4cqw_rgba(0,0,0,0.4)]">
            <span className="block text-[2.2cqw] leading-none font-extrabold">7.200</span>
            <span className="block text-[1.1cqw] text-white/80">pasos hoy</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Plan 2 · Business — BRISA, renewable energy ────────────────── */
export function PreviewBusiness() {
  return (
    <div className={`${root} flex flex-col bg-[#fff4ec] text-[#1a1410]`}>
      <div className="flex items-center justify-between px-[4cqw] py-[2.2cqw]">
        <span className="flex items-center gap-[0.9cqw] text-[2.3cqw] font-extrabold tracking-[-0.04em]">
          <span className="size-[2.6cqw] rounded-[0.8cqw] bg-gradient-to-br from-[#ff9a3d] to-[#ff4d6d]" />
          brisa
        </span>
        <span className="hidden gap-[2.6cqw] text-[1.45cqw] font-medium text-[#1a1410]/65 sm:flex">
          <span>Soluciones</span>
          <span>Casos</span>
          <span>Empresa</span>
          <span>Contacto</span>
        </span>
        <span className="rounded-full bg-[#1a1410] px-[2cqw] py-[0.9cqw] text-[1.35cqw] font-semibold text-white">
          Pedir presupuesto
        </span>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-[2cqw] px-[4cqw] pb-[2cqw]">
        <div className="col-span-7 flex flex-col justify-center">
          <span className="w-fit rounded-full bg-[#ffd9bf] px-[1.5cqw] py-[0.5cqw] text-[1.25cqw] font-semibold text-[#b2400f]">
            Energía solar para empresas
          </span>
          <p className="mt-[1.6cqw] text-[5.2cqw] leading-[0.95] font-extrabold tracking-[-0.055em]">
            Paga menos luz.
            <br />
            <span className="bg-gradient-to-r from-[#ff8a3d] to-[#ff4d6d] bg-clip-text text-transparent">
              Contamina menos.
            </span>
          </p>
          <p className="mt-[1.6cqw] max-w-[34cqw] text-[1.55cqw] leading-snug text-[#1a1410]/65">
            Estudiamos tu consumo, instalamos y nos encargamos de las ayudas.
          </p>
          <div className="mt-[2cqw] grid max-w-[40cqw] grid-cols-3 gap-[1.2cqw]">
            {[
              ["−38%", "en tu factura", "bg-[#ffe0c9]"],
              ["+420", "empresas", "bg-[#ffd0dc]"],
              ["25 años", "de garantía", "bg-[#ffeaa8]"],
            ].map(([v, k, bg]) => (
              <div key={k} className={`rounded-[1.4cqw] px-[1.4cqw] py-[1.2cqw] ${bg}`}>
                <p className="text-[2.3cqw] leading-none font-extrabold tracking-[-0.04em]">{v}</p>
                <p className="mt-[0.4cqw] text-[1.1cqw] text-[#1a1410]/60">{k}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative col-span-5 overflow-hidden rounded-[2.4cqw] bg-gradient-to-br from-[#ffb347] via-[#ff7a45] to-[#ff4d6d]">
          <span className="absolute -right-[4cqw] -top-[4cqw] size-[22cqw] rounded-full bg-white/30" />
          <span className="absolute bottom-[-6cqw] left-[-4cqw] size-[24cqw] rounded-full bg-white/15" />
          <div className="absolute inset-x-[2cqw] bottom-[2cqw] rounded-[1.6cqw] bg-white/90 p-[1.6cqw] shadow-[0_2cqw_4cqw_-2cqw_rgba(0,0,0,0.4)]">
            <p className="text-[1.15cqw] font-semibold text-[#1a1410]/55">Producción hoy</p>
            <p className="text-[2.6cqw] leading-none font-extrabold tracking-[-0.04em]">1.284 kWh</p>
            <div className="mt-[1cqw] flex h-[4cqw] items-end gap-[0.5cqw]">
              {[30, 46, 40, 62, 74, 92, 100, 84, 58].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[0.4cqw] bg-gradient-to-t from-[#ff7a45] to-[#ffb347]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Plan 3 · Tienda Online — KIKO, trainers and clothes ────────── */
export function PreviewEcommerce() {
  const items = [
    ["Aero Run", "89 €", "from-[#7fd8ff] to-[#3b8bff]", "Nuevo"],
    ["Loop Hoodie", "59 €", "from-[#ffd36e] to-[#ff8a3d]", "−20%"],
    ["Daily Tee", "29 €", "from-[#ff9cc4] to-[#c77dff]", ""],
  ] as const;

  return (
    <div className={`${root} flex flex-col bg-[#eef9ff] text-[#0e1a24]`}>
      <div className="bg-[#0e1a24] py-[0.7cqw] text-center text-[1.2cqw] font-medium text-white">
        Envío gratis a partir de 40 € · Devoluciones en 30 días
      </div>

      <div className="flex items-center justify-between px-[4cqw] py-[2cqw]">
        <span className="text-[2.6cqw] font-extrabold tracking-[-0.05em]">kiko</span>
        <span className="hidden gap-[2.6cqw] text-[1.45cqw] font-medium text-[#0e1a24]/65 sm:flex">
          <span>Novedades</span>
          <span>Zapatillas</span>
          <span>Ropa</span>
          <span>Ofertas</span>
        </span>
        <span className="relative rounded-full bg-white px-[1.8cqw] py-[0.9cqw] text-[1.4cqw] font-semibold shadow-[0_0.6cqw_1.4cqw_-0.8cqw_rgba(0,0,0,0.3)]">
          Carrito
          <span className="absolute -right-[0.6cqw] -top-[0.6cqw] grid size-[2cqw] place-items-center rounded-full bg-[#ff3b5c] text-[1.1cqw] font-bold text-white">
            2
          </span>
        </span>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-[2cqw] px-[4cqw] pb-[2.4cqw]">
        {items.map(([name, price, grad, tag]) => (
          <div key={name} className="flex flex-col rounded-[2cqw] bg-white p-[1.2cqw] shadow-[0_1.4cqw_3cqw_-2cqw_rgba(0,0,0,0.3)]">
            <div className={`relative flex-1 overflow-hidden rounded-[1.4cqw] bg-gradient-to-br ${grad}`}>
              <span className="absolute left-[18%] top-[22%] h-[44%] w-[64%] rotate-[-8deg] rounded-[40%_60%_50%_50%] bg-white/45" />
              <span className="absolute bottom-[14%] right-[16%] size-[26%] rounded-full bg-white/60" />
              {tag && (
                <span className="absolute left-[1cqw] top-[1cqw] rounded-full bg-[#0e1a24] px-[1.1cqw] py-[0.35cqw] text-[1.1cqw] font-semibold text-white">
                  {tag}
                </span>
              )}
            </div>
            <div className="mt-[1cqw] flex items-center justify-between">
              <div>
                <p className="text-[1.55cqw] leading-tight font-semibold">{name}</p>
                <p className="text-[1.4cqw] text-[#0e1a24]/55">{price}</p>
              </div>
              <span className="grid size-[3cqw] place-items-center rounded-full bg-[#0e1a24] text-[1.8cqw] leading-none text-white">
                +
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Plan 4 · Custom — CADENCE, logistics software ──────────────── */
export function PreviewCustom() {
  const bars = [38, 52, 44, 67, 58, 79, 71, 88, 74, 93, 85, 100];

  return (
    <div className={`${root} flex bg-[#0d0b1a] text-white`}>
      <div className="hidden w-[18cqw] shrink-0 flex-col gap-[1.4cqw] border-r border-white/10 px-[1.8cqw] py-[2cqw] sm:flex">
        <span className="flex items-center gap-[0.8cqw] text-[2cqw] font-extrabold tracking-[-0.04em]">
          <span className="size-[2.2cqw] rounded-[0.7cqw] bg-gradient-to-br from-[#c77dff] to-[#6d5bff]" />
          cadence
        </span>
        {["Resumen", "Envíos", "Rutas", "Flota", "Informes"].map((l, i) => (
          <span
            key={l}
            className={`rounded-[0.9cqw] px-[1.2cqw] py-[0.9cqw] text-[1.4cqw] font-medium ${
              i === 0 ? "bg-white/12 text-white" : "text-white/45"
            }`}
          >
            {l}
          </span>
        ))}
      </div>

      <div className="flex flex-1 flex-col px-[2.4cqw] py-[2cqw]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[2.2cqw] leading-none font-bold tracking-[-0.03em]">Resumen</p>
            <p className="mt-[0.4cqw] text-[1.2cqw] text-white/45">Últimos 30 días</p>
          </div>
          <span className="rounded-full bg-gradient-to-r from-[#c77dff] to-[#6d5bff] px-[1.8cqw] py-[0.9cqw] text-[1.3cqw] font-semibold">
            Nuevo envío
          </span>
        </div>

        <div className="mt-[1.6cqw] grid grid-cols-3 gap-[1.2cqw]">
          {[
            ["Envíos", "4.812", "+12%", "from-[#7fd8ff]/25"],
            ["En tránsito", "318", "+4%", "from-[#c77dff]/25"],
            ["Incidencias", "0,7%", "−2%", "from-[#ffd36e]/25"],
          ].map(([k, v, d, g]) => (
            <div key={k} className={`rounded-[1.4cqw] border border-white/10 bg-gradient-to-br ${g} to-transparent px-[1.4cqw] py-[1.2cqw]`}>
              <p className="text-[1.15cqw] text-white/55">{k}</p>
              <p className="mt-[0.3cqw] text-[2.6cqw] leading-none font-bold tracking-[-0.04em]">{v}</p>
              <p className="mt-[0.3cqw] text-[1.1cqw] font-semibold text-[#6ee7a8]">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-[1.4cqw] flex-1 rounded-[1.4cqw] border border-white/10 bg-white/[0.04] p-[1.4cqw]">
          <div className="flex h-full items-end gap-[0.6cqw]">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[0.5cqw]"
                style={{
                  height: `${h}%`,
                  background:
                    i > 8
                      ? "linear-gradient(180deg,#c77dff,rgba(109,91,255,0.35))"
                      : "rgba(255,255,255,0.16)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-[1.2cqw] space-y-[0.6cqw]">
          {[
            ["#48192", "Madrid → Lyon", "En ruta"],
            ["#48193", "Valencia → Porto", "Entregado"],
          ].map(([id, route, state]) => (
            <div key={id} className="flex items-center justify-between rounded-[1cqw] bg-white/[0.05] px-[1.4cqw] py-[0.8cqw] text-[1.25cqw]">
              <span className="text-white/45">{id}</span>
              <span>{route}</span>
              <span className={state === "Entregado" ? "text-[#6ee7a8]" : "text-[#b8a6ff]"}>{state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
