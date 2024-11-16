import React from "react";
import { Film, Heart, Users, Code, Github, Twitter } from "lucide-react";
import rushi from "../../assets/Group-member/Rushi.jpeg";
import darshak from "../../assets/Group-member/Darshak.jpeg";
import jyot from "../../assets/Group-member/Jyot.jpeg";
import ragan from "../../assets/Group-member/ragan.webp";
import nitin from "../../assets/Group-member/Nitin.jpg";
import rishi from "../../assets/Group-member/Rishi.jpg";
import kishan from "../../assets/Group-member/Kishan.jpg";
import sahil from "../../assets/Group-member/Sahil.jpeg";
import sarjil from "../../assets/Group-member/Sarjil.jpeg";
import girish from "../../assets/Group-member/Girish.jpeg";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            About Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're passionate about bringing you the best entertainment
            experience right at your fingertips. Our goal is to provide you with
            a platform that offers a vast collection of movies, TV shows, and
            documentaries.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Film className="w-8 h-8 text-purple-400" />}
            title="Vast Library"
            description="Access to millions of movies and TV shows, complete with detailed information and ratings"
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8 text-pink-400" />}
            title="Personalized"
            description="Stream and enjoy movies from your favorite platforms, tailored to your preferences and viewing habits"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-blue-400" />}
            title="Community"
            description="Join discussions, share reviews, and connect with other movie enthusiasts"
          />
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember image={darshak} name="Darshak Kukadiya" />
            <TeamMember
              image={kishan}
              name="Kishan patel"
              // role="Lead Developer"
            />
            <TeamMember image={nitin} name="Nitin Kanzariya" />
            <TeamMember
              image={rushi}
              name="Rushi Makadiya"
              // role="Head of Content"
            />
            <TeamMember image={jyot} name="Jyot Vasava" />
            <TeamMember image={rishi} name="Rishi Godhasara" />
            <TeamMember image={ragan} name="Ragan patel" />
            <TeamMember image={sarjil} name="Sarjil Chauhan" />
            <TeamMember image={sahil} name="Sahil Pandavadara" />
          </div>
            <div className="flex justify-center mt-10">
              <TeamMember image={girish} name="Girish Reddy" />
            </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built With Modern Tech
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <TechItem icon={<Code className="w-6 h-6" />} name="React" />
            <TechItem icon={<Code className="w-6 h-6" />} name="JavaScript" />
            <TechItem icon={<Code className="w-6 h-6" />} name="Tailwind CSS" />
            <TechItem icon={<Code className="w-6 h-6" />} name="Node.js" />
            <TechItem icon={<Code className="w-6 h-6" />} name="Mongo DB" />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400">
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          <p>© All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function TeamMember({ image, name, role }) {
  return (
    <div className="text-center">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-500"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-400">{role}</p>
    </div>
  );
}

function TechItem({ icon, name }) {
  return (
    <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
      {icon}
      <span>{name}</span>
    </div>
  );
}

export default About;
