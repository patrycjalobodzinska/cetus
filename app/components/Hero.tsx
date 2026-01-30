import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Tło z napisem CETUSPRO */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <span className="text-[15vw] md:text-[18vw] font-black text-gray-100 opacity-80 tracking-wider whitespace-nowrap">
          CETUSPRO
        </span>
      </div>

      {/* Główna zawartość */}
      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
        {/* Lewa strona - Tekst */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Tworzymy <span className="text-blue-600">przyszłość</span> <br />
            Twojego biznesu
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            Nowoczesne rozwiązania technologiczne, które pomogą Ci wyprzedzić konkurencję i skalować biznes.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
              Rozpocznij
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
              Dowiedz się więcej
            </button>
          </div>
        </div>

        {/* Prawa strona - Obraz */}
        <div className="">
          <div className="">
            <img
              src="/cetus.png"
              alt="Cetus"
              className="w-full h-full object-cover opacity-85"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
