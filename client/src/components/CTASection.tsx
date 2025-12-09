import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative gradient-mesh overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-white mb-8">
            Ready to<br />
            Ascend?
          </h2>

          <p className="text-white/75 text-lg lg:text-xl leading-relaxed mb-12">
            The era of Agentic Marketing is here. Define your roadmap to becoming an AI-native leader.
          </p>

          <a href="/start-project">
            <Button
              className="rounded-full text-lg px-10 py-8 bg-white text-purple-900 hover:bg-white/90 transition-all duration-500 font-bold tracking-wider hover:scale-[1.022] shimmer"
            >
              Start Your Transformation
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
