/**
 * src/pages/Landing.tsx
 * Modern, mobile-first landing page.
 * - TailwindCSS for styling
 * - Framer Motion for animations
 * - ShadCN/UI for polished buttons & cards
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing(): JSX.Element {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 text-center bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-6"
        >
          <h1 className="text-5xl font-extrabold mb-6">SmartEd Africa</h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
            AI-powered, offline-first learning for students and teachers across Africa.
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <Link to="/signup" aria-label="Create free account">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-gray-100 font-semibold rounded-xl"
              >
                Get Started — Free
              </Button>
            </Link>
            <Link to="/login" aria-label="Login to SmartEd Africa">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-700 rounded-xl"
              >
                Log in
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              id: "feature-1",
              title: "Localized Content",
              desc: "Deliver lessons in Hausa, Kanuri, and English — designed for low-connectivity contexts.",
            },
            {
              id: "feature-2",
              title: "AI Tutor",
              desc: "Personalized WAEC/JAMB prep with instant feedback and adaptive quizzes.",
            },
            {
              id: "feature-3",
              title: "Teacher Tools",
              desc: "Microlearning modules, offline packages, and class analytics for teachers.",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                aria-labelledby={feature.id}
                className="h-full rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <CardContent className="p-6">
                  <h3 id={feature.id} className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-700 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform learning?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join students, teachers, and partners building resilient education systems across Africa.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-gray-100 font-semibold rounded-xl"
            >
              Create Free Account
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
