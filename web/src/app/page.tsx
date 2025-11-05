import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Professional Online Language Testing
            </h1>
            <p className="text-xl mb-8">
              Measure, analyze, and certify language proficiency with internationally recognized standards
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/register" className="btn-primary text-lg">
                Get Started
              </Link>
              <Link href="/exams" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg text-lg">
                Browse Exams
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Testing</h3>
              <p className="text-gray-600">
                Multiple exam types covering all CEFR levels from A1 to C2
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get immediate feedback with detailed skill-based analysis
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Certified Achievement</h3>
              <p className="text-gray-600">
                Receive internationally recognized certificates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Students Tested</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Institutions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">8,500+</div>
              <div className="text-gray-600">Certificates Issued</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Test Your Skills?</h2>
          <p className="text-xl mb-8">Join thousands of students worldwide</p>
          <Link href="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg inline-block">
            Start Your Journey
          </Link>
        </div>
      </section>
    </main>
  );
}

