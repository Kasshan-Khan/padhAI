import React from 'react'
import gajendra from './assets/teachers/gajendra.webp'
import shraddha from './assets/teachers/shraddha.webp'
import varun from './assets/teachers/varun.webp'
import chaiorcode from './assets/teachers/chaiorcode.jpg'
import lovebabbar from './assets/teachers/lovebabbar.webp'
import pradeepgiri from './assets/teachers/pradeepgiri.jpeg'
import striver from './assets/teachers/striver.jpg'
import bharatacharya from './assets/teachers/bharatacharya.jpeg'

const teachersData = [
  { name: "Gajendra Purohit", image: gajendra, url: "https://www.youtube.com/@gajendrapurohit", tag: "Maths" },
  { name: "Pradeep Giri", image: pradeepgiri, url: "https://www.youtube.com/@pradeepgiriacademy", tag: "Engineering" },
  { name: "Chai aur Code", image: chaiorcode, url: "https://www.youtube.com/@chaiaurcode", tag: "Web Dev" },
  { name: "Love Babbar", image: lovebabbar, url: "https://www.youtube.com/@codehelp", tag: "DSA & CP" },
  { name: "Shraddha Khapra", image: shraddha, url: "https://www.youtube.com/@ApnaCollegeOfficial", tag: "DSA" },
  { name: "Gate Smashers", image: varun, url: "https://www.youtube.com/@gatesmashers", tag: "CS Core" },
  { name: "Striver", image: striver, url: "https://www.youtube.com/@striver", tag: "DSA" },
  { name: "Bharat Acharya", image: bharatacharya, url: "https://www.youtube.com/@bharatacharya", tag: "Hardware" }
];

const Teachers = () => {
  return (
    <div className="w-full animate-fade-in-up animation-delay-400">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
        {teachersData.map((teacher, index) => (
          <a 
            key={index} 
            href={teacher.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="card bg-base-100/50 backdrop-blur-xl border border-base-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(16,97,45,0.2)] hover:-translate-y-2 hover:border-primary/50 relative rounded-3xl">
              
              {/* Image Container with Cinematic Overlay */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-black">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
                
                {/* Content over image */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="badge badge-primary badge-outline border-primary/50 text-white backdrop-blur-sm bg-black/20 mb-3">{teacher.tag}</div>
                  <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{teacher.name}</h3>
                  <div className="flex items-center gap-2 text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Visit Channel <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
              
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Teachers