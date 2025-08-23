import { Metadata } from 'next';
import Header from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { UserCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline';

// Mock blog posts data (same as before)
const blogPosts = [
  {
    id: '1',
    title: 'The Art of Building Fictional Worlds',
    excerpt: 'Exploring how I create immersive settings for my stories and the research that goes into world-building.',
    date: '2023-10-15',
    readTime: '8 min read',
    category: 'Writing Process',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['world-building', 'writing tips', 'fiction']
  },
  {
    id: '2',
    title: 'Why I Write Speculative Fiction',
    excerpt: 'A personal reflection on my journey into speculative fiction and why I believe it\'s the most powerful genre for exploring human nature.',
    date: '2023-10-08',
    readTime: '6 min read',
    category: 'Personal Reflection',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['speculative fiction', 'genre', 'inspiration']
  },
  {
    id: '3',
    title: 'The Challenges of Writing a Series',
    excerpt: 'Maintaining consistency across multiple books while keeping each installment fresh and engaging for readers.',
    date: '2023-10-01',
    readTime: '10 min read',
    category: 'Writing Process',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['series', 'planning', 'consistency']
  },
  {
    id: '4',
    title: 'How I Overcome Writer\'s Block',
    excerpt: 'Practical strategies I use when facing creative blocks and how I keep the words flowing even on difficult days.',
    date: '2023-09-24',
    readTime: '7 min read',
    category: 'Writing Tips',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['writer\'s block', 'productivity', 'creativity']
  },
  {
    id: '5',
    title: 'The Role of Research in Fiction Writing',
    excerpt: 'How much research is too much? Finding the balance between factual accuracy and creative freedom.',
    date: '2023-09-17',
    readTime: '9 min read',
    category: 'Writing Process',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['research', 'accuracy', 'creative license']
  },
  {
    id: '6',
    title: 'Why I Embraced Crypto for My Writing Career',
    excerpt: 'How blockchain technology and USDC payments are creating new opportunities for independent authors.',
    date: '2023-09-10',
    readTime: '11 min read',
    category: 'Industry Thoughts',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=600&h=400&q=80',
    tags: ['web3', 'blockchain', 'independent authors']
  }
];

// Categories for the sidebar
const categories = [
  { name: 'Writing Process', count: 12 },
  { name: 'Personal Reflection', count: 8 },
  { name: 'Writing Tips', count: 15 },
  { name: 'Industry Thoughts', count: 6 },
  { name: 'Book Updates', count: 9 }
];

export default function Blog() {
  // Define the posts for each section (same as before)
  const mostPopularPosts = blogPosts.slice(2, 4);
  const newPost = blogPosts[5];
  const recentPosts = blogPosts.slice(1, 5);

  return (
    <div className="min-h-screen bg-white">
      <Header activeLink="blog" />
      
      <main className="w-full px-4 py-8">
        {/* Blog Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-sans font-bold text-dune-900 mb-4">Storytelling 101</h1>
          <p className="text-xl text-dune-700">
            Thoughts on writing, creativity, and being an independent author.
          </p>
        </div>

        {/* Top Row - Three Columns */}
        <div className="flex flex-col xl:flex-row gap-8 mb-12 w-full max-w-[1920px] mx-auto">
          {/* Left Column - Most Popular */}
          <div className="xl:w-1/4 xl:pl-8">
            <h2 className="text-2xl font-sans font-bold text-dune-900 mb-6 pb-2 border-b border-gray-200">Most Popular</h2>
            <div className="space-y-6">
              {mostPopularPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative w-full h-40">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-primary-600">{post.category}</span>
                    <h3 className="text-sm font-sans font-semibold text-dune-900 mt-1 mb-2 hover:text-primary-600 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-dune-700 mb-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          {/* Center Column - New */}
          <div className="xl:w-2/4 xl:px-8">
            <h2 className="text-2xl font-sans font-bold text-dune-900 mb-6 pb-2 border-b border-gray-200 text-center">New</h2>
            <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative w-full h-72">
                <Image 
                  src={newPost.image} 
                  alt={newPost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary-600">{newPost.category}</span>
                  <span className="text-sm text-gray-500">{newPost.date}</span>
                </div>
                
                <h3 className="text-3xl font-sans font-bold text-dune-700 mb-4 hover:text-primary-600 transition-colors">
                  <Link href={`/blog/${newPost.id}`}>{newPost.title}</Link>
                </h3>
                
                <p className="text-dune-700 mb-6 text-lg">{newPost.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{newPost.readTime}</span>
                  
                  <div className="flex gap-2">
                    {newPost.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-dune-700 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column - Recents */}
          <div className="xl:w-1/4 xl:pr-8">
            <h2 className="text-2xl font-sans font-bold text-dune-900 mb-6 pb-2 border-b border-gray-200 text-right">Recents</h2>
            <div className="space-y-16">
              {recentPosts.map((post) => (
                <article key={post.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-sans font-semibold text-dune-900 hover:text-primary-600 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 relative">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover rounded"
                      sizes="64px"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Two Columns */}
        <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1920px] mx-auto">
          {/* Left Column - All Blog Posts Grid */}
          <div className="xl:w-3/4 xl:pr-8">
            <h2 className="text-2xl font-sans font-bold text-dune-900 mb-6 pb-2 border-b border-gray-200">All Posts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="relative w-full h-48">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-primary-600">{post.category}</span>
                    <h3 className="text-sm font-sans font-semibold text-dune-900 mt-1 mb-2 hover:text-primary-600 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-dune-700 mb-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column - About Author and Categories */}
          <div className="xl:w-1/4 xl:pl-8">
            {/* About the Author */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-10">
              <h3 className="text-lg font-sans font-semibold text-dune-900 mb-4">About the Author</h3>
              <div className="flex items-center mb-16">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                  <UserCircleIcon className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-medium text-dune-900">J.K. Storyweaver</p>
                  <p className="text-sm text-gray-500">Fiction Writer & World-Builder</p>
                </div>
              </div>
              <p className="text-dune-700 text-sm">
                I write speculative fiction that explores the boundaries of human experience. 
                Join me on my writing journey and get exclusive insights into my creative process.
              </p>
              <button className="w-full mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                Subscribe to Newsletter
              </button>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-sans font-semibold text-dune-900 mb-4">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.name} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <a href="#" className="text-dune-700 hover:text-primary-600 transition-colors flex items-center">
                      <BookOpenIcon className="h-4 w-4 mr-2" />
                      {category.name}
                    </a>
                    <span className="text-gray-400 text-sm">({category.count})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}