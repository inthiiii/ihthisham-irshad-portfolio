import Portfolio from "@/components/Portfolio";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "M. Ihthisham Irshad",
    jobTitle: "AI / Machine Learning Developer",
    url: "https://ihthishamirshad.vercel.app",
    email: "mailto:ihthishamirshad781@gmail.com",
    sameAs: ["https://github.com/inthiiii", "https://www.linkedin.com/in/ihthisham-irshad-296157234/"],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Sri Lanka Institute of Information Technology" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Portfolio />
    </>
  );
}
