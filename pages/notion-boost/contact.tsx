import Header from '../../components/Header';
import { Container, LayoutType } from '../../components/layout';
import { Links, Navbar } from '../../components/navbar';

function Contact() {
    return (
        <>
            <Header
                type="article"
                title="Gourav Goyal - Contact Us"
            />

            <Container layout={LayoutType.Blog}>
                <Navbar link={Links.Blog} />
                <main className="prose">
                    <header>
                        <h1>Contact Us</h1>
                        <p className="text-gray-600">
                            We appreciate your interest in our services and look forward to hearing from you. Your
                            feedback helps us improve our offerings and provide better support.
                        </p>
                    </header>

                    <section className="my-8">
                        <h2>Get in Touch</h2>
                        <p>
                            If you have any questions, concerns, or feedback about our services, please don't hesitate
                            to contact us using the information below.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>Contact Information</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">Email</h3>
                                <p className="select-none">
                                    hey<span> [at] </span>gourav<span>.</span>io
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">Phone</h3>
                                <p className="select-none">+91 8800261705</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">Address</h3>
                                <p>
                                    Plot 11, Sector 33
                                    <br />
                                    Gurugram, Haryana
                                    <br />
                                    122001
                                    <br />
                                    India
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </Container>
        </>
    );
}

export default Contact;
