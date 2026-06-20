import React, { useState, useEffect } from 'react'
import gajendra from './assets/teachers/gajendra.webp'
import shraddha from './assets/teachers/shraddha.webp'
import varun from './assets/teachers/varun.webp'
import chaiorcode from './assets/teachers/chaiorcode.jpg'
import lovebabbar from './assets/teachers/lovebabbar.webp'
import pradeepgiri from './assets/teachers/pradeepgiri.jpeg'
import striver from './assets/teachers/striver.jpg'
import bharatacharya from './assets/teachers/bharatacharya.jpeg'

const domainTeachers = {
  ENGINEERING: [
    { name: "Gajendra Purohit", image: gajendra, url: "https://www.youtube.com/@gajendrapurohit", tag: "Maths" },
    { name: "Pradeep Giri", image: pradeepgiri, url: "https://www.youtube.com/@pradeepgiriacademy", tag: "Engineering" },
    { name: "Chai aur Code", image: chaiorcode, url: "https://www.youtube.com/@chaiaurcode", tag: "Web Dev" },
    { name: "Love Babbar", image: lovebabbar, url: "https://www.youtube.com/@codehelp", tag: "DSA & CP" },
    { name: "Shraddha Khapra", image: shraddha, url: "https://www.youtube.com/@ApnaCollegeOfficial", tag: "DSA" },
    { name: "Gate Smashers", image: varun, url: "https://www.youtube.com/@gatesmashers", tag: "CS Core" },
    { name: "Striver", image: striver, url: "https://www.youtube.com/@striver", tag: "DSA" },
    { name: "Bharat Acharya", image: bharatacharya, url: "https://www.youtube.com/@bharatacharya", tag: "Hardware" }
  ],
  JEE: [
    { name: "Alakh Pandey", image: "https://yt3.googleusercontent.com/0yuTL60JmgnwMzixAx9lhwLXlNKHjic3Q2bhiPuOj-b4qtUfoMbORdq0yKGEqix5Zo_DKXww=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@PhysicsWallah", tag: "Physics" },
    { name: "Pankaj Sijairya", image: "https://yt3.googleusercontent.com/kc_0Uk_Ef80Sx5kjX8LmopfA9udoAO5_np1xJg4kQyBH0QwofEhfsr-Y_nlDupkOGcDDSQjZ9A=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@PankajsirChemistry", tag: "Chemistry" },
    { name: "Neha Agrawal", image: "https://yt3.googleusercontent.com/ytc/AIdro_n-EgLbL4dig86w-ErI8afPtJaWAzp61FnehCuRgJBShYQ=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@nehaagrawal", tag: "Maths" },
    { name: "Mohit Goenka", image: "https://yt3.googleusercontent.com/ytc/AIdro_n7jPLWvflSqn4AipOFDEsvfRZ2p6rdavfbd4UCfhQyhw=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@Eduniti", tag: "Physics" },
    { name: "Aman Dhattarwal", image: "https://yt3.googleusercontent.com/Pu4tOoOIwq-MSZ1J1-GQuWbEaDppYESaE9uIMTaTXybQD8xFyRmCawPucKeOVuE4iN385CYn5g=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@AmanDhattarwal", tag: "Guidance" },
    { name: "Nitin Vijay", image: "https://ui-avatars.com/api/?name=Nitin+Vijay&background=random&size=512", url: "https://www.youtube.com/@MotionNitinVijay", tag: "Physics" }
  ],
  NEET: [
    { name: "Garima Goel", image: "https://yt3.googleusercontent.com/NZqIuP5HhkB_8MGgJkNowspCty9RE7utquNwTgnILR1A_lEOt8cjAFnOcpGwUZeSAqblAIiEsQ=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@GarimaGoelBiology", tag: "Biology" },
    { name: "Seep Pahuja", image: "https://yt3.googleusercontent.com/oX2tIo8IiC5sRNZR63AtbMLx5NWh_zSZY10GntbL2vz1JgsuEhPfN5FwooHZ34pl3CG85CmL5gg=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@SeepPahuja", tag: "Biology" },
    { name: "Gaurav Gupta", image: "https://yt3.googleusercontent.com/cdFUNwjl4ChzGy3qklr1gtrmGXqcIz6LsJXFkJnQLoZ4QXTEBXFFhQEF-tIVnonc5hDnf1K0jQ=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@GauravGuptaPhysics", tag: "Physics" },
    { name: "VT Sir", image: "https://yt3.googleusercontent.com/pE0JAyucsKBzzdhyhfzu0_KHEKhuQai82M3t0V-D3ZEyCxOFIGUB2DKqC7XeX_wnrvGki8gSkn0=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@VTSir", tag: "Chemistry" },
    { name: "Dr. Najeeb", image: "https://ui-avatars.com/api/?name=Dr+Najeeb&background=random&size=512", url: "https://www.youtube.com/@DrNajeeb", tag: "Medical" },
    { name: "Tarun Sir", image: "https://yt3.googleusercontent.com/uIE1Dr_VwN6wyGHYqI54Kkl1UsjHGF2Kts9FxTJS9O4es9QcY1VK6UbI_1gOtLn1POhAZ5SnLQ=s900-c-k-c0x00ffffff-no-rj", url: "https://www.youtube.com/@TarunSirBiology", tag: "Biology" }
  ]
};

const Teachers = () => {
  const [teachers, setTeachers] = useState(domainTeachers.ENGINEERING); // Default

  useEffect(() => {
    const userDomain = localStorage.getItem("userDomain");
    if (userDomain && domainTeachers[userDomain.toUpperCase()]) {
      setTeachers(domainTeachers[userDomain.toUpperCase()]);
    }
  }, []);

  return (
    <div className="w-full animate-fade-in-up animation-delay-400">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
        {teachers.map((teacher, index) => (
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