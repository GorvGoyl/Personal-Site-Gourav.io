import Header from '../../components/Header';
import { Container, LayoutType } from '../../components/layout';
import { Links, Navbar } from '../../components/navbar';

function Terms(): JSX.Element {
    return (
        <>
            <Header
                type="article"
                title="Gourav Goyal - Terms and Conditions"
            />

            <Container layout={LayoutType.Blog}>
                <Navbar link={Links.Blog} />
                <main className="prose">
                    <header>
                        <h1>Terms and Conditions</h1>
                        <p className="text-gray-600">
                            Last Updated:{' '}
                            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </header>

                    <section className="my-8">
                        <h2>1. Introduction</h2>
                        <p>
                            These Terms and Conditions govern your use of this website and all services provided through
                            it. By accessing or using this website, you agree to be bound by these Terms and Conditions
                            in full. If you disagree with these Terms and Conditions or any part of them, you must not
                            use this website.
                        </p>
                        <p>
                            This website may use cookies to monitor browsing preferences. If you allow cookies to be
                            used, personal information may be stored by us for use by third parties.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise stated, we own the intellectual property rights for all material on this
                            website. All intellectual property rights are reserved. You may view and/or print pages from
                            this website for your own personal use subject to restrictions set in these Terms and
                            Conditions.
                        </p>
                        <p>You must not:</p>
                        <ul>
                            <li>Republish material from this website</li>
                            <li>Sell, rent, or sub-license material from this website</li>
                            <li>Reproduce, duplicate, or copy material from this website</li>
                            <li>
                                Redistribute content from this website, unless content is specifically made for
                                redistribution
                            </li>
                        </ul>
                    </section>

                    <section className="my-8">
                        <h2>3. User Content</h2>
                        <p>
                            In these Terms and Conditions, "User Content" shall mean any audio, video, text, images, or
                            other material you choose to display on this website. By displaying your User Content, you
                            grant us a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to
                            use, reproduce, adapt, publish, translate, and distribute it in any and all media.
                        </p>
                        <p>
                            Your User Content must be your own and must not be infringing on any third party's rights.
                            We reserve the right to remove any of your User Content from this website at any time
                            without notice.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>4. No Warranties</h2>
                        <p>
                            This website is provided "as is," with all faults, and we make no express or implied
                            representations or warranties of any kind related to this website or the materials contained
                            on this website. Additionally, nothing contained on this website shall be construed as
                            providing advice to you.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>5. Limitation of Liability</h2>
                        <p>
                            In no event shall we, nor any of our officers, directors, and employees, be liable to you
                            for anything arising out of or in any way connected with your use of this website, whether
                            such liability is under contract, tort, or otherwise, and we shall not be liable for any
                            indirect, consequential, or special liability arising out of or in any way related to your
                            use of this website.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>6. Indemnification</h2>
                        <p>
                            You hereby indemnify to the fullest extent us from and against any and all liabilities,
                            costs, demands, causes of action, damages, and expenses (including reasonable attorney's
                            fees) arising out of or in any way related to your breach of any of the provisions of these
                            Terms and Conditions.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>7. Severability</h2>
                        <p>
                            If any provision of these Terms and Conditions is found to be unenforceable or invalid under
                            any applicable law, such unenforceability or invalidity shall not render these Terms and
                            Conditions unenforceable or invalid as a whole, and such provisions shall be deleted without
                            affecting the remaining provisions herein.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>8. Variation of Terms</h2>
                        <p>
                            We are permitted to revise these Terms and Conditions at any time as we see fit, and by
                            using this website you are expected to review such Terms and Conditions on a regular basis
                            to ensure you understand all terms and conditions governing use of this website.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>9. Assignment</h2>
                        <p>
                            We are allowed to assign, transfer, and subcontract our rights and/or obligations under
                            these Terms and Conditions without any notification or consent required. However, you shall
                            not be permitted to assign, transfer, or subcontract any of your rights and/or obligations
                            under these Terms and Conditions.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>10. Entire Agreement</h2>
                        <p>
                            These Terms and Conditions, including any legal notices and disclaimers contained on this
                            website, constitute the entire agreement between us and you in relation to your use of this
                            website, and supersede all prior agreements and understandings with respect to the same.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>11. Governing Law & Jurisdiction</h2>
                        <p>
                            These Terms and Conditions will be governed by and construed in accordance with the laws of
                            the jurisdiction applicable to us, and you submit to the non-exclusive jurisdiction of the
                            state and federal courts located in our jurisdiction for the resolution of any disputes.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>12. Privacy Policy</h2>
                        <p>
                            Our use of your personal information is governed by our Privacy Policy, which forms part of
                            these Terms and Conditions. Please review our Privacy Policy to understand our practices.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>13. External Links</h2>
                        <p>
                            This website may contain links to external websites that are not provided or maintained by
                            or in any way affiliated with us. Please note that we do not guarantee the accuracy,
                            relevance, timeliness, or completeness of any information on these external websites.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2 id="refund-policy">
                            <a href="#refund-policy">14. Refund Policy</a>
                        </h2>
                        <p>
                            All sales are final. <strong>We do not offer refunds under any circumstances.</strong> By
                            making a purchase, you acknowledge and agree that you are not entitled to a refund for any
                            purchase made through this website regardless of the reason.
                        </p>
                        <p>
                            This no-refund policy applies to all products and services offered on this website,
                            including but not limited to digital products, subscriptions, membership fees, and
                            consultation services.
                        </p>
                        <p>
                            In exceptional circumstances and entirely at our discretion, we may consider offering store
                            credit or exchanges. However, this is not guaranteed and will be determined on a
                            case-by-case basis.
                        </p>
                        <p>
                            By proceeding with any purchase, you explicitly acknowledge that you have read, understood,
                            and agreed to this no-refund policy.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>15. User Accounts</h2>
                        <p>
                            When you create an account with us, you guarantee that the information you provide is
                            accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete
                            information may result in the immediate termination of your account on the service.
                        </p>
                        <p>
                            You are responsible for maintaining the confidentiality of your account and password,
                            including but not limited to the restriction of access to your computer and/or account. You
                            agree to accept responsibility for any and all activities or actions that occur under your
                            account and/or password.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>16. Termination</h2>
                        <p>
                            We may terminate or suspend your account and bar access to the service immediately, without
                            prior notice or liability, under our sole discretion, for any reason whatsoever and without
                            limitation, including but not limited to a breach of the Terms.
                        </p>
                        <p>
                            If you wish to terminate your account, you may simply discontinue using the service. All
                            provisions of the Terms which by their nature should survive termination shall survive
                            termination, including, without limitation, ownership provisions, warranty disclaimers,
                            indemnity, and limitations of liability.
                        </p>
                    </section>

                    <section className="my-8">
                        <h2>17. Contact Information</h2>
                        <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
                        <p>Email: hey@gourav.io</p>
                    </section>
                </main>
            </Container>
        </>
    );
}

export default Terms;
