export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🌴 Turistar Sul
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sistema de Gestão Turística
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">📍 Pontos Turísticos</h2>
              <p className="text-gray-600">Cadastre e gerencie pontos turísticos</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">🍽️ Restaurantes</h2>
              <p className="text-gray-600">Gerencie restaurantes e gastronomia</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">🏨 Hospedagens</h2>
              <p className="text-gray-600">Cadastre hotéis e pousadas</p>
            </div>
          </div>

          <div className="mt-12">
            <a 
              href="/login" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Fazer Login
            </a>
            <span className="mx-4 text-gray-400">ou</span>
            <a 
              href="/register" 
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Cadastrar-se
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
