import { Link } from "@inertiajs/react";
import { Server } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="w-full h-16 border-b bg-white ">
      <div className="container mx-auto flex h-full items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Server className="h-6 w-6" />
          <span className="font-bold">JCC Framework</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            href="https://www.jcc-express.uk"
            className="text-sm font-medium hover:underline underline-offset-4"
            target="_blank"
          >
            Docs
          </a>
          <Link
            href="login"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
