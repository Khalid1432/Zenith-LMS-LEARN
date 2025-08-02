import { GraduationCap } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
                    {/* Logo and Tagline */}
                    <div>
                        <Link to="/home" className="flex items-center text-2xl font-bold text-white hover:text-blue-600 transition-colors">
                            <GraduationCap className="h-8 w-8 mr-2 text-blue-600" />
                            <span className="font-extrabold text-lg md:text-2xl tracking-tight uppercase">
                                Zenith <span className="text-blue-600">LMS</span> LEARN
                            </span>
                        </Link>
                        <p className="mt-3 text-gray-400 text-sm">
                            Empowering learners with high-quality, accessible education anytime, anywhere.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quick Links</h3>
                        <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                            <li><a href="/courses" className="hover:text-indigo-400">Courses</a></li>
                            <li><a href="/courses" className="hover:text-indigo-400">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Instructors</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
                        <ul className="mt-4 space-y-2 text-gray-300 text-sm">
                            <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-400">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Stay Updated</h3>
                        <p className="mt-4 text-gray-400 text-sm">Subscribe to our newsletter for updates and offers.</p>
                        <form className="mt-4 flex">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full px-3 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-sm text-white focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md text-sm, font-mono"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ZENITH LMS LEARN. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:text-indigo-400">Facebook</a>
                        <a href="#" className="hover:text-indigo-400">Twitter</a>
                        <a href="#" className="hover:text-indigo-400">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
