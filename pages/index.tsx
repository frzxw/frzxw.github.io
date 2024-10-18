import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa'

function FluidGradientBackground() {
  useEffect(() => {
    const canvas = document.getElementById('gradient-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!

    let time = 0
    const color1 = { r: 10, g: 25, b: 50 }  // Dark Blue
    const color2 = { r: 60, g: 20, b: 80 }  // Dark Purple

    function animate() {
      time += 0.002
      const { width, height } = canvas

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      const color = {
        r: Math.sin(time) * (color2.r - color1.r) / 2 + (color2.r + color1.r) / 2,
        g: Math.sin(time) * (color2.g - color1.g) / 2 + (color2.g + color1.g) / 2,
        b: Math.sin(time) * (color2.b - color1.b) / 2 + (color2.b + color1.b) / 2
      }

      gradient.addColorStop(0, `rgb(${color1.r}, ${color1.g}, ${color1.b})`)
      gradient.addColorStop(1, `rgb(${color.r}, ${color.g}, ${color.b})`)

      // Fill canvas
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      requestAnimationFrame(animate)
    }

    animate()

    // Resize canvas on window resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return <canvas id="gradient-canvas" className="fixed inset-0 z-0" />
}

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experiences', 'projects', 'certifications']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsModalOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Helmet>
        <title>Fariz Wibisono - Computer Science Undergraduate</title>
        <meta name="description" content="Fariz Wibisono's portfolio showcasing full-stack development, data science, AI, and machine learning projects and experiences." />
      </Helmet>
      <div className="relative min-h-screen font-body text-white">
        <FluidGradientBackground />

        <header className="fixed top-0 left-0 right-0 z-50 bg-opacity-20 backdrop-blur-md">
          <nav className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
            <div
              className="text-lg sm:text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-text cursor-pointer"
              onClick={() => window.location.reload()}
            >
              frzxw
            </div>
            <ul className="hidden sm:flex flex-wrap space-x-4 sm:space-x-8">
              {['About', 'Experiences', 'Projects', 'Certifications'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors duration-300 ${activeSection === item.toLowerCase()
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-white hover:text-blue-300'}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden sm:flex space-x-4 mt-4 sm:mt-0">
              <a href="https://github.com/frzxw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/frzxw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300">
                <FaLinkedin size={18} />
              </a>
            </div>
            <div className="sm:hidden">
              {isModalOpen ? (
                <FaTimes size={24} className="text-white cursor-pointer" onClick={() => setIsModalOpen(false)} />
              ) : (
                <FaBars size={24} className="text-white cursor-pointer" onClick={() => setIsModalOpen(true)} />
              )}
            </div>
          </nav>
        </header>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '100vh' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50 flex flex-col items-center justify-center"
            >
              <ul className="flex flex-col space-y-8 text-center mt-16">
                {['About', 'Experiences', 'Projects', 'Certifications'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className={`text-lg font-medium transition-colors duration-300 ${activeSection === item.toLowerCase()
                        ? 'text-blue-400'
                        : 'text-white hover:text-blue-300'}`}
                      onClick={() => setIsModalOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="relative z-10">
          <section id="about" className="min-h-screen flex items-center justify-center p-8">
            <FadeInSection>
              <div className="text-center max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-text">
                  Fariz Wibisono
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl mb-6 font-display">Universitas Pendidikan Indonesia</h2>
                <p className="text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
                  Passionate about integrating full-stack development with data science, artificial intelligence, and machine learning.
                  I aim to design and implement advanced applications that address complex challenges and contribute to technological advancements.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="#projects" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105 text-sm">
                    View Projects
                  </a>
                  <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105 text-sm">
                    Download CV
                  </a>
                </div>
              </div>
            </FadeInSection>
          </section>

          <section id="experiences" className="min-h-screen p-8 bg-opacity-20 backdrop-blur-md scroll-mt-16">
            <div className="container mx-auto">
              <FadeInSection>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-text">Experiences</h2>
                <div className="space-y-8">
                  <div className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm transition duration-300 hover:bg-opacity-10 hover:shadow-lg transform hover:-translate-y-1">
                    <h3 className="text-md sm:text-lg md:text-xl font-display font-semibold text-blue-400 mb-2">Website Division Staff</h3>
                    <p className="text-gray-300 mb-2 text-sm sm:text-base">DINAMIK 19</p>
                    <ul className="list-disc list-inside text-gray-200 text-sm sm:text-base space-y-1">
                      <li>Developed a landing page using Laravel and Tailwind CSS, ensuring clean and maintainable code.</li>
                      <li>Applied responsive design principles to create a user-friendly experience across various devices.</li>
                      <li>Collaborated with team members and the design division to align development with project requirements.</li>
                    </ul>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </section>

          <section id="projects" className="min-h-screen p-8 bg-opacity-20 backdrop-blur-md scroll-mt-16">
            <div className="container mx-auto">
            <FadeInSection>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-text">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm transition duration-300 hover:bg-opacity-10 hover:shadow-lg transform hover:-translate-y-1">
                  <h3 className="text-md sm:text-lg md:text-xl font-display font-semibold text-blue-400 mb-2">Lorem Ipsum Dolor Sit Amet</h3>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <a href="#" className="text-blue-300 hover:text-blue-100 transition duration-300 text-sm sm:text-base">View Project →</a>
                </div>
                <div className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm transition duration-300 hover:bg-opacity-10 hover:shadow-lg transform hover:-translate-y-1">
                  <h3 className="text-md sm:text-lg md:text-xl font-display font-semibold text-blue-400 mb-2">Lorem Ipsum Dolor Sit Amet</h3>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <a href="#" className="text-blue-300 hover:text-blue-100 transition duration-300 text-sm sm:text-base">View Project →</a>
                </div>
              </div>
            </FadeInSection>
            </div>
          </section>

          <section id="certifications" className="min-h-screen p-8 bg-opacity-20 backdrop-blur-md scroll-mt-16">
            <div className="container mx-auto">
            <FadeInSection>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-text">Certifications</h2>
              <div className="space-y-8">
                <div className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm transition duration-300 hover:bg-opacity-10 hover:shadow-lg transform hover:-translate-y-1">
                  <h3 className="text-md sm:text-lg md:text-xl font-display font-semibold text-blue-400 mb-2">Lorem Ipsum Dolor Sit Amet</h3>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">Lorem Ipsum | Lorem University</p>
                  <a href="#" className="text-blue-300 hover:text-blue-100 transition duration-300 text-sm sm:text-base">View Certificate →</a>
                </div>
                <div className="bg-white bg-opacity-5 rounded-lg p-6 backdrop-blur-sm transition duration-300 hover:bg-opacity-10 hover:shadow-lg transform hover:-translate-y-1">
                  <h3 className="text-md sm:text-lg md:text-xl font-display font-semibold text-blue-400 mb-2">Lorem Ipsum Dolor Sit Amet</h3>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">Lorem Ipsum</p>
                  <a href="#" className="text-blue-300 hover:text-blue-100 transition duration-300 text-sm sm:text-base">View Certificate →</a>
                </div>
              </div>
            </FadeInSection>
            </div>
          </section>

          <footer className="relative z-10 bg-opacity-20 backdrop-blur-md py-4 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="container mx-auto text-center text-xs sm:text-sm text-white flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div>© {new Date().getFullYear()} Fariz Wibisono. All rights reserved.</div>
              <div className="flex space-x-4 sm:hidden">
                <a href="https://github.com/frzxw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300">
                  <FaGithub size={18} />
                </a>
                <a href="https://linkedin.com/in/frzxw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition duration-300">
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}