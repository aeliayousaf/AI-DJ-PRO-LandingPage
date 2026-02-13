'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function ImagePlaceholder({
  aspectRatio = 'video',
  label,
  gradient = 'default',
  className = '',
  src,
}: {
  aspectRatio?: 'video' | 'square' | 'wide' | 'tall';
  label?: string;
  gradient?: 'default' | 'warm' | 'cool' | 'glow';
  className?: string;
  src?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const aspectMap = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    tall: 'aspect-[3/4]',
  };
  const gradientMap = {
    default: 'from-white/10 via-white/5 to-transparent',
    warm: 'from-amber-500/20 via-orange-500/10 to-transparent',
    cool: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    glow: 'from-white/20 via-purple-500/10 to-transparent',
  };
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] ${aspectMap[aspectRatio]} ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={label ?? ''}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientMap[gradient]} opacity-60`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-px w-24 bg-white/20 rounded-full animate-pulse" />
          </div>
        </>
      )}
      {label && (
        <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-white/30 font-medium tracking-wide drop-shadow-lg">
          {label}
        </div>
      )}
    </div>
  );
}

export default function ContentSections() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef}>
      {/* What is AI DJ Pro */}
      <AnimatedSection
        className="py-32 px-6 md:px-12 border-t border-white/[0.06] bg-[#050505]"
        delay={0.1}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-8"
            >
              <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                What is AI DJ Pro?
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
                A Professional DJ Software With Real AI Built In
              </h2>
              <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                AI DJ Pro is an advanced performance platform designed to assist DJs during live sets. It combines machine learning with professional mixing tools.
              </p>
              <ul className="space-y-4">
                {[
                  'Match BPM and key seamlessly',
                  'Generate intelligent transition suggestions',
                  'Analyze track energy levels',
                  'Control vocal prompts and live MC cues',
                  'Predict crowd energy flow',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              <p className="text-xl font-medium text-white/90 pt-4">
                It works with you, not instead of you.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            >
              <ImagePlaceholder
                src="/images/product-interface.jpg"
                aspectRatio="video"
                label="Product interface"
                gradient="glow"
                className="shadow-2xl shadow-black/50"
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Core Features */}
      <AnimatedSection
        className="py-32 px-6 md:px-12 border-t border-white/[0.06] bg-[#080808]"
        delay={0}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase mb-4">
              Core Features
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Intelligent Track Analysis',
                desc: 'Every track is analyzed for BPM, key, structure, and energy profile. AI DJ Pro suggests the best next track based on flow, not guesswork.',
                gradient: 'cool' as const,
                src: '/images/track-analysis.jpg',
              },
              {
                title: 'Real-Time Energy Mapping',
                desc: "Visualize your set's energy curve. Avoid flat moments. Build tension. Drop it perfectly.",
                gradient: 'warm' as const,
                src: '/images/energy-mapping.jpg',
              },
              {
                title: 'AI MC Voice Engine',
                desc: 'Customizable AI voice prompts for announcements, event branding, corporate intros, hype moments. Professional delivery without hiring extra talent.',
                gradient: 'glow' as const,
                src: '/images/ai-mc-voice.jpg',
              },
              {
                title: 'Smart Auto-Ducking',
                desc: 'When you speak, the music intelligently lowers. No messy volume juggling. Clean transitions every time.',
                gradient: 'default' as const,
                src: '/images/auto-ducking.jpg',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]">
                  <div className="aspect-[16/10]">
                    <ImagePlaceholder src={feature.src} gradient={feature.gradient} />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 hover:border-white/20">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto md:min-h-[280px]">
                    <ImagePlaceholder src="/images/library-integration.jpg" gradient="default" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold mb-4">
                      YouTube & Library Integration
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Pull in tracks, manage your library, and expand your selection instantly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Why DJs Are Switching */}
      <AnimatedSection
        className="py-32 px-6 md:px-12 border-t border-white/[0.06] bg-[#050505]"
        delay={0}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <ImagePlaceholder
                src="/images/dj-action.jpg"
                aspectRatio="square"
                gradient="warm"
                label="DJ in action"
                className="min-h-[400px]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-8"
            >
              <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase">
                Why DJs Are Switching
              </p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
                Stop Guessing. Start Controlling the Room.
              </h2>
              <p className="text-lg text-white/60">
                Most DJ software stops at mixing. AI DJ Pro helps you control the experience.
              </p>
              <ul className="space-y-3">
                {[
                  'Better transitions',
                  'Smarter song selection',
                  'Cleaner announcements',
                  'Higher energy retention',
                  'Stronger crowd response',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-white/80 text-lg"
                  >
                    <span className="text-white/50">→</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <p className="text-xl font-medium pt-4">
                This isn&apos;t automation.
                <br />
                <span className="text-white/70">It&apos;s performance amplification.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Use Cases */}
      <AnimatedSection
        className="py-32 px-6 md:px-12 border-t border-white/[0.06] bg-[#080808]"
        delay={0}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase mb-4">
              Use Cases
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Clubs & Lounges',
                desc: 'Maintain peak energy all night without overplaying your hits too early.',
                src: '/images/clubs.jpg',
              },
              {
                title: 'Weddings & Private Events',
                desc: 'Use AI MC support for smooth introductions, cake cutting, speeches, and transitions.',
                src: '/images/weddings.jpg',
              },
              {
                title: 'Corporate Events',
                desc: 'Branded AI voice intros, sponsor shoutouts, and structured event flow.',
                src: '/images/corporate.jpg',
              },
              {
                title: 'Livestream DJs',
                desc: 'Engage your audience with structured energy pacing and intelligent mixing support.',
                src: '/images/livestream.jpg',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group cursor-default"
              >
                <div className="h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]">
                  <div className="aspect-video mb-6 rounded-2xl overflow-hidden">
                    <ImagePlaceholder
                      src={item.src}
                      gradient={i % 2 === 0 ? 'cool' : 'warm'}
                      label={item.title}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection
        className="py-32 px-6 md:px-12 border-t border-white/[0.06] bg-[#050505]"
        delay={0}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase mb-4">
              How It Works
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                'Import your music library',
                'Let AI DJ Pro analyze tracks',
                'Build your set or mix live',
                'Get real-time transition suggestions',
                'Control the crowd with confidence',
              ].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-lg text-white/80">{step}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <ImagePlaceholder
                src="/images/workflow.jpg"
                aspectRatio="square"
                gradient="glow"
                label="Workflow"
              />
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center text-xl font-medium"
          >
            Simple setup. Powerful results.
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Built for Performance */}
      <AnimatedSection
        className="py-32 px-6 md:px-12 border-t border-white/[0.06] bg-[#080808]"
        delay={0}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase mb-6">
              Built for Performance
            </p>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
              Designed with a clean, professional interface. Dark performance mode. Low-latency audio engine. Stable under pressure.
            </p>
            <p className="text-lg font-medium">
              Because when you&apos;re live, nothing can freeze.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ImagePlaceholder
              src="/images/performance-interface.jpg"
              aspectRatio="wide"
              gradient="default"
              label="Performance interface"
              className="max-w-5xl mx-auto"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Pricing */}
      <AnimatedSection
        className="py-32 px-6 md:px-12 border-t border-white/[0.06] bg-[#050505]"
        delay={0}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase mb-4">
              Pricing
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Starter',
                desc: 'Perfect for new DJs. Core AI analysis + mixing tools.',
                featured: false,
                src: '/images/pricing-starter.jpg',
              },
              {
                title: 'Pro',
                desc: 'Full performance suite. AI MC voice + auto ducking + energy mapping.',
                featured: true,
                src: '/images/pricing-pro.jpg',
              },
              {
                title: 'Elite',
                desc: 'Advanced customization. Branded voice packs + priority support + event templates.',
                featured: false,
                src: '/images/pricing-elite.jpg',
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-3xl border p-8 transition-all duration-500 hover:border-white/20 ${
                  plan.featured
                    ? 'border-white/30 bg-white/[0.06] ring-1 ring-white/20'
                    : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-white/10 rounded-bl-xl text-xs font-medium">
                    Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-3">{plan.title}</h3>
                <p className="text-white/60 mb-8">{plan.desc}</p>
                <div className="h-24 rounded-2xl overflow-hidden mb-6">
                  <ImagePlaceholder src={plan.src} gradient="default" aspectRatio="wide" />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button className="px-8 py-4 rounded-full border border-white/30 font-medium hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
              Compare Plans
            </button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Social Proof */}
      <AnimatedSection
        className="py-32 px-6 md:px-12 border-t border-white/[0.06] bg-[#080808]"
        delay={0}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-white/40 uppercase mb-4">
              Social Proof
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">
              Trusted by DJs Who Perform for Real Audiences
            </h2>
            <p className="text-white/50 mb-10">Add testimonials here:</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {['Club DJs', 'Corporate event planners', 'Wedding professionals', 'Touring artists'].map(
              (tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium hover:border-white/20 hover:text-white/80 transition-colors cursor-default"
                >
                  {tag}
                </motion.span>
              )
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              '/images/testimonial-1.jpg',
              '/images/testimonial-2.jpg',
              '/images/testimonial-3.jpg',
              '/images/testimonial-4.jpg',
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
              >
                <ImagePlaceholder src={src} gradient="default" aspectRatio="square" />
              </div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection
        className="py-40 px-6 md:px-12 border-t border-white/[0.06] bg-[#050505]"
        delay={0}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
            Ready to DJ Smarter?
          </h2>
          <p className="text-xl text-white/60">
            AI DJ Pro is not about replacing skill.
            <br />
            It enhances it.
          </p>
          <p className="text-xl font-medium">
            Take control of your sound.
            <br />
            Own the room.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-white text-black font-semibold rounded-full text-lg hover:bg-gray-200 transition-colors"
            >
              Download Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 border border-white/50 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Book a Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatedSection>

      {/* Footer - 4 columns */}
      <footer className="py-20 px-6 md:px-12 border-t border-white/[0.06] bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-white/60 uppercase mb-4">
                About AI DJ Pro
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-white/60 uppercase mb-4">
                Support
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">System Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-white/60 uppercase mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wider text-white/60 uppercase mb-4">
                Follow Us
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Twitter / X</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">YouTube</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-light text-white/40">AI DJ PRO</h3>
            <p className="text-sm text-white/30">© 2024. All systems operational.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
