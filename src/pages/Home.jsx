import { Link } from 'react-router-dom'
import { addToCart } from '../utils/cart'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'

const featuredProducts = [
  { id: 'neon-9-pro', name: 'NEON-9 PRO WIRELESS', category: 'HARDWARE', price: 249.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZcBBep3zBJv6CoP3pcphEDq6uuhm_-Gdz0lIPkNktpGvVDFNnJqfqm-r79hWAoIn5zSdxYsAIb3F2Ut0g12JkiUmfnm72-dUvTD_BJLq4nRDKzyBGaSDcsku29YCThAJa3mD9RDc7KUcBCqLwo1Y6UUY5S_tDztofb5PxUs_jcKvZx7-t6xSxdHXcIzxvELadOgT5LcS3vKLJP1gRxbYoyETqxorgKEE6MdXg7E6rJ8XwSske81vntOXnNFCdQtVAyx_sV2QLC_Ab' },
  { id: 'quantum-stride', name: 'QUANTUM STRIDE PAD', category: 'ACCESSORIES', price: 79.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_tY_slJmQ3MAfCKdOJVQA5gT2zv1I7vZ1CKPB_EWOhg6dQ6mqEpCd4RsVKx1bwxeoTNsS-zRS8ao169DaujNySzqqSlBIt6WTRnDhcTQnvzWWZcbTHEp_wd2F_rtnTxn9dd-n2eQehMOohh-JegEzpLlfQXyvkzPbf8-5DWvdWuoc6Z2hUO6jk87_ecSXt4XGJFxc7Vuvd-dEGPfvMS8WSZ5wPTa9pl2q175Zwd1b-P3vgXxcA1FzfNwZoB18YYCxE2kl4NrfR8p3' },
  { id: 'cyber-chasm', name: 'CYBER CHASM: AWAKENING', category: 'GAMES', price: 69.99, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6yY1PGAgB85b1IY550fJ3Tyq_v0dzbNiwemLJ6dQuSNSlVtTtjnR46kDYo14TA-idjsb9UIU7ZVSJndt7pVh7fWy_0cS2ysQ8vyTg1Ognd8o41VM3DKoFRpedtF8BdObS3JCF32GbhhkHxO78UJTYAoEyPCzDwZYsRRjLgeeyAptMR6smr2HE_MXRl4TvvTFUWKoRxyMADa_8S7dOTkeJ3ilEoBJeeyNI4V7lRiWPrlpcmsJL90Bc5Y_SH8iL1Dbe-ulAp8Nl3K81' },
  { id: 'void-station', name: 'VOID-STATION 34" CURVED', category: 'HARDWARE', price: 899.00, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArWLI2Se4n1D5o2oJ5D2CKl1v7D4AJR3_mmOI2WQwP-bvPI8iZuH_vmpkybVU9MZrlfgMm2To9EJdY8FVVqMJoLgYLX2vgaMraja9OhGv8DDEUmvfUofuPENgrwBbM1SlK53oOs-jC_pEAkIjP80p3Wpp6Q_GkumjzKyoWF-I0bFYDOWLs5O2IVYqW0OHYxn8WM0iNmZg-s3kuF9c2SQgvLt4VfEYHjGwCccV9rznN5z6QCQeDe1N74lHOY2ChlhbkLzVPisSv9A3F' },
]

function Countdown({ t }) {
  return (
    <div className="glass-panel p-8 rounded-2xl border border-outline-variant/10">
      <div className="flex flex-col items-center">
        <span className="text-6xl font-black tracking-tighter text-on-surface">50%</span>
        <span className="text-on-surface-variant text-xs font-bold tracking-[0.3em] mt-2 uppercase">OFF ALL ACCESSORIES</span>
        <div className="w-full h-px bg-outline-variant/20 my-6"></div>
        <div className="flex gap-4">
          {[['12', 'Days'], ['04', 'Hrs'], ['59', 'Min']].map(([val, label], i) => (
            <div key={label} className="flex items-center gap-4">
              {i > 0 && <div className="text-2xl font-bold opacity-30">:</div>}
              <div className="text-center">
                <div className="text-2xl font-bold text-on-surface">{val}</div>
                <div className="text-[0.6rem] opacity-50 font-bold tracking-widest uppercase">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Home({ setCart }) {
  const { lang } = useApp()
  const t = translations[lang].home

  function handleAddToCart(product) {
    const newCart = addToCart({ id: product.id, name: product.name, image: product.image, price: product.price, genre: product.category })
    setCart(newCart)
  }

  return (
    <main className="pt-20">
      <section className="relative h-[870px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeFmsQtkBSWYkaim8QgowjOiO0dkfDqNYVK_KuUUEi_6JOLx4DKw6jK2Ggo-W3obbsFobCKu9HE3fvhlRYlGkO_PcE6oQzcBhzWzkOIMd_RAYpHidj_GSFg6MMO33JWkbzxXZOvoutzAXb-MSvYQssmSSKpLpAoTgOIe6EbfjvShRGguT57h1Uz5QOK-rC0NOgI5nL-XUhPWFBWVQZy7izj6u1eWXjpzAhBOOX7HdktsTObePWEdKvm58ajym2jUOrkp2ELiJyxl8D" alt="Gaming setup" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
        </div>
        <div className="relative h-full max-w-[1440px] mx-auto px-8 flex flex-col justify-center items-start">
          <div className="max-w-2xl space-y-6">
            <span className="bg-secondary-container/20 text-secondary px-4 py-1.5 rounded-lg text-[0.6875rem] uppercase tracking-[0.2em] font-bold border border-secondary/10">{t.badge}</span>
            <h1 className="text-[3.5rem] font-semibold leading-[1.1] tracking-tighter text-on-surface">
              {t.heroTitle1} <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">{t.heroTitle2}</span>
            </h1>
            <p className="text-lg text-on-surface-variant/80 max-w-lg leading-relaxed">{t.heroDesc}</p>
            <div className="flex gap-4 pt-4">
              <Link to="/products" className="bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed px-10 py-4 rounded-lg font-bold tracking-tight hover:brightness-110 active:scale-[0.98] transition-all">{t.shopNow}</Link>
              <Link to="/about" className="border border-outline-variant/20 px-10 py-4 rounded-lg font-bold tracking-tight hover:bg-surface-container-highest transition-all text-on-surface">{t.viewSpecs}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8 mt-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[1.75rem] font-semibold tracking-tight uppercase text-on-surface">{t.featured}</h2>
            <div className="h-1 w-12 bg-primary mt-2"></div>
          </div>
          <Link to="/products" className="text-primary text-sm font-bold tracking-widest hover:underline">{t.viewAll}</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(p => (
            <div key={p.id} className="group relative bg-surface-container-low rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[3/4] overflow-hidden">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={p.image} alt={p.name} />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant font-medium">{p.category}</span>
                  <span className="text-primary font-bold">${p.price.toFixed(2)}</span>
                </div>
                <h3 className="font-bold text-lg text-on-surface leading-tight">{p.name}</h3>
                <button onClick={() => handleAddToCart(p)} className="w-full mt-2 py-2 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-[0.98] transition-all">
                  {t.addToCart}
                </button>
              </div>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8 mt-32">
        <h2 className="text-[1.75rem] font-semibold tracking-tight uppercase mb-12 text-on-surface">{t.ecosystem}</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-4 h-[600px]">
          <div className="md:col-span-3 md:row-span-2 group relative overflow-hidden rounded-xl bg-surface-container">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMBdDAEyyix0jDO_wRZw07eIWQOShNR1pS9q4Q2Dtw3JvuohRCb4MsEFgv3Sjd02NB1ahgbukBnWEEHzIKq-3YWvhmmVJZYnRMMT3nNiOK5vbFZRyMJ7lWO1g1oZz1v6hARUjk6kF5MgoYsZNDuQJ4Kg2oWuygsYckiy3dIWsFuMF-dT9AX-VDi_IwlT8MG87qI5xQOqTzx5uemU10OxkLlPWB1dz70eXCVe3mAe2w58umsJW1gvbGpumonDQWINmLlxMfWpMmwDG9" alt="Hardware" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131317] to-transparent"></div>
            <div className="absolute bottom-0 p-8">
              <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">HARDWARE</h3>
              <p className="text-on-surface-variant text-sm tracking-wide mb-6">{t.forgeHardware}</p>
              <Link to="/products" className="text-primary text-xs font-black tracking-widest border-b border-primary/40 pb-1">{t.exploreRigs}</Link>
            </div>
          </div>
          <div className="md:col-span-3 md:row-span-1 group relative overflow-hidden rounded-xl bg-surface-container">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA54HVgAbW60J95Jr7y_1iK8IQe_8WBD9w0qdjK1ujCzKo1peyCdpSLBf-1chh1mrk8HzTkXUBN44GI4-QF_W2FSB6mFvI1laAKmRnW9Y6hfbKV4RbcJCpoBQ5RKN8QyuPivGH71TFPvQauQQGB5eLhQAh8C-MftMQDv07BVoCAngbWfZSRTub8kFI_RE3lcQCT0dKQ_2uIVWtAl8UvXDv0PK-AxgCtcLpepZraB1DZSUwv72BneGBHHo7GUDgdDOO-aCrZHaK9-A8e" alt="RPG" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131317] to-transparent"></div>
            <div className="absolute bottom-0 p-8">
              <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">RPG</h3>
              <Link to="/products?genre=role-playing-games-rpg" className="text-primary text-xs font-black tracking-widest border-b border-primary/40 pb-1">{t.enterRealm}</Link>
            </div>
          </div>
          <div className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-xl bg-surface-container">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7VJ0sBVhz7WqRG84fzOgT3vBv2oNfkXLGN3FKeuSGdyCUgUUHr0MPqQ9EfBOapQ8MocJqRU7WWRiBMTEJlYg0cO3E0XkT7jT8aWi41yXUF0bEkPcOPC5PTIHEi_YLhVY998QXwya7CuNnoEM8uNfJd0scKsVa8T_Dt8-A9uPdY6U67L3k5wutcvIbyXbyeBR7HPUEgSJ_TM1yJfpcMIqH8xbRJdy5SVl2fV5qnCJ8qdAD6iMpaJZokwPrU-BrJ4_OBNUubVHWbNcg" alt="Action" />
            <div className="absolute inset-0 bg-surface-container/60"></div>
            <div className="absolute inset-0 flex items-center justify-center"><h3 className="text-xl font-black tracking-tighter uppercase">ACTION</h3></div>
          </div>
          <div className="md:col-span-2 md:row-span-1 group relative overflow-hidden rounded-xl bg-surface-container">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAttLfiW7ZSRLC9nGf8Sup-dIp5GrBunILMe6c36_CyY7Fp3Vhk65QfTL3cLczAICjQMAC8h1Zelf3a2rsLj6ImoWiS8CVeK5JMk3nhMpdBkMqX-CTa-DRTMvKizeJqClAWAxIOXBRbDEsWR30aWuctl7_2Kj9CUWqq8Q9_PA-3s7Llk84TgJfKEW0N4JMp2Lv60tzMvNVLw7Qx2SGTNmMTXZV3KQrn4VvdQbzF4bL5GXhJUgfibL3JyukTEhsj_E7SNterZSxGQ1tw" alt="Sports" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131317] to-transparent"></div>
            <div className="absolute bottom-0 p-8"><h3 className="text-2xl font-black tracking-tighter uppercase">SPORTS</h3></div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8 mt-32 mb-12">
        <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-low shadow-[0_40px_80px_rgba(103,0,181,0.1)]">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(164,230,255,0.15),transparent_50%)]"></div>
          <div className="flex flex-col md:flex-row items-center justify-between p-12 md:p-20 relative z-10">
            <div className="space-y-6 text-center md:text-start">
              <span className="text-secondary font-black tracking-[0.4em] text-[0.6875rem]">{t.limitedEvent}</span>
              <h2 className="text-[3rem] font-black tracking-tighter leading-tight italic text-on-surface">{t.summerSale}</h2>
              <p className="text-xl text-on-surface-variant max-w-md">{t.saleDesc}</p>
              <Link to="/products" className="inline-block bg-primary text-on-primary px-12 py-5 rounded-lg font-black tracking-widest text-sm hover:scale-105 transition-all">{t.redeem}</Link>
            </div>
            <div className="mt-12 md:mt-0"><Countdown t={t} /></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
