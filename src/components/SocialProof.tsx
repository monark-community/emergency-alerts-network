
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Award, Quote } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "University Student",
      location: "Berkeley, CA",
      rating: 5,
      text: "Guardian helped me feel safe walking home at night. When I triggered an alert, three verified responders were there in under 2 minutes!",
      earned: "$45",
      responses: 12
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Active Responder",
      location: "Austin, TX",
      rating: 5,
      text: "I've helped 23 people through Guardian and earned over $200. It feels amazing to make my neighborhood safer while earning rewards.",
      earned: "$267",
      responses: 23
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      role: "Local Business Owner",
      location: "Seattle, WA", 
      rating: 5,
      text: "My daughter uses Guardian on campus. Knowing there's a network of verified helpers gives me peace of mind as a parent.",
      earned: "$12",
      responses: 3
    }
  ];

  const stats = [
    { label: "People Helped This Week", value: "127", trend: "+23%" },
    { label: "Active Communities", value: "34", trend: "+8%" },
    { label: "Average Response Time", value: "2.3min", trend: "-15%" },
    { label: "Responder Satisfaction", value: "96%", trend: "+2%" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 space-y-20">
      {/* Community Stats */}
      <div className="text-center space-y-12">
        <div className="space-y-6">
          <Badge variant="outline" className="glass-effect border-0 text-gray-700 shadow-lg">
            📊 Community Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Real impact, real results
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how Guardian is making communities safer, one response at a time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-3">{stat.label}</div>
                <Badge variant="outline" className="text-xs glass-effect border-0 text-emerald-700 shadow-sm">
                  {stat.trend}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-12">
        <div className="text-center space-y-6">
          <Badge variant="outline" className="glass-effect border-0 text-gray-700 shadow-lg">
            💬 Community Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Trusted by people like you
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="glass-effect border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-gray-300" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" className="glass-effect border-0 text-emerald-700 shadow-sm">
                    Earned {testimonial.earned}
                  </Badge>
                  <div className="text-gray-500">
                    {testimonial.responses} responses
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
