import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCartTotal, clearCart } from '../utils/cart'
import { useApp } from '../context/AppContext'
import { translations } from '../utils/translations'

const paymentMethods = [
  {
    id: 'card',
    labelEn: 'Credit / Debit Card',
    labelAr: 'بطاقة ائتمانية / خصم',
    subEn: 'Visa · Mastercard · Meeza',
    subAr: 'فيزا · ماستركارد · ميزة',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a3e] to-[#2d2d5e] border border-white/10 flex items-center justify-center gap-0.5 flex-shrink-0">
        <span className="text-[9px] font-black italic text-blue-300 leading-none">VISA</span>
        <div className="flex ms-1 -space-x-1">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 opacity-90 -ms-1.5"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'vodafone',
    labelEn: 'Vodafone Cash',
    labelAr: 'فودافون كاش',
    subEn: 'Pay with your Vodafone mobile wallet',
    subAr: 'ادفع بمحفظة فودافون موبايل',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E60000] to-[#B20000] flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(230,0,0,0.4)] relative">
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="white">
          <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3zm1.6 17.8c-2.6.9-5.4-.5-6.3-3.1-.6-1.9.1-3.9 1.7-5l2 2c-.8.6-1.2 1.7-.9 2.7.4 1.3 1.8 2 3.1 1.6l.4 1.8z"/>
        </svg>
        <div className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-white border-2 border-[#E60000] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E60000]"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'fawry',
    labelEn: 'Fawry',
    labelAr: 'فوري',
    subEn: 'Pay at any Fawry outlet near you',
    subAr: 'ادفع في أقرب نقطة فوري',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#E65000] flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(255,107,0,0.35)]">
        <span className="text-white font-black text-2xl leading-none italic" style={{ fontFamily: 'Arial, sans-serif' }}>F</span>
      </div>
    ),
  },
  {
    id: 'instapay',
    labelEn: 'InstaPay',
    labelAr: 'إنستاباي',
    subEn: 'Instant bank transfer via InstaPay',
    subAr: 'تحويل بنكي فوري عبر إنستاباي',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A0080] to-[#8B2FC9] flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(139,47,201,0.4)]">
        <span className="material-symbols-outlined text-white" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
      </div>
    ),
  },
  {
    id: 'paypal',
    labelEn: 'PayPal',
    labelAr: 'باي بال',
    subEn: 'Fast & secure global payments',
    subAr: 'مدفوعات سريعة وآمنة عالمياً',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003087] to-[#009CDE] flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(0,48,135,0.4)]">
        <div className="flex -space-x-1">
          <span className="text-white font-black text-xl leading-none">P</span>
          <span className="text-[#A8D8F8] font-black text-xl leading-none mt-1">P</span>
        </div>
      </div>
    ),
  },
  {
    id: 'cod',
    labelEn: 'Cash on Delivery',
    labelAr: 'الدفع عند الاستلام',
    subEn: 'Pay in cash when your order arrives',
    subAr: 'ادفع نقداً عند وصول طلبك',
    logo: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#166534] to-[#15803d] flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_rgba(21,128,61,0.35)]">
        <span className="material-symbols-outlined text-white" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
      </div>
    ),
  },
]

function CardInputFields({ lang }) {
  const isAr = lang === 'ar'
  return (
    <div className="mt-6 p-6 rounded-xl bg-surface-container-lowest border border-primary/20 space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-[0.6875rem] uppercase tracking-widest font-medium text-on-surface-variant">
          {isAr ? 'رقم البطاقة' : 'Card Number'}
        </label>
        <div className="flex items-center bg-surface-container px-4 py-3 rounded-lg border border-outline-variant/20 focus-within:border-primary/50 transition-all">
          <span className="material-symbols-outlined text-outline me-3" style={{ fontSize: '18px' }}>credit_card</span>
          <input
            placeholder="1234  5678  9012  3456"
            maxLength={19}
            className="bg-transparent outline-none flex-1 text-sm font-mono text-on-surface placeholder:text-outline/40 tracking-widest"
            type="text"
            readOnly
          />
          <div className="flex gap-1 ms-2">
            <div className="w-5 h-3.5 rounded border border-white/10 bg-gradient-to-br from-[#1a1a3e] to-[#2d2d5e] flex items-center justify-center">
              <span className="text-[5px] font-black italic text-blue-300">V</span>
            </div>
            <div className="flex -space-x-1">
              <div className="w-3 h-3.5 rounded-full bg-red-500"></div>
              <div className="w-3 h-3.5 rounded-full bg-yellow-400 -ms-1"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[0.6875rem] uppercase tracking-widest font-medium text-on-surface-variant">
            {isAr ? 'تاريخ الانتهاء' : 'Expiry Date'}
          </label>
          <input placeholder="MM / YY" className="bg-surface-container px-4 py-3 rounded-lg border border-outline-variant/20 text-sm font-mono tracking-widest text-on-surface placeholder:text-outline/40 outline-none focus:border-primary/50 transition-all" readOnly />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[0.6875rem] uppercase tracking-widest font-medium text-on-surface-variant">CVV</label>
          <input placeholder="•••" className="bg-surface-container px-4 py-3 rounded-lg border border-outline-variant/20 text-sm font-mono tracking-widest text-on-surface placeholder:text-outline/40 outline-none focus:border-primary/50 transition-all" readOnly />
        </div>
      </div>
      <p className="text-[0.6rem] text-outline uppercase tracking-widest flex items-center gap-2">
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>lock</span>
        {isAr ? 'بياناتك مشفرة وآمنة بالكامل' : 'Your card data is fully encrypted & secure'}
      </p>
    </div>
  )
}

function VodafoneInput({ lang }) {
  const isAr = lang === 'ar'
  return (
    <div className="mt-6 p-6 rounded-xl bg-[#E60000]/5 border border-[#E60000]/25 space-y-4">
      <p className="text-sm text-on-surface-variant">{isAr ? 'أدخل رقم هاتف فودافون الخاص بك' : 'Enter your registered Vodafone number'}</p>
      <div className="flex items-center bg-surface-container px-4 py-3 rounded-lg border border-[#E60000]/30 focus-within:border-[#E60000]/60 transition-all gap-3">
        <div className="w-6 h-6 rounded-full bg-[#E60000] flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-white" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>smartphone</span>
        </div>
        <span className="text-outline text-sm">+20</span>
        <div className="w-px h-4 bg-outline-variant/30"></div>
        <input placeholder="01X XXXX XXXX" className="bg-transparent outline-none flex-1 text-sm font-mono text-on-surface placeholder:text-outline/40 tracking-widest" readOnly />
      </div>
      <p className="text-[0.6rem] text-[#E60000]/70 uppercase tracking-widest flex items-center gap-2">
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>info</span>
        {isAr ? 'سيتم إرسال PIN على رقمك لتأكيد الدفع' : 'A confirmation PIN will be sent to your number'}
      </p>
    </div>
  )
}

function FawryInput({ lang }) {
  const isAr = lang === 'ar'
  return (
    <div className="mt-6 p-6 rounded-xl bg-[#FF6B00]/5 border border-[#FF6B00]/25 space-y-3">
      <p className="text-sm font-semibold text-on-surface">{isAr ? 'كود فوري الخاص بك:' : 'Your Fawry Reference Code:'}</p>
      <div className="flex items-center gap-4 bg-surface-container px-5 py-4 rounded-lg border border-[#FF6B00]/30">
        <span className="font-mono text-2xl font-black text-[#FF6B00] tracking-[0.2em]">4821-9073</span>
        <button className="ms-auto text-outline hover:text-[#FF6B00] transition-colors" title="Copy">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>content_copy</span>
        </button>
      </div>
      <p className="text-[0.6rem] text-outline uppercase tracking-widest">{isAr ? 'اعرض هذا الكود في أي نقطة فوري للدفع' : 'Show this code at any Fawry outlet to complete payment'}</p>
    </div>
  )
}

function Checkout({ cart, setCart }) {
  const { lang } = useApp()
  const t = translations[lang].checkout
  const isAr = lang === 'ar'

  const subtotal = getCartTotal(cart)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const [form, setForm] = useState({ fullName: '', email: '', address: '', city: '', state: '', postal: '' })
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function handleSubmit(e) {
    e.preventDefault()
    setCart(clearCart())
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(0,209,255,0.4)]">
            <span className="material-symbols-outlined text-on-primary-fixed" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-on-surface">{t.confirmed}</h1>
          <p className="text-on-surface-variant text-lg max-w-md mx-auto">{t.confirmedDesc}</p>
          <p className="text-sm text-outline uppercase tracking-widest">
            {isAr ? `💳 تم الدفع بـ ${paymentMethods.find(p => p.id === selectedPayment)?.[isAr ? 'labelAr' : 'labelEn']}` : `💳 Paid via ${paymentMethods.find(p => p.id === selectedPayment)?.labelEn}`}
          </p>
          <Link to="/" className="inline-block px-12 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-black uppercase tracking-widest rounded-lg hover:brightness-110 transition-all">{t.returnBtn}</Link>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto min-h-screen text-center">
        <h2 className="text-2xl font-semibold mb-4 text-on-surface">{t.emptyCart}</h2>
        <Link to="/products" className="text-primary hover:underline">← {isAr ? 'تصفح الألعاب' : 'Browse Games'}</Link>
      </main>
    )
  }

  const selectedMethod = paymentMethods.find(p => p.id === selectedPayment)

  return (
    <main className="pt-32 pb-24 px-8 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary-fixed flex items-center justify-center font-black text-sm">1</div>
              <h2 className="text-2xl font-semibold tracking-tight text-on-surface">{t.title}</h2>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[['fullName', t.fullName, 'John Doe', 'text'], ['email', t.email, 'john@example.com', 'email']].map(([name, label, ph, type]) => (
                  <div key={name} className="flex flex-col gap-2">
                    <label className="text-[0.6875rem] uppercase tracking-widest font-medium text-on-surface-variant">{label}</label>
                    <input name={name} required value={form[name]} onChange={handleChange} className="bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface py-3 px-0 transition-all placeholder:text-outline/40 outline-none" placeholder={ph} type={type} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.6875rem] uppercase tracking-widest font-medium text-on-surface-variant">{t.address}</label>
                <input name="address" required value={form.address} onChange={handleChange} className="bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface py-3 px-0 transition-all placeholder:text-outline/40 outline-none" placeholder="123 Main St" type="text" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[['city', t.city, 'Cairo'], ['state', t.state, 'EG'], ['postal', t.postal, '11511']].map(([name, label, ph]) => (
                  <div key={name} className="flex flex-col gap-2">
                    <label className="text-[0.6875rem] uppercase tracking-widest font-medium text-on-surface-variant">{label}</label>
                    <input name={name} required value={form[name]} onChange={handleChange} className="bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface py-3 px-0 transition-all placeholder:text-outline/40 outline-none" placeholder={ph} type={text} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary-fixed flex items-center justify-center font-black text-sm">2</div>
              <h2 className="text-2xl font-semibold tracking-tight text-on-surface">
                {isAr ? 'طريقة الدفع' : 'Payment Method'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentMethods.map(method => {
                const isSelected = selectedPayment === method.id
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id)}
                    className={`relative flex items-center gap-4 p-5 rounded-xl border-2 text-start transition-all duration-200 hover:-translate-y-0.5 ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(0,209,255,0.12)]'
                        : 'border-outline-variant/15 bg-surface-container-low hover:border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    {method.logo}
                    <div className="flex-grow min-w-0">
                      <div className={`font-bold text-sm leading-tight ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                        {isAr ? method.labelAr : method.labelEn}
                      </div>
                      <div className="text-[0.6875rem] text-outline mt-1 leading-relaxed truncate">
                        {isAr ? method.subAr : method.subEn}
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'border-primary bg-primary' : 'border-outline-variant/40'}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-on-primary-fixed"></div>}
                    </div>
                    {isSelected && (
                      <div className="absolute top-0 start-0 w-1 h-full bg-gradient-to-b from-primary to-primary-container rounded-s-xl"></div>
                    )}
                  </button>
                )
              })}
            </div>
            <div className="mt-2">
              {selectedPayment === 'card'      && <CardInputFields lang={lang} />}
              {selectedPayment === 'vodafone'  && <VodafoneInput lang={lang} />}
              {selectedPayment === 'fawry'     && <FawryInput lang={lang} />}
              {selectedPayment === 'instapay'  && (
                <div className="mt-6 p-6 rounded-xl bg-[#4A0080]/5 border border-[#4A0080]/25 space-y-3">
                  <p className="text-sm text-on-surface-variant">{isAr ? 'افتح تطبيق البنك واستخدم InstaPay على الرقم:' : 'Open your bank app and use InstaPay to send to:'}</p>
                  <div className="flex items-center gap-3 bg-surface-container px-4 py-3 rounded-lg border border-[#8B2FC9]/30">
                    <span className="font-mono font-bold text-[#8B2FC9] text-lg">nagy-pro@instapay</span>
                    <button className="ms-auto text-outline hover:text-[#8B2FC9] transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '18px' }}>content_copy</span></button>
                  </div>
                </div>
              )}
              {selectedPayment === 'paypal'    && (
                <div className="mt-6 p-6 rounded-xl bg-[#003087]/5 border border-[#003087]/25">
                  <p className="text-sm text-on-surface-variant mb-4">{isAr ? 'سيتم تحويلك إلى PayPal لإتمام عملية الدفع' : 'You will be redirected to PayPal to complete your payment'}</p>
                  <div className="flex items-center gap-3 text-[#009CDE] font-bold text-sm">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>open_in_new</span>
                    paypal.com/checkout
                  </div>
                </div>
              )}
              {selectedPayment === 'cod'       && (
                <div className="mt-6 p-6 rounded-xl bg-green-900/10 border border-green-800/25">
                  <p className="text-sm text-on-surface-variant leading-relaxed">{isAr ? '✅ سيتم تحصيل المبلغ نقداً عند التسليم. يرجى تجهيز المبلغ بالضبط.' : '✅ You will pay in cash upon delivery. Please have the exact amount ready.'}</p>
                </div>
              )}
            </div>
          </section>

          <form onSubmit={handleSubmit}>
            <button type="submit" className="w-full py-5 px-8 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-black tracking-tight text-lg hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-3 group shadow-[0_0_30px_rgba(0,209,255,0.25)]">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              {t.placeOrder}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            <p className="text-center text-[0.625rem] text-on-surface-variant/50 uppercase tracking-widest mt-4">{t.secureText}</p>
          </form>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-32 p-10 bg-surface-container-low rounded-2xl border border-outline-variant/10 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <h2 className="text-xl font-bold text-on-surface mb-8">{t.summary}</h2>
            <div className="space-y-5 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-high">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-center min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-semibold text-on-surface line-clamp-1 flex-1">{item.name}</h3>
                      <span className="text-sm font-bold text-primary whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-[0.625rem] text-outline mt-1 uppercase tracking-widest">{t.qty}: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-6 border-t border-outline-variant/15">
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">{t.subtotal}</span><span className="text-on-surface">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">{t.shipping}</span><span className="text-green-400 font-bold">{t.free}</span></div>
              <div className="flex justify-between text-sm"><span className="text-on-surface-variant">{t.tax}</span><span className="text-on-surface">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-black pt-4 border-t border-outline-variant/15">
                <span className="text-on-surface">{t.total}</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            {selectedMethod && (
              <div className="mt-6 pt-6 border-t border-outline-variant/10">
                <p className="text-[0.625rem] uppercase tracking-widest text-outline mb-3">
                  {isAr ? 'طريقة الدفع المختارة' : 'Selected Payment'}
                </p>
                <div className="flex items-center gap-3">
                  {selectedMethod.logo}
                  <div>
                    <div className="text-sm font-bold text-on-surface">{isAr ? selectedMethod.labelAr : selectedMethod.labelEn}</div>
                    <div className="text-[0.6rem] text-outline uppercase tracking-widest">{isAr ? selectedMethod.subAr : selectedMethod.subEn}</div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-6 flex items-center justify-center gap-3 text-outline-variant/50">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>encrypted</span>
              <span className="text-[0.6rem] uppercase tracking-widest">{isAr ? 'تشفير SSL 256-bit' : 'SSL 256-bit Encrypted'}</span>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified_user</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
