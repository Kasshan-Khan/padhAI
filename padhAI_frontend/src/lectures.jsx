import React from 'react'

const lecturesData = [
  {
    title: "Engineering Mathematics",
    author: "Gajendra Purohit",
    link: "https://www.youtube.com/embed/videoseries?si=cq-Bz3qVFfMTKnUP&list=PLU6SqdYcYsfLPxjd-k-MaoG7qgRQ-2fKc",
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "Differential Calculus",
    author: "Pradeep Giri",
    link: "https://www.youtube.com/embed/videoseries?si=C2C0OmyRyk5fltGr&list=PLT3bOBUU3L9iw3yQWge_IjhXZlDgRGwyq",
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    title: "JavaScript Mastery",
    author: "Chai aur Code",
    link: "https://www.youtube.com/embed/videoseries?si=zDbwK9tsVSusdMM-&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37",
    color: "from-yellow-500/20 to-yellow-600/20"
  },
  {
    title: "Placement DSA Course",
    author: "Love Babbar",
    link: "https://www.youtube.com/embed/videoseries?si=IJZrOddVblCMfcxQ&list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA",
    color: "from-orange-500/20 to-orange-600/20"
  },
  {
    title: "Data Structures & Algo",
    author: "Apna College",
    link: "https://www.youtube.com/embed/videoseries?si=zb2QLGtDfd69LESa&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt",
    color: "from-green-500/20 to-green-600/20"
  },
  {
    title: "DBMS Course",
    author: "Gate Smashers",
    link: "https://www.youtube.com/embed/videoseries?si=-848xsEsAzegzKeh&list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y",
    color: "from-teal-500/20 to-teal-600/20"
  },
  {
    title: "A2Z DSA Sheet",
    author: "Striver",
    link: "https://www.youtube.com/embed/videoseries?si=RnbARiQ1vuERrs5Z&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
    color: "from-red-500/20 to-red-600/20"
  },
  {
    title: "Microprocessors",
    author: "Bharat Acharya",
    link: "https://www.youtube.com/embed/videoseries?si=Zu6u2FOEnL3pZD84&list=PLfzBO7vcQZ1IMDUDXph5wB9csF-yYD4GC",
    color: "from-indigo-500/20 to-indigo-600/20"
  }
];

const Lectures = () => {
  return (
    <div className="w-full animate-fade-in-up animation-delay-400">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-12">
        {lecturesData.map((lecture, index) => (
          <div 
            key={index} 
            className="card bg-base-100/50 backdrop-blur-xl border border-base-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(16,97,45,0.15)] hover:-translate-y-2 hover:border-primary/40 transition-all duration-300 overflow-hidden group relative"
          >
            {/* Glowing background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${lecture.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
            
            <div className="w-full aspect-video bg-black relative">
              <iframe 
                width="100%" 
                height="100%" 
                src={lecture.link} 
                title={lecture.title} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="absolute inset-0 border-none"
              ></iframe>
            </div>
            
            <div className="card-body p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-base-content mb-1 group-hover:text-primary transition-colors">{lecture.title}</h3>
                  <p className="text-sm font-medium text-base-content/60">{lecture.author}</p>
                </div>
                <div className="badge badge-primary badge-outline shrink-0 mt-1">Free</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Lectures