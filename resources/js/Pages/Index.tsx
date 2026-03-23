import React from "react";
import { Link, Head } from "@inertiajs/react";
import { ArrowRight, Code, Database, Lock, Server } from "lucide-react";

import { Button } from "@/Components/ui/button";
import Header from "@/Components/Header";
const Home = () => {
  return (
    <>
      <Head title="Welcome" />
      <Header />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  JCC Framework Simplified
                </h1>
                <p className="mx-auto max-w-[700px]  text-muted-foreground md:text-xl">
                  A powerful, lightweight framework built on top of Express.js
                  for faster development and better performance.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/resume">
                  <Button size="lg">
                    Resume builder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.jcc-express.uk"
                >
                  <Button variant="outline" size="lg">
                    Documentation
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Key Features
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to build modern web applications
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Server className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Express Integration</h3>
                <p className="text-center text-muted-foreground">
                  Seamlessly built on top of Express.js with enhanced features
                  and simplified APIs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Lock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Authentication</h3>
                <p className="text-center text-muted-foreground">
                  Built-in authentication system with secure user management.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Database className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Database Abstraction</h3>
                <p className="text-center text-muted-foreground">
                  Simple database integration with ORM-like features.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Code className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Middleware System</h3>
                <p className="text-center text-muted-foreground">
                  Enhanced middleware system for better request handling.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <svg
                  className="h-12 w-12 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                <h3 className="text-xl font-bold">Performance Optimized</h3>
                <p className="text-center text-muted-foreground">
                  Optimized for high performance and low latency applications.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <svg
                  className="h-12 w-12 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
                <h3 className="text-xl font-bold">Security First</h3>
                <p className="text-center text-muted-foreground">
                  Built with security best practices to protect your
                  applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of developers building with our framework.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button size="lg">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-6 bg-background border-t">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex items-center space-x-2">
                <Server className="h-6 w-6" />
                <span className="text-lg font-bold">JCC Framework</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} JCC Framework. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
