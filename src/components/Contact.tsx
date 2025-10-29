export default function Contact(){
  return (
    <section id="contact" className="py-16">
      <h3 className="font-display text-2xl mb-4">Contacto</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-700">Para reservas e informações, envie uma mensagem através do formulário ou entre em contacto pelas nossas redes sociais.</p>

          {/* Map placeholder: substitua o src pelo embed do Google Maps com a localização de Caraculo, Namibe */}
          <div className="mt-6 rounded-lg overflow-hidden shadow">
            <iframe
              title="Localização Ango Deserto"
              src="https://www.google.com/maps/embed?pb=!1m18!2m12"
              className="w-full h-64 border-0"
              loading="lazy"
            />
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Telefone: <a href="tel:+244000000000" className="underline">+244 ...</a> (a preencher)</p>
            <p>Redes: <a href="https://www.instagram.com/angodeserto" target="_blank" className="underline">Instagram</a> · <a href="https://www.facebook.com/yourprofile" target="_blank" className="underline">Facebook</a> · <a href="https://www.tiktok.com/@angodeserto" target="_blank" className="underline">TikTok</a></p>
          </div>
        </div>

        <form action="https://formspree.io/f/YOURENDPATH" method="POST" className="bg-white rounded-2xl p-6 shadow">
          <label className="block mb-3">
            <span className="text-sm">Nome</span>
            <input name="name" required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </label>

          <label className="block mb-3">
            <span className="text-sm">Email</span>
            <input name="email" type="email" required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </label>

          <label className="block mb-3">
            <span className="text-sm">Mensagem</span>
            <textarea name="message" rows={4} required className="mt-1 block w-full rounded-md border px-3 py-2" />
          </label>

          <button type="submit" className="btn-primary">Enviar mensagem</button>
          <p className="mt-3 text-xs text-gray-500">Nós respondemos por email ou WhatsApp.</p>
        </form>
      </div>
    </section>
  );
}
