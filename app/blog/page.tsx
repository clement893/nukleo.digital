"use client";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background-light to-background py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Blog AG Business
          </h1>
          <p className="text-xl md:text-2xl text-black font-semibold leading-relaxed max-w-3xl mx-auto">
            Stay informed about the latest trends and news in the agricultural sector
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700">
            Découvrez les dernières actualités et tendances du secteur agricole.
          </p>
        </div>
      </section>
    </main>
  );
}
