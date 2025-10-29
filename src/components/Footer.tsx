export default function Footer(){
  return (
    <footer className="mt-16 bg-white/90 border-t border-white/30">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full text-center text-sm text-gray-700">
          © {new Date().getFullYear()} Ango Deserto — Rota dos Camelos
        </div>
      </div>
    </footer>
  );
}
