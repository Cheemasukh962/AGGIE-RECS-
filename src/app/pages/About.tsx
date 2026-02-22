import { AnimatedContent } from '../components/AnimatedContent';
import { Heart, Users, Clock, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5E7F64]/30 to-[#E37861]/30" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1763355873417-1e0926397851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzdXBwb3J0JTIwaGVscGluZyUyMGhhbmRzfGVufDF8fHx8MTc3MTcwNjk1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Community support"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedContent direction="up" duration={1.2}>
            <h1 className="text-6xl md:text-7xl mb-6" style={{ color: '#5E7F64' }}>
              About The Pantry
            </h1>
            <p className="text-xl md:text-2xl text-gray-700">
              Supporting UC Davis students with dignity and compassion
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedContent direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-6" style={{ color: '#E37861' }}>
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                The ASUCD Pantry ensures no UC Davis student lacks basic necessities or 
                misses a meal due to financial reasons. We provide a confidential, welcoming 
                space where all Aggies can access the food and resources they need to thrive.
              </p>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F4E8D0' }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedContent direction="up" delay={0.3}>
            <h2 className="text-4xl text-center mb-12" style={{ color: '#5E7F64' }}>
              Our Values
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div 
                  className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#E37861' }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#5E7F64' }}>
                  Warm & Welcoming
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We create an inclusive, friendly environment where every student feels 
                  comfortable accessing the support they need. No one should feel ashamed 
                  about needing help.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div 
                  className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#EEB467' }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#5E7F64' }}>
                  Confidential
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy matters. We operate on a "no questions asked" basis. 
                  Simply swipe your card and go—it's that simple and discreet.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div 
                  className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#5E7F64' }}
                >
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#5E7F64' }}>
                  Always Available
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We're here when you need us. Visit our physical location and redeem 
                  three points a day for nutritious food items that fit your needs.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div 
                  className="w-16 h-16 mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#DDBE86' }}
                >
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: '#5E7F64' }}>
                  Community-Driven
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We're students helping students. The Pantry is run by and for the Aggie 
                  community, ensuring we understand and meet the real needs of UC Davis students.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedContent direction="up" delay={0.4}>
            <h2 className="text-4xl text-center mb-12" style={{ color: '#E37861' }}>
              How It Works
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: '#5E7F64' }}
                >
                  1
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#E37861' }}>
                    Visit The Pantry
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Come to our physical location on the UC Davis campus. All UC Davis 
                    students are welcome, no appointment needed.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: '#5E7F64' }}
                >
                  2
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#E37861' }}>
                    Swipe Your Card
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Use your student ID to redeem up to three points per day. It's quick, 
                    easy, and completely confidential.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: '#5E7F64' }}
                >
                  3
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#E37861' }}>
                    Choose Your Items
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Select from a variety of nutritious food items—fresh produce, proteins, 
                    grains, and more. Take what you need for your meals.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: '#5E7F64' }}
                >
                  4
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{ color: '#E37861' }}>
                    Cook & Enjoy
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Use this website to discover recipes that match your ingredients. 
                    Transform your food haul into delicious, nutritious meals!
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Destigmatizing Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F4E8D0' }}>
        <div className="max-w-4xl mx-auto">
          <AnimatedContent direction="up" delay={0.5}>
            <div className="text-center">
              <h2 className="text-4xl mb-6" style={{ color: '#5E7F64' }}>
                Destigmatizing Food Insecurity
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Food insecurity affects students from all backgrounds. It's not a reflection 
                of your character, work ethic, or worth as a person. Life happens, circumstances 
                change, and we all need support sometimes.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                By making The Pantry accessible, confidential, and welcoming, we're working 
                to remove the stigma around seeking food assistance. You deserve to eat well 
                and focus on your education without worrying about your next meal.
              </p>
              <div 
                className="inline-block px-8 py-4 rounded-2xl text-white text-xl"
                style={{ backgroundColor: '#E37861' }}
              >
                You are not alone. We're here for you.
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedContent direction="up" delay={0.6}>
            <h2 className="text-4xl text-center mb-12" style={{ color: '#E37861' }}>
              Accessibility & Privacy
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: '#DDBE86' }}>
                <h3 className="text-xl mb-3" style={{ color: '#5E7F64' }}>
                  Accessible Design
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  All video tutorials on our website include captions. Our color scheme 
                  maintains high contrast for easy readability, ensuring everyone can 
                  access our resources.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{ borderColor: '#DDBE86' }}>
                <h3 className="text-xl mb-3" style={{ color: '#5E7F64' }}>
                  Minimal Data Entry
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We keep data entry to a minimum to maintain our "swipe and go" approach. 
                  Your information stays private, and you can focus on getting the support 
                  you need.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </div>
  );
}
