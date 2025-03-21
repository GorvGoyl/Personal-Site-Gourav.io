import Header from '../../components/Header';
import { Container, LayoutType } from '../../components/layout';
import { Links, Navbar } from '../../components/navbar';

function Privacy(): JSX.Element {
    return (
        <>
            <Header
                type="article"
                title="Gourav Goyal - Privacy Policy"
            />

            <Container layout={LayoutType.Blog}>
                <Navbar link={Links.Blog} />
                <main className="prose">
                    <header>
                        <h1>Privacy Policy</h1>
                        <p className="text-gray-600">
                            Last Updated:{' '}
                            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>

                    <section className="my-8">
                        <h2>1. Introduction</h2>
                        <p>
                            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose,
                            and safeguard your information when you visit our website. Please read this privacy policy
                            carefully. By continuing to use this website, you consent to the practices described in this
                            policy.
                        </p>
                        <p>
                            We reserve the right to make changes to this Privacy Policy at any time and for any reason.
                            We will alert you about any changes by updating the "Last Updated" date of this Privacy
                            Policy. You are encouraged to periodically review this Privacy Policy to stay informed of
                            updates.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>2. Information We Collect</h2>
                        <p>
                            We may collect information about you in a variety of ways. The information we may collect
                            via the website includes:
                        </p>

                        <h3>Personal Data</h3>
                        <p>
                            Personally identifiable information, such as your name, email address, and other contact
                            details that you voluntarily give to us when you register with the website or when you
                            choose to participate in various activities related to the website. You are under no
                            obligation to provide us with personal information, with the understanding that your refusal
                            to do so may prevent you from engaging in certain website-related activities.
                        </p>

                        <h3>Derivative Data</h3>
                        <p>
                            Information our servers automatically collect when you access the website, such as your IP
                            address, browser type, operating system, access times, and the pages you have viewed
                            directly before and after accessing the website. This information is not combined with other
                            personal information.
                        </p>

                        <h3>Financial Data</h3>
                        <p>
                            Financial information, such as data related to your payment method (e.g., valid credit card
                            number, card brand, expiration date) that we may collect when you purchase, order, return,
                            exchange, or request information about our services. We store only very limited, if any,
                            financial information that we collect. Otherwise, all financial information is stored by our
                            payment processor and you are encouraged to review their privacy policy and contact them
                            directly for responses to your questions.
                        </p>

                        <h3>Cookies and Web Beacons</h3>
                        <p>
                            We may use cookies, web beacons, tracking pixels, and other tracking technologies on the
                            website to help customize the website and improve your experience. When you access the
                            website, your personal information is not collected through the use of tracking technology.
                            Most browsers are set to accept cookies by default. You can remove or reject cookies, but be
                            aware that such action could affect the availability and functionality of the website.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>3. Use of Your Information</h2>
                        <p>
                            Having accurate information about you permits us to provide you with a smooth, efficient,
                            and customized experience. Specifically, we may use information collected about you via the
                            website to:
                        </p>
                        <ul>
                            <li>Create and manage your account.</li>
                            <li>Process your payments.</li>
                            <li>
                                Fulfill and manage purchases, orders, and other transactions related to the website.
                            </li>
                            <li>Send you emails regarding your account or order.</li>
                            <li>Send you technical notices, updates, security alerts, and support messages.</li>
                            <li>Respond to your comments, questions, and requests.</li>
                            <li>Assist you with technical difficulties.</li>
                            <li>Enable user-to-user communications.</li>
                            <li>
                                Generate a personal profile about you to make future visits to the website more
                                personalized.
                            </li>
                            <li>Increase the efficiency and operation of the website.</li>
                            <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
                            <li>Notify you of updates to the website.</li>
                            <li>Resolve disputes and troubleshoot problems.</li>
                        </ul>
                    </section>

                    <section className="my-8">
                        <h2>4. Disclosure of Your Information</h2>
                        <p>
                            We may share information we have collected about you in certain situations. Your information
                            may be disclosed as follows:
                        </p>

                        <h3>By Law or to Protect Rights</h3>
                        <p>
                            If we believe the release of information about you is necessary to respond to legal process,
                            to investigate or remedy potential violations of our policies, or to protect the rights,
                            property, and safety of others, we may share your information as permitted or required by
                            any applicable law, rule, or regulation.
                        </p>

                        <h3>Third-Party Service Providers</h3>
                        <p>
                            We may share your information with third parties that perform services for us or on our
                            behalf, including payment processing, data analysis, email delivery, hosting services,
                            customer service, and marketing assistance.
                        </p>

                        <h3>Marketing Communications</h3>
                        <p>
                            With your consent, or with an opportunity for you to withdraw consent, we may share your
                            information with third parties for marketing purposes.
                        </p>

                        <h3>Interactions with Other Users</h3>
                        <p>
                            If you interact with other users of the website, those users may see your name, profile
                            photo, and descriptions of your activity.
                        </p>

                        <h3>Business Transfers</h3>
                        <p>
                            We may share or transfer your information in connection with, or during negotiations of, any
                            merger, sale of company assets, financing, or acquisition of all or a portion of our
                            business to another company.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>5. Security of Your Information</h2>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your
                            personal information. While we have taken reasonable steps to secure the personal
                            information you provide to us, please be aware that despite our efforts, no security
                            measures are perfect or impenetrable, and no method of data transmission can be guaranteed
                            against any interception or other type of misuse.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>6. Your Choices About Your Information</h2>
                        <p>
                            You may at any time review or change the information in your account or terminate your
                            account by:
                        </p>
                        <ul>
                            <li>Logging into your account settings and updating your account</li>
                            <li>Contacting us using the contact information provided below</li>
                        </ul>
                        <p>
                            Upon your request to terminate your account, we will deactivate or delete your account and
                            information from our active databases. However, some information may be retained in our
                            files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our
                            Terms of Use and/or comply with legal requirements.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>7. Cookies and Web Beacons</h2>
                        <p>
                            Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature
                            or setting you can activate to signal your privacy preference not to have data about your
                            online browsing activities monitored and collected. No uniform technology standard for
                            recognizing and implementing DNT signals has been finalized. As such, we do not currently
                            respond to DNT browser signals or any other mechanism that automatically communicates your
                            choice not to be tracked online.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>8. Children's Privacy</h2>
                        <p>
                            Our website is not designed for use by anyone under the age of 13. We do not knowingly
                            collect or solicit personal information from anyone under the age of 13. If you are under
                            13, please do not attempt to register for the website or send any personal information about
                            yourself to us. If we learn that we have collected personal information from a child under
                            age 13, we will delete that information as quickly as possible. If you believe that a child
                            under 13 may have provided us personal information, please contact us.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>9. California Privacy Rights</h2>
                        <p>
                            California Civil Code Section 1798.83 permits users of our website that are California
                            residents to request certain information regarding our disclosure of personal information to
                            third parties for their direct marketing purposes. To make such a request, please send an
                            email to us using the contact information below.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>10. Data Storage and Transfer</h2>
                        <p>
                            Your information collected through the website may be stored and processed in the United
                            States or any other country in which we or our subsidiaries, affiliates, or service
                            providers maintain facilities. If you are located in the European Union or other regions
                            with laws governing data collection and use that may differ from U.S. law, please note that
                            we may transfer information, including personal information, to a country and jurisdiction
                            that does not have the same data protection laws as your jurisdiction.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>11. Third-Party Websites</h2>
                        <p>
                            The website may contain links to third-party websites and applications of interest,
                            including advertisements and external services, that are not affiliated with us. Once you
                            have used these links to leave the website, any information you provide to these third
                            parties is not covered by this Privacy Policy, and we cannot guarantee the safety and
                            privacy of your information. Before visiting and providing any information to any
                            third-party websites, you should inform yourself of the privacy policies and practices of
                            the third party responsible for that website, and should take those steps necessary to, in
                            your discretion, protect the privacy of your information.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>12. Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by
                            posting the new Privacy Policy on this page. We will let you know via email and/or a
                            prominent notice on our website, prior to the change becoming effective and update the "Last
                            Updated" date at the top of this Privacy Policy. You are advised to review this Privacy
                            Policy periodically for any changes.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>13. Contact Us</h2>
                        <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                        <p>Email: hey@gourav.io</p>
                    </section>
                </main>
            </Container>
        </>
    );
}

export default Privacy;
