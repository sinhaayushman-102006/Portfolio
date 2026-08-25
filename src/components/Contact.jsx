import contactBgVideo from '../assets/contact_assets/contact_bg.mp4';

const ContactSection = () => {
    return (
        <div id="contact" className="relative min-h-[70vh] text-white font-sans flex items-center overflow-hidden [clip-path:inset(0)]">
            
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="fixed top-0 left-0 w-full h-[100vh] object-cover z-0"
            >
                <source src={contactBgVideo} type="video/mp4" />
            </video>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-12 flex flex-col lg:flex-row gap-20 lg:gap-32 relative z-10">
                
                {/* Left Side: Contact Info */}
                <div className="w-full lg:w-5/12 flex flex-col justify-start">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl mb-16">
                        Get in touch
                    </h2>

                    <div className="flex flex-col gap-10">
                        {/* Email */}
                        <div>
                            <p className="text-gray-400 text-sm mb-2">Email:</p>
                            <p className="text-xl tracking-wide">sinhaayushman09@gmail.com</p>
                        </div>

                        {/* Phone */}
                        <div>
                            <p className="text-gray-400 text-sm mb-2">Phone:</p>
                            <p className="text-xl tracking-wide">{import.meta.env.VITE_PHONE_NUMBER || "+91 9123306XXX"}</p>
                        </div>



                        {/* Follow Us */}
                        <div className="mt-4 flex flex-col items-center md:items-start">
                            <p className="text-gray-400 text-sm mb-4">Follow us</p>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <a href="https://www.linkedin.com/in/ayushmansinha10/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                                        <rect width="4" height="12" x="2" y="9"/>
                                        <circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </a>
                                <a href="https://github.com/sinhaayushman-102006" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="w-full lg:w-7/12 flex flex-col lg:pt-4">
                    <form className="flex flex-col gap-8 w-full" onSubmit={(e) => e.preventDefault()}>
                        
                        {/* Name and Email Row */}
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <div className="flex flex-col gap-3 w-full md:w-1/2">
                                <label className="text-sm text-gray-300 font-medium">Your Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Your full name" 
                                    className="w-full bg-[#111] text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 border border-transparent"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full md:w-1/2">
                                <label className="text-sm text-gray-300 font-medium">Email address</label>
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="w-full bg-[#111] text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 border border-transparent"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-sm text-gray-300 font-medium">Message</label>
                            <textarea 
                                placeholder="Write something...." 
                                rows="7"
                                className="w-full bg-[#111] text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 border border-transparent resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-white text-black font-semibold rounded-xl py-4 hover:bg-gray-200 transition-colors mt-2"
                        >
                            Send Message
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default ContactSection;
