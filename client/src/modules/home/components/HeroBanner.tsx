// src/modules/home/components/HeroBanner.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Simple banner data
const banners = [
 {
   id: '1',
   title: 'Summer Collection',
   desc: 'Up to 70% off',
   btn: 'Shop Now',
   link: '/products?category=summer',
   img: 'https://i.fbcd.co/products/original/cover-image-5ab7dfe09c8f35b3a3f31172bea3de8b10867d445e1a8ede691a7bd4c6ab779d.jpg'
 },
 {
   id: '2',
   title: 'New Arrivals',
   desc: 'Latest products for you',
   btn: 'Discover',
   link: '/products?sort=createdAt',
   img: 'https://www.standardbank.com/static_file/SBG/Assets/Img/TBC%20Personal/SB-523786427-PanoramicS.jpg'
 },
 {
   id: '3',
   title: 'Flash Sale',
   desc: 'Limited time offers',
   btn: 'View Deals',
   link: '/products?discount=true',
   img: 'https://image.cnbcfm.com/api/v1/image/106271354-1575047415346rtx7b0z2.jpg'
 }
];

export function HeroBanner() {
 const [index, setIndex] = useState(0);
 
 // Auto-slide timer
 useEffect(() => {
   const timer = setInterval(() => {
     setIndex((i) => (i + 1) % banners.length);
   }, 5000);
   return () => clearInterval(timer);
 }, []);
 
 const current = banners[index];
 
 return (
   <div className="relative h-[350px] md:h-[450px] rounded-lg my-4 overflow-hidden">
     {/* Banner image and content */}
     <img 
       src={current.img} 
       alt={current.title} 
       className="w-full h-full object-cover object-center" 
     />
     <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 flex items-center">
       <div className="container px-6 text-white max-w-2xl">
         <h2 className="text-3xl md:text-5xl font-bold mb-3">{current.title}</h2>
         <p className="text-lg md:text-xl mb-6">{current.desc}</p>
         <Button asChild size="lg" className="px-8 py-3">
           <Link to={current.link}>{current.btn}</Link>
         </Button>
       </div>
     </div>
     
     {/* Controls */}
     <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
       <button 
         onClick={() => setIndex((i) => (i - 1 + banners.length) % banners.length)}
         className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
       >
         <ChevronLeft size={20} />
       </button>
       <button 
         onClick={() => setIndex((i) => (i + 1) % banners.length)}
         className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
       >
         <ChevronRight size={20} />
       </button>
     </div>
     
     {/* Dots */}
     <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
       {banners.map((_, i) => (
         <button
           key={i}
           onClick={() => setIndex(i)}
           className={`h-2 rounded-full transition-all ${index === i ? "w-8 bg-white" : "w-2 bg-white/60"}`}
         />
       ))}
     </div>
   </div>
 );
}