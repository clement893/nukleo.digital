import { Quote } from 'lucide-react';
import PageLayout from '../components/PageLayout';

interface Testimonial {
  name: string;
  title: string;
  company: string;
  project: string;
  quote: string;
  initials: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Charles Gagné-Bourque",
      title: "Co-Founder",
      company: "Ukko Solutions",
      project: "Website and Brand",
      quote: "I was truly impressed by the responsiveness and proactiveness of the Nukleo team, who adapted seamlessly to the tight deadlines set by my team. Their work, of exceptional quality, is built on a structured and iterative approach. What I particularly appreciated was how they kept me involved at every stage, allowing me to track progress and provide feedback quickly. The entire process was smooth and enjoyable from start to finish!",
      initials: "CG"
    },
    {
      name: "Bernard Colas",
      title: "Partner & Co-Founder",
      company: "Affilia",
      project: "Brand & Website",
      quote: "The Nukleo team has been an outstanding partner in our journey to create a distinct identity for Affilia Légal. Their innovative and tailored approach allowed us to break away from the traditional norms of the legal sector. What particularly impressed us was their ability to deliver significant added value at a highly competitive cost. Thanks to Nukleo, Affilia Légal now has a strong and distinctive identity that perfectly reflects our commitment to innovation and excellence.",
      initials: "BC"
    },
    {
      name: "Félix Morin",
      title: "President",
      company: "Succès Scolaire",
      project: "Website Redesign",
      quote: "Working with the Nukleo team on the redesign of our website was an incredibly positive experience. The impact was immediate: smoother navigation, a modern design, and improved online visibility. What sets Nukleo apart is their ability to combine technical expertise, strategic understanding, and human-centered support. They don't just execute a project—they act as true partners, offering tailored solutions and anticipating our needs.",
      initials: "FM"
    },
    {
      name: "Chelsea Dickie",
      title: "Managing Director",
      company: "Matchstick Theatre",
      project: "Website Redesign",
      quote: "Working with the team at Nukleo was amazing. We did a full top-to-bottom website transformation with them, and the entire process was clear, collaborative, and exciting. They kept in touch with us every step of the way, and were so caring if we needed extra help. They also worked so fast!! We came in with a need for a very fast turnaround, and they delivered an amazing website on time and under budget.",
      initials: "CD"
    },
    {
      name: "Domenic Calcara",
      title: "CEO",
      company: "Recrute Action",
      project: "Website Redesign",
      quote: "Working with the Nukleo team was an exceptional experience from start to finish. Their approach is strategic, human, and creative all at once. They managed to modernize our website while staying true to our culture, tone, and target audience. The result? A professional, high-performing site that truly reflects who we are. You managed to make a process that's often complex feel simple, seamless, and even enjoyable.",
      initials: "DC"
    },
    {
      name: "Denise Hobbs",
      title: "President",
      company: "GoCoupons",
      project: "Web Development",
      quote: "Working with Nukleo means choosing communication that's simple and effective. With Nukleo, you can be confident you'll get the right technology and tools for your needs. And if the solution doesn't exist yet, they create it. We recommend Nukleo to any organization that wants peace of mind knowing their projects are managed efficiently—and that the needs of each mandate are fully understood and respected.",
      initials: "DH"
    },
    {
      name: "Héloise Desrochers",
      title: "Fondatrice",
      company: "Les Béloufilles",
      project: "Crowdfunding Campaign",
      quote: "Working with Nukleo was an exceptional experience from start to finish. From the very first steps, we felt fully supported. Thanks to the professionalism, attentive listening, and commitment of the entire team, our crowdfunding campaign not only met its goals but far exceeded them. This collaboration allowed us to push our limits while feeling confident that the technical and strategic aspects were in good hands.",
      initials: "HD"
    },
    {
      name: "Daly Anne Zogbo",
      title: "Directrice des Dons Annuels",
      company: "MBAM Foundation",
      project: "Brand Identities",
      quote: "As soon as the Nukleo team began their mandate with the MBAM Foundation, we were delighted by their comprehensive management and transparency throughout the process. The new visual identity proposed by Nukleo had a decisive impact. It brought a refreshing and renewed perspective to our approach. I highly recommend Nukleo, which stands out for its undeniable efficiency and remarkable generosity.",
      initials: "DZ"
    },
    {
      name: "Aude Castonguay",
      title: "Member",
      company: "Les Voix Ferrées",
      project: "Graphic Design",
      quote: "Nukleo has supported Les Voix Ferrées through several projects, always with kindness and creativity. We feel completely confident working with a team that truly understands our needs and delivers products of exceptional quality. From our playful spaghetti dinner to our introspective concert, Nukleo complements our stories with striking and beautiful visuals. The feedback we hear most often is: 'Wow, they're so good.'",
      initials: "AC"
    },
    {
      name: "Bruce Trick",
      title: "Founder",
      company: "Bruce Trick",
      project: "Website",
      quote: "Working with Clément and the team at Nukleo was an excellent experience. They were professional, responsive, and really understood my vision for the website. The final result exceeded my expectations! I'm thrilled with how it turned out.",
      initials: "BT"
    },
    {
      name: "Adele Blais",
      title: "Artist",
      company: "Adele Blais",
      project: "Mobile App Development",
      quote: "I've been working with Nukleo for two years now, and it's been both a pleasant and professional collaboration. Follow-ups are handled seriously, and both the owners and the employees genuinely care about my project. They make sure everything runs smoothly and with great attention to detail. It's truly a wonderful team and a high-quality partnership.",
      initials: "AB"
    }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen py-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-sm font-mono uppercase tracking-widest text-purple-400 mb-4">
              Client Success Stories
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Testimonials
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with Nukleo.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-purple-400" />
                </div>

                {/* Project Type */}
                <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-purple-300">
                    {testimonial.project}
                  </p>
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 text-lg leading-relaxed mb-8 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar with Initials */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.initials}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-white font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-white/60 text-sm">
                      {testimonial.title}
                    </p>
                    <p className="text-purple-400 text-sm font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <p className="text-white/60 mb-6 text-lg">
              Ready to join our list of satisfied clients?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-purple-900 font-semibold hover:bg-purple-100 transition-all duration-300 hover:scale-105"
            >
              Start Your Project
              <img src="/fleche.png" alt="" className="w-4 h-4 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
