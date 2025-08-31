'use client';
import Header from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { useCart } from '@/app/context/CardContext';
import Image from 'next/image';
import { CheckCircleIcon, ClockIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

const mentorshipOfferings = [
  {
    id: 'mentorship-1',
    type: 'class',
    title: 'Fiction Writing Masterclass',
    description: 'A comprehensive 8-week course covering character development, plot structure, and world-building techniques.',
    price: 10.00,
    duration: '8 weeks',
    format: 'Group sessions (max 10 students)',
    features: [
      'Weekly live workshops',
      'Personalized feedback on your work',
      'Access to exclusive resources',
      'Community forum access',
      'Certificate of completion'
    ],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&h=400&q=80',
    schedule: 'Starts first Monday of each month'
  },
  {
    id: 'mentorship-2',
    type: 'class',
    title: 'Self-Publishing Intensive',
    description: 'Learn how to successfully self-publish your work, from manuscript to market in 4 weeks.',
    price: 10.00,
    duration: '4 weeks',
    format: 'Group sessions (max 8 students)',
    features: [
      'Step-by-step publishing guide',
      'Cover design principles',
      'Marketing strategies',
      'Distribution platforms overview',
      'Q&A with successful indie authors'
    ],
    image: 'https://images.unsplash.com/photo-1698434156440-df22e73ff5bd?auto=format&fit=crop&w=600&h=400&q=80',
    schedule: 'Bi-weekly cohorts'
  },
  {
    id: 'mentorship-3',
    type: 'one-on-one',
    title: 'Manuscript Critique & Development',
    description: 'Detailed analysis of your complete manuscript with actionable feedback and revision strategies.',
    price: 10.00,
    duration: '4 sessions',
    format: 'One-on-one',
    features: [
      'In-depth manuscript evaluation',
      'Two 60-minute consultation calls',
      'Written critique report',
      'Publishing guidance',
      'Query letter review'
    ],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&h=400&q=80',
    schedule: 'Scheduled at your convenience'
  },
  {
    id: 'mentorship-4',
    type: 'one-on-one',
    title: 'Career Strategy Session',
    description: 'Personalized guidance on building your writing career, branding, and long-term planning.',
    price: 10.00,
    duration: '90 minutes',
    format: 'One-on-one',
    features: [
      'Career assessment',
      'Goal setting session',
      'Brand development strategy',
      'Monetization approaches',
      'Personalized action plan'
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&h=400&q=80',
    schedule: 'Scheduled at your convenience'
  }
];

export default function Mentorship() {
  const { addToCart } = useCart();

  const handleAddToCart = (offering: any) => {
    const cartProduct = {
      id: offering.id,
      name: offering.title,
      price: offering.price,
      description: offering.description,
      image: offering.image,
      type: 'mentorship' as const,
      duration: offering.duration,
      formatType: offering.format,
      features: offering.features,
      schedule: offering.schedule
    };
    
    addToCart(cartProduct);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeLink="mentorship" />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-dune-900 mb-4">Writing Mentorship</h1>
          <p className="text-xl text-dune-700 max-w-2xl mx-auto mb-6">
            Elevate your craft with personalized guidance, workshops, and one-on-one coaching sessions
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center text-sm text-dune-700">
              <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2" />
              Experienced fiction writer
            </div>
            <div className="flex items-center text-sm text-dune-700">
              <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2" />
              Published 12+ books
            </div>
            <div className="flex items-center text-sm text-dune-700">
              <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2" />
              5+ years teaching experience
            </div>
          </div>
        </div>

        {/* Mentorship Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mentorshipOfferings.map((offering) => (
            <div key={offering.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image 
                  src={offering.image} 
                  alt={offering.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    offering.type === 'class' 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'bg-dune-100 text-dune-800'
                  }`}>
                    {offering.type === 'class' ? 'Group Class' : '1-on-1'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold text-dune-900 mb-2">{offering.title}</h2>
                <p className="text-dune-700 mb-4">{offering.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary-600">${offering.price}</div>
                  <div className="flex items-center text-sm text-dune-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {offering.duration}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-sm text-dune-700 mb-2">
                    {offering.type === 'class' ? (
                      <UserGroupIcon className="h-4 w-4 mr-2" />
                    ) : (
                      <VideoCameraIcon className="h-4 w-4 mr-2" />
                    )}
                    {offering.format}
                  </div>
                  <div className="text-sm text-dune-500">{offering.schedule}</div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {offering.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-dune-700">
                      <CheckCircleIcon className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => handleAddToCart(offering)}
                  className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

          {/* Testimonials Section */}
        <div className="bg-primary-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-serif font-bold text-dune-900 mb-6 text-center">What Writers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-dune-700 italic mb-4">&ldquo;The manuscript critique completely transformed my novel. The feedback was insightful and actionable.&rdquo;</p>
              <p className="text-sm font-medium text-dune-900">- Sarah J., Fiction Writer</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-dune-700 italic mb-4">&ldquo;The masterclass gave me the confidence and tools I needed to finally finish my first book.&rdquo;</p>
              <p className="text-sm font-medium text-dune-900">- Michael T., Aspiring Author</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-dune-700 italic mb-4">&ldquo;The career strategy session helped me develop a clear path forward for my writing business.&rdquo;</p>
              <p className="text-sm font-medium text-dune-900">- Jennifer L., Non-Fiction Writer</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-dune-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-dune-900 mb-2">How do the group classes work?</h3>
              <p className="text-dune-700">Group classes are conducted via video conference with a maximum of 10 participants. Each session includes instruction, exercises, and Q&A. Recordings are available if you miss a session.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-dune-900 mb-2">What&rsquo;s your cancellation policy?</h3>
              <p className="text-dune-700">You can cancel or reschedule 1-on-1 sessions with 24 hours notice. For group classes, we offer a full refund if canceled at least 7 days before the start date.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-dune-900 mb-2">Do you offer payment plans?</h3>
              <p className="text-dune-700">Yes, we offer payment plans for all classes over $200. Please contact us for details.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-dune-900 text-white rounded-lg p-12 mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Elevate Your Writing?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">Join writers who have transformed their craft and careers through personalized mentorship</p>
          <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-600 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            View All Offerings
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}