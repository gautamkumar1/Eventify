
import { Link } from "react-router-dom"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import EventImage from "../assets/EventWebsiteImage.png"
import MyImage from "../assets/My pic.jpg"
import Hinata from "../assets/Hinata.jpg"
import Itachi from "../assets/Itachi.jpg"
export default function About() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Elevate Your Events with Our Expertise
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    At our event booking website, we're passionate about creating unforgettable experiences. Our team of
                                    seasoned professionals is dedicated to helping you plan and execute events that exceed your
                                    expectations.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link
                                    to="/events"
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    Explore Our Events
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    prefetch={false}
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                        <img
                            src={EventImage}
                            alt="Hero"
                            className="mx-auto w-300 h-300 overflow-hidden rounded-xl object-cover"
                        />


                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Dedicated Team</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Our team of event planning experts is committed to delivering exceptional service and creating
                                unforgettable experiences for our clients.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <Avatar className="w-24 h-24 border">
                                <AvatarImage src={MyImage} alt="Gautam Kumar" />
                                <AvatarFallback>GK</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1 text-center">
                                <h3 className="text-xl font-bold">Gautam Kumar</h3>
                                <p className="text-muted-foreground">Event Planner</p>
                                <p className="text-sm text-muted-foreground">
                                    Gautam has over 10 years of experience in the event planning industry, specializing in corporate events
                                    and weddings.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <Avatar className="w-24 h-24 border">
                                <AvatarImage src={Hinata} alt="Hinata Hyuga" />
                                <AvatarFallback>HH</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1 text-center">
                                <h3 className="text-xl font-bold">Hinata Hyuga</h3>
                                <p className="text-muted-foreground">Venue Coordinator</p>
                                <p className="text-sm text-muted-foreground">
                                Hinata has a keen eye for detail and a passion for finding the perfect venue to match our clients'
                                    needs.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <Avatar className="w-24 h-24 border">
                                <AvatarImage src={Itachi} alt="Itachi Uchiha" />
                                <AvatarFallback>IH</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1 text-center">
                                <h3 className="text-xl font-bold">Itachi Uchiha</h3>
                                <p className="text-muted-foreground">Catering Specialist</p>
                                <p className="text-sm text-muted-foreground">
                                Itachi expertise in curating delicious and visually stunning menus has made her an invaluable member
                                    of our team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Mission and Values</h2>
                            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                At our event booking website, we're driven by a passion for creating unforgettable experiences and a
                                commitment to excellence in everything we do.
                            </p>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <AwardIcon className="w-12 h-12 text-primary" />
                                <div className="grid gap-1 text-center">
                                    <h3 className="text-xl font-bold">Exceptional Service</h3>
                                    <p className="text-sm text-muted-foreground">
                                        We are dedicated to providing our clients with the highest level of service, ensuring their event
                                        planning experience is seamless and stress-free.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <CreativeCommonsIcon className="w-12 h-12 text-primary" />
                                <div className="grid gap-1 text-center">
                                    <h3 className="text-xl font-bold">Innovative Thinking</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Our team is constantly exploring new ideas and trends to bring a fresh and unique approach to every
                                        event we plan.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <InfinityIcon className="w-12 h-12 text-primary" />
                                <div className="grid gap-1 text-center">
                                    <h3 className="text-xl font-bold">Integrity</h3>
                                    <p className="text-sm text-muted-foreground">
                                        We are committed to upholding the highest ethical standards and building long-term, trusted
                                        relationships with our clients.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

function AwardIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
            <circle cx="12" cy="8" r="6" />
        </svg>
    )
}


function CreativeCommonsIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" />
            <path d="M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" />
        </svg>
    )
}


function InfinityIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
        </svg>
    )
}